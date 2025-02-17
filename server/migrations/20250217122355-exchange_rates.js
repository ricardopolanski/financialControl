module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("exchange_rates", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      currency_id: {
        type: Sequelize.STRING(3),  // ISO 4217 currency code (EUR, BRL, etc.)
        allowNull: false
      },
      rate: {
        type: Sequelize.DECIMAL(10,6), // Exchange rate with high precision
        allowNull: false
      },
      source: {
        type: Sequelize.STRING,
        allowNull: true // Optional: API or bank name
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("exchange_rates");
  }
};
