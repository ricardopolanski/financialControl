'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('currencies', [
      {
        currency: "United States Dollar",
        currency_code: "USD",
        currency_symbol: "$",
        created_ts: new Date()
      },
      {
        currency: "Euro",
        currency_code: "EUR",
        currency_symbol: "€",
        created_ts: new Date()
      },
      {
        currency: "British Pound",
        currency_code: "GBP",
        currency_symbol: "£",
        created_ts: new Date()
      },
      {
        currency: "Japanese Yen",
        currency_code: "JPY",
        currency_symbol: "¥",
        created_ts: new Date()
      },
      {
        currency: "Canadian Dollar",
        currency_code: "CAD",
        currency_symbol: "C$",
        created_ts: new Date()
      },
      {
        currency: "Australian Dollar",
        currency_code: "AUD",
        currency_symbol: "A$",
        created_ts: new Date()
      },
      {
        currency: "Swiss Franc",
        currency_code: "CHF",
        currency_symbol: "Fr.",
        created_ts: new Date()
      },
      {
        currency: "Chinese Yuan",
        currency_code: "CNY",
        currency_symbol: "¥",
        created_ts: new Date()
      },
      {
        currency: "Brazilian Real",
        currency_code: "BRL",
        currency_symbol: "R$",
        created_ts: new Date()
      },
      {
        currency: "Indian Rupee",
        currency_code: "INR",
        currency_symbol: "₹",
        created_ts: new Date()
      },
      {
        currency: "Russian Ruble",
        currency_code: "RUB",
        currency_symbol: "₽",
        created_ts: new Date()
      },
      {
        currency: "South Korean Won",
        currency_code: "KRW",
        currency_symbol: "₩",
        created_ts: new Date()
      },
      {
        currency: "Mexican Peso",
        currency_code: "MXN",
        currency_symbol: "$",
        created_ts: new Date()
      },
      {
        currency: "South African Rand",
        currency_code: "ZAR",
        currency_symbol: "R",
        created_ts: new Date()
      }
    ]);
 
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('currencies', null, {});
 
  }
};
