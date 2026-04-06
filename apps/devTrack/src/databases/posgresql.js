const knex = require('knex');
const config = require('../utils/knexfile');

let db;

const connetion = () => {
  if (!db) {
    db = knex(config);
  }
  return db;
};

module.exports = connetion;
