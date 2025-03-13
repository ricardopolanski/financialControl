'use strict';

const { type } = require('os');

/** @type {import('sequelize-cli').Migration} */
// module.exports = (sequelize, DataTypes) => {
module.exports =  {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: { 
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      role_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        references: {
          model: 'user_roles',
          key: 'role_id'
        }
      },
      company_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        references: {
          model: 'companies',
          key: 'company_id'
        }
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
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
      last_login: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      },
      last_frustated_login: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      },
      frustated_login_count: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      security_question: {
        type: Sequelize.STRING,
        allowNull: false
      },
      security_answare: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
