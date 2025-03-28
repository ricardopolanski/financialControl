'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('credit_card_transactions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      company_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        references: {
          model: 'companies',
          key: 'company_id'
        }
      },
      transaction_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      amount: {
        type: Sequelize.FLOAT,  // Adjusted type for float
        allowNull: false
      },
      credit_card: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('pending', 'paid', 'overdue'),
        defaultValue: 'pending'
      },
      due_day: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      installment_number: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      notes: {
        type: Sequelize.STRING
      },
      created_ts: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_ts: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('credit_card_transactions');
  }
};
