const mysql = require("mysql");
const Migrations = require("./migrations/index")
const pool = mysql.createPool({
    connectionLimit: 100,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
})

pool.getConnection(async function (err) {
    if (err) return console.log(err);
    Migrations.migrate()
})


exports.execute = (query, params = []) => {
    return new Promise((resolve, reject) => {
        pool.query(query, params, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

exports.pool = pool;
