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
			datalistStr = datalistStr + (datalistStr ? ("," + (data[key] ? "'" + data[key] + "'" : null)) : (data[key] ? "'" +
				data[key] + "'" : null))
		}
		let sql = "insert into user value(" + datalistStr + ")"
		console.log(sql)
		return new Promise((resolve, reject) => {
			pool.query(sql, function(error, results, fields) {
				if (error) {
					results = {
						responseCode: '100',
						message: '数值不能为空'
					}
				};
				resolve(results)
			});
		})
	}
	queryHasReturn(data) {
		let sql = "select from user where"
		return new Promise((resolve, reject) => {
			pool.query(sql, function(error, results, fields) {
				// if (error) {
				// 	throw error
				// };
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
					responseCode: '200',
					message: 'success',
					result: resData
				})
			});
		})
	}
}


module.exports = new Mysql()
