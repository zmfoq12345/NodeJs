var mysql = require('mysql');
{
    var password = "";
}

var conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : password,
    database : 'software'
});

module.exports = conn;