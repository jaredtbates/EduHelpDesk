var dbConfig = require('../config/database.json');
var Sequelize = require('sequelize');
var env = process.env.ENVIRONMENT || 'development';

var sequelize = new Sequelize(dbConfig[env].database || 'eduhelpdesk', dbConfig[env].username || 'root', dbConfig[env].password || 'password', {
    dialect: dbConfig[env].dialect || 'sqlite',
    host: dbConfig[env].host || '127.0.0.1',
    port: dbConfig[env].port || '3306',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

    // SQLite
    storage: 'database.db',

    // remove logging for a clean console
    logging: false
});

var Request = require('./database/models/request')(sequelize, Sequelize);

Request.sync();

exports.sequelize = sequelize;
exports.Request = Request;