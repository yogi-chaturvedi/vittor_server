const users = require('./users/users.service.js');
const patients = require('./patients/patients.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(patients);
};
