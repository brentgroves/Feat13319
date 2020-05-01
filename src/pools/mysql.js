// https://www.npmjs.com/package/mysql
const sql = require('mysql');

const pools = {};

// manage a set of pools by name (config will be required to create the pool)
// a pool will be removed when it is closed
async function getPool(name, config) {
  if (!Object.prototype.hasOwnProperty.call(pools, name)) {

 /*
 var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'example.org',
  user            : 'bob',
  password        : 'secret',
  database        : 'my_db'
});
 */
    const pool = new sql.createPool(config);
    const close = pool.close.bind(pool);
    pool.close = (...args) => {
      delete pools[name];
      return close(...args);
    };
    await pool.connect();
    pools[name] = pool;
  }
  return pools[name];
}

// close all pools
function closeAll() {
  return Promise.all(Object.values(pools).map((pool) => {
    return pool.close();
  }));
}

module.exports = {
  closeAll,
  getPool
};