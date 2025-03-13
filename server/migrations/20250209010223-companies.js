'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('companies', {
      company_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      company_name: { 
        type: Sequelize.STRING, 
        allowNull: true, 
        unique: true
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true, // Default to 'true' if not provided
      },
      created_ts: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,  // Automatically set on create
      },
      updated_ts: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,  // Automatically set on update
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('companies');
  }
};
