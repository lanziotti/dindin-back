require('dotenv').config();

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE,
        URL: process.env.DB_URI,
        ssl: {rejectUnauthorized: false}
    }
});

module.exports = knex;