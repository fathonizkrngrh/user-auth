const { User, Role } = require("../db/models");
const { StatusCodes: status } = require("http-status-codes");
const { apiResponse } = require("../utils/apiResponse.utils");
const { hashPassword, checkPassword } = require("../utils/bcrypt.utils");

module.exports = {
  register: async (req) => {
    try {
      const { fullname, username, email, password } = req.body;
      const role = await Role.findOne({ where: { name: "USER" } });

      const hashed = await hashPassword(password);

      const user = {
        fullname,
        username,
        email,
        password: hashed,
        roleId: role.id || 1,
      };

      await User.create(user);

      return apiResponse(
        status.CREATED,
        "CREATED",
        "Success create a new account",
        user
      );
    } catch (err) {
      throw apiResponse(
        err.code || status.INTERNAL_SERVER_ERROR,
        err.status || "INTERNAL_SERVER_ERROR",
        err.message
      );
    }
  },
};
