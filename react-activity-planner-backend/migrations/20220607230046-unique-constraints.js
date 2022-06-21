'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Users', {
      fields: ['email'],
      type: 'unique',
      name: 'custom_unique_constraint_email'
      });
      
      return queryInterface.addConstraint('Users', {
      fields: ['username'],
      type: 'unique',
      name: 'custom_unique_constraint_username'
      });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
