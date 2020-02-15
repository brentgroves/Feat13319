const mssqlFetch = require('../../hooks/mssql-fetch');
//TESTING_ONLY
module.exports = {
  before: {
    all: [],
    find: [mssqlFetch()],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
//    all: [populateUser()],
