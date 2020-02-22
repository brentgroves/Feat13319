const users = require('./users/users.service.js');
const sproc200206 = require('./sproc200206/sproc200206.service.js');
const sproc200221 = require('./sproc200221/sproc200221.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(sproc200206);
  app.configure(sproc200221);
};
/*
module.exports = function (app) {
  app.configure(users);
  app.configure(messages);
  app.configure(test);
  app.configure(mstest);
  app.configure(myhourlyoeevalues);
  app.configure(hourlyoeevalues);
  app.configure(sproc200206);
};

*/
