const { Pool } = require('pg')

const pool = new Pool({
    user: "",
    database: "",
    password: "",
    host: "",
    port: 0
})

module.exports = { pool }