'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('requests', {
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
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('requests');
  }
};