
const {Pool} = require('pg');

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "m4t1as94",
    database: "joyas",
    port: 5432,
    allowExitOnIdle: true,
});

module.exports = pool;