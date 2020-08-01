// Initializes the `users` service on path `/users`
const { Users } = require('./users.class');
const createModel = require('../../models/users.model');
const hooks = require('./users.hooks');
const UserSchema = require('./user-schema');
const demographic = require('../../assets/json/country');
const _ = require('lodash');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/users', new Users(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('users');

  service.hooks(hooks);


  app.get('/user-schema', (req, res)=> {
    res.header('Content-Type', 'application/json');
    res.end(JSON.stringify(UserSchema));
  });

  app.get('/country', (req, res)=> {
    res.header('Content-Type', 'application/json');
    demographic.map(c=> c.country)
    const countries = _.chain(demographic).map('country').uniq().values();
    res.end(JSON.stringify(countries));
  });

  app.get('/state', (req, res)=> {
    res.header('Content-Type', 'application/json');
    const {country} = req.query;
    const states = _.chain(demographic).filter({country}).map('state').uniq().values();
    res.end(JSON.stringify(states));
  });

  app.get('/city', (req, res)=> {
    res.header('Content-Type', 'application/json');
    const {state} = req.query;
    const cities = _.chain(demographic).filter({state}).map('city').uniq().values();
    res.end(JSON.stringify(cities));
  });
};
