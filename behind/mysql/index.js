var mysql = require('mysql');
var config = require('./config');

var pool = mysql.createPool({
	host: config.database.HOST,
	user: config.database.USERNAME,
	password: config.database.PASSWORD,
	database: config.database.DATABASE
});

class Mysql {
	constructor() {

	}
	insertWholeData(data) {
		let datalistStr = ''
		for (var key in data) {
			datalistStr = datalistStr + (datalistStr ? (","+"'"+data[key]+"'") : ("'"+data[key]+"'"))
		}
		let sql = "insert into user value(" + datalistStr+ ")"
		return new Promise((resolve, reject) => {
			pool.query(sql, function(error, results, fields) {
				if (error) {
					throw error
				};
				console.log(results)
				resolve(results)
			});
		})
	}
	queryHasReturn(data) {
		let sql = "select from user where"
		return new Promise((resolve, reject) => {
			pool.query(sql, function(error, results, fields) {
				if (error) {
					throw error
				};
				console.log(results)
				resolve(results)
			});
		})
	}
	isExist(data, tableName) {
		let datalistStr = ''
		for (var key in data) {
			datalistStr = datalistStr + (datalistStr ? (" and " + key + "=" + "'" + data[key] + "'") : (key + "=" + "'" + data[
				key] + "'"))
		}
		console.log(datalistStr)
		let sql = "select count(*) from " + tableName + " where " + datalistStr
		return new Promise((resolve, reject) => {
			pool.query(sql, function(error, results, fields) {
				if (error) {
					throw error
				};
				let resData = results[0]['count(*)']
				resolve({
					result: resData
				})
			});
		})
	}
}


module.exports = new Mysql()
