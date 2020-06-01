const sql = require('mariadb');
const { getPool } = require('../../pools/maria');

const {
  KORS_SERVER,
  KORS_USERNAME,
  KORS_PASSWORD,
  KORS_DATABASE,
} = process.env;
/* eslint-disable no-unused-vars */
exports.Maria200221 = class Maria200221 {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    let rows;
    const { $table, $limit, $skip } = params.query;
//    console.log(`start of find: ${params}`);
//    console.log(`JSON.stringify: ${JSON.stringify(params.query)}`);
    console.log(`params.query.$table=>${params.query.$table}`);
    try {
      // console.log(`user: ${KORS_USERNAME},password: ${KORS_PASSWORD}, database: ${KORS_DATABASE}, server: ${KORS_SERVER}`);

      let pool = await getPool('kors', {
        connectionLimit: 10,
        multipleStatements: true,
        host: KORS_SERVER,
        user: KORS_USERNAME,
        password: KORS_PASSWORD,
        database: KORS_DATABASE,
      });      
      // query database
      rows = await pool.query(`select * from ${$table} ORDER BY primary_key LIMIT ${$limit} OFFSET ${$skip}`);
      // console.log(rows); //[ {val: 1}, meta: ... ]
    } catch (e) {
      console.log('caught exception!', e);
    }
    return rows;
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    let pool = await getPool('kors', {
      connectionLimit: 10,
      multipleStatements: true,
      host: KORS_SERVER,
      user: KORS_USERNAME,
      password: KORS_PASSWORD,
      database: KORS_DATABASE,
    });      
    // query database
 
    var ret;
    try {
      const someRows = await pool.query('call Sproc200221(?,?,?,@pRecordCount); select @pRecordCount as pRecordCount',[data.startDate,data.endDate,data.table]);
      console.log("The solution is: ", someRows[1][0].pRecordCount);
      ret = {
        record_count: someRows[1][0].pRecordCount,
        table: data.table
      };
    } catch (err) {
      // handle the error
      console.log(`Error =>${err}`);
    } finally {
      console.log("In query finally");
      console.log("The ret is: ", ret);

      //  await db.close();
    }


    return ret;  
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
};
