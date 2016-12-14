'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('requests', 'studentemail', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'studentname'
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('requests', 'studentemail');
  }
};
