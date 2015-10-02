var config = require('../config');
var Sequelize = require('sequelize');

if (config.database.type.toLowerCase() == 'sqlite') {
    console.log('\x1b[31mWARNING: You are using SQLite, which is not recommended for production environments. Please only use SQLite for development/testing purposes.\x1b[0m');
}

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

var Request = sequelize.define('requests', {
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
    resolved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    }
}, {
    freezeTableName: true
});

var Admin = sequelize.define('admins', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        field: 'id',
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    permissionLevel: {
        type: Sequelize.INTEGER,
        field: 'permissionlevel',
        defaultValue: 1,
        allowNull: false
    }
}, {
    freezeTableName: true
});

Request.sync();
Admin.sync();

exports.Request = Request;
exports.Admin = Admin;