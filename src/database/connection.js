require('dotenv').config();

const knex = require('knex')({
    client: 'pg',
    connection: {
        URL: process.env.DB_URI,
        ssl: {rejectUnauthorized: false}
    }
});

module.exports = knex;