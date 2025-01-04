'use strict';

const { hashPass } = require('../Helpers/bycrpts');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users',[
      {
        email: 'user1@gmail.com',
        password: hashPass('user1'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user2@gmail.com',
        password: hashPass('user2'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user3@gmail.com',
        password: hashPass('user3'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
     ])
    },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
