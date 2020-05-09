var datetime = require('node-datetime');
//const config = require('../../../../Config13319/config.json');
const { getPool } = require('../../pools/mysql');
const mysql = require('mysql');
const util = require( 'util' );

const {
  KORS_SERVER,
  KORS_USERNAME,
  KORS_PASSWORD,
  KORS_DATABASE,
} = process.env;
/*
cluster.add("master", { 
  connectionLimit : 10,
  host            : KORS_SERVER,
  user            : KORS_USERNAME,
  password        : KORS_PASSWORD,
  database        : KORS_DATABASE
});
*/
/* eslint-disable no-unused-vars */
exports.Mysql200206 = class Mysql200206 {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    /*
    KORS_SERVER=db
    KORS_USERNAME=$KORS_USERNAME
    KORS_PASSWORD=$KORS_PASSWORD
    KORS_DATABASE=$KORS_DATABASE 
    */
   
   const {
    KORS_SERVER,
    KORS_USERNAME,
    KORS_PASSWORD,
    KORS_DATABASE,
  } = process.env;
  console.log(
    `user: ${KORS_USERNAME},password: ${KORS_PASSWORD}, database: ${KORS_DATABASE}, hostname: ${KORS_SERVER}`
  );
/*
   var pool  = mysql.createPool({
     connectionLimit : 10,
     host            : KORS_SERVER,
     user            : KORS_USERNAME,
     password        : KORS_PASSWORD,
     database        : KORS_DATABASE
   });
*/   
/*
   let pool = await getPool('kors', {
    connectionLimit : 10,
    host            : KORS_SERVER,
    user            : KORS_USERNAME,
    password        : KORS_PASSWORD,
    database        : KORS_DATABASE
 });      

*/
/*
   pool.query('select Data_hour AS solution from HourlyOEEValues', function (error, results, fields) {
     if (error) throw error;
     console.log('The solution is: ', results[0].solution);
   })   
   */

//  var pool = cluster.of('master');

  let pool = await getPool('kors', {
    connectionLimit : 10,
    host            : KORS_SERVER,
    user            : KORS_USERNAME,
    password        : KORS_PASSWORD,
    database        : KORS_DATABASE
 });      

 /*
    query( sql, args ) {
      return util.promisify( connection.query )
        .call( connection, sql, args );
    },
 */
 //return util.promisify( connection.query )
 //.call( connection, sql, args );
 //const someRows = await db.query( 'SELECT * FROM some_table' );

  function query(sql,args) {
    return util.promisify( pool.query)
    .call(pool,sql,args);
  }
  const someRows = await query( 'select Data_hour AS solution from HourlyOEEValues' );
  console.log('The solution is: ', someRows);
  /*
  pool.query('select Data_hour AS solution from HourlyOEEValues', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  })   
  */

    return ['test'];
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }
    return data;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
}
