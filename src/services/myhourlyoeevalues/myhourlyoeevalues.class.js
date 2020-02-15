const { Service } = require('feathers-objection');
//TESTING_ONLY
exports.Myhourlyoeevalues = class Myhourlyoeevalues extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
