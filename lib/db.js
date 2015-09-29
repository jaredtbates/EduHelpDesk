var config = require('../config');
var Sequelize = require('sequelize');

var sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, {
    dialect: config.database.type,
    host: config.database.host,
    port: config.database.port,

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

    // SQLite only
    storage: 'database.db'
});

var Request = sequelize.define('request', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        field: 'requestid'
    },
    studentName: {
        type: Sequelize.STRING,
        field: 'studentname'
    },
    problem: {
        type: Sequelize.TEXT
    },
    computerId: {
        type: Sequelize.INTEGER,
        field: 'computerid'
    },
    time: {
        type: Sequelize.DATE
    }
}, {
    freezeTableName: true
});

Request.sync();