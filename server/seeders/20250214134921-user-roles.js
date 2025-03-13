'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user_roles', [{
      role_id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      role_name: 'admin',
      notes: 'With great powers comes great resposabilites. Admin user can do everything.'
    },
    {
      role_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      role_name: 'viewer',
      notes: 'Viewer user only has the permission to view.'
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
