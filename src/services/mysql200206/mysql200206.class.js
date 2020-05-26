var datetime = require("node-datetime");
//const config = require('../../../../Config13319/config.json');
const { makeDb } = require("../../pools/mysql");
const mysql = require("mysql");
const util = require("util");

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
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
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
    query( sql, args ) {
      return util.promisify( connection.query )
        .call( connection, sql, args );
    },
 */
    //return util.promisify( connection.query )
    //.call( connection, sql, args );
    //const someRows = await db.query( 'SELECT * FROM some_table' );
    /*
  function query(sql,args) {
    return util.promisify( pool.query)
    .call(pool,sql,args);
  }

  const someRows = await query( 'select Data_hour AS solution from HourlyOEEValues' );
  console.log('The solution is: ', someRows);
  */
    /*
  pool.query('select Data_hour AS solution from HourlyOEEValues', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  })   
      /* https://www.sitepoint.com/using-node-mysql-javascript-client/ */
    // con.query(`select * from DS13318`,function(err, resultSet){
    // con.query(`CALL DS13318("2019-12-15 09:00")`,function(err, rows){
    // con.query(`CALL DS13318('${transDate}')`,function(err, resultSet){
    //  con.query('CALL DS13318(?)', [transDate], function(err, resultSet) {

  
    const db = makeDb("Kors", {
      connectionLimit: 10,
      multipleStatements: true,
      host: KORS_SERVER,
      user: KORS_USERNAME,
      password: KORS_PASSWORD,
      database: KORS_DATABASE,
    });
    try {
      /*
      const someRows = await db.query(
        "select Data_hour AS solution from HourlyOEEValues"
      );
      */
      //   const otherRows = await db.query( 'SELECT * FROM other_table' );
      //var pRecordCount = 1;
      const someRows = await db.query('call Sproc200206("2020-03-01 00:00:00","2020-04-04 23:59:59", "TempTable",@pRecordCount); select @pRecordCount as pRecordCount');
      console.log("The solution is: ", someRows[1][0].pRecordCount);
//      console.log("The solution is: ", someRows[0].fieldCount);  // 0
//      console.log("The solution is: ", someRows[0].OkPacket);  //undefined
      //      console.log("The solution is: ", someRows[1][0].@pRecordCount);
//      console.log("The solution is: ", someRows[0].solution);

      // do something with someRows and otherRows
    } catch (err) {
      // handle the error
      console.log(`Error =>${err}`);
    } finally {
      console.log("In query finally");
      //  await db.close();
    }
    return ["test"];
  }

  async get(id, params) {
    return {
      id,
      text: `A new message with ID: ${id}!`,
    };
  }

  async create(data, params) {
    const {
      KORS_SERVER,
      KORS_USERNAME,
      KORS_PASSWORD,
      KORS_DATABASE,
    } = process.env;
    console.log(
      `user: ${KORS_USERNAME},password: ${KORS_PASSWORD}, database: ${KORS_DATABASE}, hostname: ${KORS_SERVER}`
    );
    console.log(
      `before request(), table: ${data.table}, startDate: ${data.startDate}, endDate: ${data.endDate}`
    );

    const db = makeDb("Kors", {
      connectionLimit: 10,
      multipleStatements: true,
      host: KORS_SERVER,
      user: KORS_USERNAME,
      password: KORS_PASSWORD,
      database: KORS_DATABASE,
    });
    var ret;
    try {
      /*
      const someRows = await db.query(
        "select Data_hour AS solution from HourlyOEEValues"
      );
      */
      //   const otherRows = await db.query( 'SELECT * FROM other_table' );
      //var pRecordCount = 1;
      const someRows = await db.query('call Sproc200206(?,?,?,@pRecordCount); select @pRecordCount as pRecordCount',[data.startDate,data.endDate,data.table]);
//      const someRows = await db.query('call Sproc200206("2020-03-01 00:00:00","2020-04-04 23:59:59", "TempTable",@pRecordCount); select @pRecordCount as pRecordCount');
      console.log("The solution is: ", someRows[1][0].pRecordCount);
//      console.log("The solution is: ", someRows[0].solution);
      ret = {
        record_count: someRows[1][0].pRecordCount,
        table: data.table
      };
      // do something with someRows and otherRows
    } catch (err) {
      // handle the error
      console.log(`Error =>${err}`);
    } finally {
      console.log("In query finally");
      console.log("The ret is: ", ret);

      //  await db.close();
    }


    return ret;

/*
    if (Array.isArray(data)) {
      return Promise.all(data.map((current) => this.create(current, params)));
    }
    return data;
    */
  }

  async update(id, data, params) {
    return data;
  }

  async patch(id, data, params) {
    return data;
  }

  async remove(id, params) {
    return { id };
  }
};
