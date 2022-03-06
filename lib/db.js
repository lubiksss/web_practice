const mysql = require("mysql");
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'db1004',
    database: 'opentutorials'
});
db.connect();

module.exports = db;
