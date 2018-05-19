const environment= process.env.NODE_ENV ||'development';
const config = require('../knexfile');
const environmentConfig = config[environment];
const knex = require('knex');

const connection = knex(environmentConfig);

module.exports = connection; 

// anywhere in my app I can require this file and have instance connection to db
