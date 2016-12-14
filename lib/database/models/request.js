'use strict';
module.exports = function(sequelize, DataTypes) {
  var Request = sequelize.define('Request', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      field: 'id',
      allowNull: false
    },
    studentName: {
      type: DataTypes.STRING,
      field: 'studentname',
      allowNull: false
    },
    studentEmail: {
      type: DataTypes.STRING,
      field: 'studentemail',
      allowNull: true
    },
    problem: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    classPeriod: {
      type: DataTypes.INTEGER,
      field: 'classperiod',
      allowNull: false
    },
    computerId: {
      type: DataTypes.INTEGER,
      field: 'computerid',
      allowNull: false
    },
    currentTeacher: {
      type: DataTypes.STRING,
      field: 'currentteacher',
      allowNull: false
    },
    nextTeacher: {
      type: DataTypes.STRING,
      field: 'nextteacher',
      allowNull: false
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    contacted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    received: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    resolved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  }, {
    tableName: 'requests',
    freezeTableName: true
  });
  return Request;
};