'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('session_tokens', {
      id: { 
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      user_id: { 
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',  // This should reference the 'users' table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      master_token: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      session_token: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,  // Default to 'true' if not provided
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
    await queryInterface.dropTable('session_tokens');
  }
};
