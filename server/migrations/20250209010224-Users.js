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
      },created_ts: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,  // Automatically set on create
      },
      updated_ts: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,  // Automatically set on update
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
