const mariadb = require("mariadb");

var cluster = {};
var pools = {};

// manage a set of pools by name (config will be required to create the pool)
// a pool will be removed when it is closed
//https://www.npmjs.com/package/mssql#connection-pools
async function getPool(name, config) {
  if (Object.keys(cluster).length === 0) {
    console.log("before sql.createPoolCluster()");
    cluster = mariadb.createPoolCluster();
    // we are going to replace the original objects close method,
    // but we still want to be able to access it and have it's this
    // object point to the pool

    const end = cluster.end.bind(cluster);

    cluster.end = (...args) => {
      pools = {};
      // we are going to call the original end() method after we
      // delete all of the pool names from the pools array.

      return end(...args);
    };

  }
  if (!Object.prototype.hasOwnProperty.call(pools, name)) {
    console.log("before cluster.add(name,config)");
    /*
          pools.add(name, { 
            connectionLimit : 10,
            host            : KORS_SERVER,
            user            : KORS_USERNAME,
            password        : KORS_PASSWORD,
            database        : KORS_DATABASE
          });
          */
    cluster.add(name, config); // add a named pool
    pools[name] = name; // keep track of all named pools
  }
  return cluster.getConnection(name);
}

// close all pools
function closeAll() {
    cluster.end()
    .then(() => {
      //pools have been ended properly
    })
    .catch(err => {
        console.log(`In maria.js.closeAll()=>${err}`);
    });
}

module.exports = {
  closeAll,
  getPool,
};
