const os = require('os')
require('dotenv').config()
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host : process.env.DB_HOST || '127.0.0.1',
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : 'eden'
    }
})

module.exports = knex