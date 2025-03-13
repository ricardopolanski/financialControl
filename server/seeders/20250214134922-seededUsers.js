'use strict';
const {v4: uuidv4} = require('uuid');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        id: uuidv4(),
        role_id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        username: 'admin',
        first_name: 'Admin',
        last_name: 'QA',
        password: '$2a$10$rUmWe8M4B1PcmgNCAit5jehRimhMJdUNEDmWS9ozsh.xbC36.AmYC',
        active: true,
        created_ts: new Date(),
        security_question: 'Who am I?',
        security_answare: 'I am the master'
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
