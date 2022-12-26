const { User, Role } = require("../db/models");
const { StatusCodes: status } = require("http-status-codes");
const { apiResponse } = require("../utils/apiResponse.utils");
const { hashPassword, checkPassword } = require("../utils/bcrypt.utils");
const { UserTransform } = require("../helpers/userTransformer");
const { generateToken } = require("../utils/jwt.utils");

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
        provider: "local",
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
  login: async (req) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: { email: email },
        include: "role",
      });
      if (!user) {
        return apiResponse(
          status.BAD_REQUEST,
          "BAD_REQUEST",
          "Email doesn't exist!!"
        );
      }

      const isPasswordValid = await checkPassword(password, user.password);
      if (!isPasswordValid) {
        return apiResponse(
          status.BAD_REQUEST,
          "BAD_REQUEST",
          "Wrong password!!"
        );
      }

      const token = generateToken(user);
      const userTransformed = UserTransform(user);

      return apiResponse(status.OK, "OK", "Success Login", {
        user: userTransformed,
        token,
      });
    } catch (err) {
      console.log(err);
      throw apiResponse(
        err.code || status.INTERNAL_SERVER_ERROR,
        err.status || "INTERNAL_SERVER_ERROR",
        err.message
      );
    }
  },
};
