var mysql = require('mysql');
var config = require('./config');

var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});

class Mysql {
    constructor () {

    }
    query (data) {
		let sql="insert into user value("+"'"+data.name+"'"+","+data.age+")"
      return new Promise((resolve, reject) => {
        pool.query(sql, function (error, results, fields) {
            if (error) {
                throw error
            };
			console.log(results)
            resolve(results)
        });
      })
       
    }
}


module.exports = new Mysql()