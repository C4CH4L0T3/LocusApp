const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'us-cdbr-east-06.cleardb.net',
    database: 'heroku_cdbafcfce4caacb',
    user: 'b48181e23bec5d',
    password: '391cfcd2',

});


module.exports = db;