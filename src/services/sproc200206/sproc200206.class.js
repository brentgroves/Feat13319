var datetime = require('node-datetime');
//const config = require('../../../../Config13319/config.json');
const sql = require('mssql');
const { getPool } = require('../../pools');

/* eslint-disable no-unused-vars */
exports.Sproc200206 = class Sproc200206 {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    const { $table, $limit, $skip } = params.query;
    console.log(params);
    try {


      
      const {
        KORS_USER,
        KORS_PASSWORD,
        KORS_DATABASE,
        KORS_SERVER
      } = process.env;
      console.log(
        `user: ${KORS_USER},password: ${KORS_PASSWORD}, database: ${KORS_DATABASE}, server: ${KORS_SERVER}`
      );

      let pool = await getPool('kors', {
        user: KORS_USER,
        password: KORS_PASSWORD,
        database: KORS_DATABASE,
        server: KORS_SERVER
      });      
      /*
      let pool = await sql.connect({
        user: MSSQL_USER,
        password: MSSQL_PASSWORD,
        database: MSSQL_DATABASE,
        server: MSSQL_SERVER
      });
      */
      /*
      let pool = await sql.connect({
        "user" : "sa",
        "password" : "S@Tsql@dmin1",
        "database" : "Kors",
        "server": "10.30.1.17"
      })
*/

      // query database
      console.log(params.query.$table);

      let resultSet = await pool
        .request()
        .query(
          `select * from ${$table} ORDER BY primary_key OFFSET ${$skip} ROWS FETCH NEXT ${$limit} ROWS ONLY`
        );
      console.dir(resultSet);
      return resultSet.recordset;
    } catch (e) {
      console.log('caught exception!', e);
    }
  }

  async get(id, params) {
    return {
      id,
      text: `A new message with ID: ${id}!`
    };
  }

  async create(data, params) {
    var result;
    console.log('in Sproc200206.create()');
    const startDate = '2020-02-09T00:00:00';
    const endDate = '2020-02-10T23:59:59';
    console.log(
      `table: ${data.table}, startDate: ${data.startDate}, endDate: ${data.endDate}`
    );

    try {
      // have problems with knex and this working at same time on linux
      //      let pool = await sql.connect(config.mssql)
      const {
        KORS_USER,
        KORS_PASSWORD,
        KORS_DATABASE,
        KORS_SERVER
      } = process.env;
      console.log(
        `user: ${KORS_USER},password: ${KORS_PASSWORD}, database: ${KORS_DATABASE}, server: ${KORS_SERVER}`
      );
      let pool = await getPool('kors', {
        user: KORS_USER,
        password: KORS_PASSWORD,
        database: KORS_DATABASE,
        server: KORS_SERVER
      });      
/*
      let pool = await sql.connect({
        user: MSSQL_USER,
        password: MSSQL_PASSWORD,
        database: MSSQL_DATABASE,
        server: MSSQL_SERVER
      });
*/
      /*
      let pool = await sql.connect({
        "user" : "sa",
        "password" : "S@Tsql@dmin1",
        "database" : "Kors",
        "server": "10.30.1.17"
      })
      */
      // query database
      console.log(
        `before request(), table: ${data.table}, startDate: ${data.startDate}, endDate: ${data.endDate}`
      );

      const resultSet = await pool
        .request()
        .input('start_date', sql.DateTime, data.startDate)
        .input('end_date', sql.DateTime, data.endDate)
        .input('table_name', sql.VarChar(12), data.table)
        .output('record_count', sql.Int)
        .execute('Sproc200206');
        console.log(
          `after request(), table: ${data.table}, startDate: ${data.startDate}, endDate: ${data.endDate}`
        );
      //console.log(resultSet);
      result = resultSet;
    } catch (e) {
      console.log('caught exception!', e);
    }
    //console.log(result);
    let ret;
    ret = {
      record_count: result.output.record_count,
      table: data.table
    }
    console.log(`sproc200206.class.ret: ${ret.record_count},${ret.table}`);
//    return result.output.record_count;
    return ret;
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
