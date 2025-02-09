'use strict';

/** @type {import('sequelize-cli').Migration} */
// module.exports = (sequelize, DataTypes) => {
module.exports =  {
  async up (queryInterface, Sequelize, DataTypes) {
    await queryInterface.createTable('users', {
      id: { 
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
       },
      username: { 
        type: Sequelize.STRING, 
        allowNull: false, 
        unique: true 
      },
      password: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true, // Default to 'true' if not provided
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
