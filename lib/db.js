var dbConfig = require('../config/database.json');
var Sequelize = require('sequelize');

var sequelize = new Sequelize(dbConfig.database || 'eduhelpdesk', dbConfig.username || 'root', dbConfig.password || 'password', {
    dialect: dbConfig.type || 'sqlite',
    host: dbConfig.host || '127.0.0.1',
    port: dbConfig.port || '3306',

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

var Request = sequelize.define('Request', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        field: 'id',
        allowNull: false
    },
    studentName: {
        type: Sequelize.STRING,
        field: 'studentname',
        allowNull: false
    },
    problem: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    classPeriod: {
        type: Sequelize.INTEGER,
        field: 'classperiod',
        allowNull: false
    },
    computerId: {
        type: Sequelize.INTEGER,
        field: 'computerid',
        allowNull: false
    },
    currentTeacher: {
        type: Sequelize.STRING,
        field: 'currentteacher',
        allowNull: false
    },
    nextTeacher: {
        type: Sequelize.STRING,
        field: 'nextteacher',
        allowNull: false
    },
    priority: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    contacted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    received: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    resolved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
}, {
    tableName: 'requests',
    freezeTableName: true
});

Request.sync();

exports.sequelize = sequelize;
exports.Request = Request;