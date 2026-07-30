const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Subasri@2006",
    database: "amman_store"
});

connection.connect(function(err) {
    if (err) {
        console.log("Connection Failed");
    } else {
        console.log("MySQL Connected Successfully");
    }
});

module.exports = connection;