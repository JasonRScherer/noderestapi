module.exports = {
    development : {
        client: 'mysql',
        connection: {
            host : process.env.DB_HOST || '127.0.0.1',
            user : process.env.DB_USER,
            password : process.env.DB_PASS,
            database : 'eden_dev'
        }
    }
}