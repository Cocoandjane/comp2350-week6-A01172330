const mysql = require('mysql2');

const is_heroku = process.env.IS_HEROKU || false;

const dbConfigHeroku = {
	host: "eanl4i1omny740jw.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
	user: "nqhs6qy6l9xgt9uu",
	password: "x424u4kcp3l8fxcy",
	database: "t3f7249zp9h60knm",
	multipleStatements: false,
	namedPlaceholders: true,
};

const dbConfigLocal = {
	host: "localhost",
	user: "root",
	password: "Feiyang999",
	database: "restaurant_review",
	multipleStatements: false,
	namedPlaceholders: true,
};

if (is_heroku) {
	var database = mysql.createPool(dbConfigHeroku);
}
else {
	var database = mysql.createPool(dbConfigLocal);
}

module.exports = database;
		