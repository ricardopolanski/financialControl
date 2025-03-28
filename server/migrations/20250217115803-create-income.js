'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.createTable('income', {
      id: {
        type: Sequelize.UUID,
        toDefaultValue: Sequelize.UUIDV4,
        primareKey: true
      },
      company_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        references: {
          model: 'companies',
          key: 'company_id'
        }
      },
      due_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      source: {
        type: Sequelize.STRING        
      },
      amount: {
        type: Sequelize.float,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM
      },
      category: {
        type: Sequelize.STRING
      },
    });
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
