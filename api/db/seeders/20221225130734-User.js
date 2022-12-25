"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          fullname: "Fathoni Zikri Nugroho",
          username: "fathoni",
          email: "fathoni@email.com",
          password: await bcrypt.hash("Abc123456!", 10),
          emailVerifiedAt: new Date(),
          roleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullname: "Admin",
          username: "Admin",
          email: "admmin@email.com",
          password: await bcrypt.hash("12345ABC!", 10),
          emailVerifiedAt: new Date(),
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
