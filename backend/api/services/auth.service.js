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

      const usernameExist = await User.findOne({
        where: { username: username },
      });
      if (usernameExist) {
        throw apiResponse(
          status.BAD_REQUEST,
          "BAD_REQUEST",
          "Username already exist"
        );
      }
      const emailExist = await User.findOne({ where: { email: email } });
      if (emailExist) {
        throw apiResponse(
          status.BAD_REQUEST,
          "BAD_REQUEST",
          "Username already exist"
        );
      }
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
        where: { email },
        include: "role",
      });
      if (!user) {
        throw apiResponse(
          status.BAD_REQUEST,
          "BAD_REQUEST",
          "Email doesn't exist!!"
        );
      }

      const isPasswordValid = await checkPassword(password, user.password);
      if (!isPasswordValid) {
        throw apiResponse(
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
  me: async (req) => {
    try {
      const { id } = req.user;
      const user = await User.findByPk(id, { include: "role" });
      if (!user)
        throw apiResponse(status.NOT_FOUND, "NOT_FOUND", "User not found");

      const userTransformed = UserTransform(user);

      return apiResponse(status.OK, "OK", "Success get authenticated user", {
        user: userTransformed,
      });
    } catch (e) {
      throw apiResponse(
        e.code || status.INTERNAL_SERVER_ERROR,
        e.status || "INTERNAL_SERVER_ERROR",
        e.message
      );
    }
  },

  changePwd: async (req) => {
    try {
      const { id } = req.user;
      const { oldPassword, newPassword } = req.body;

      const user = await User.findByPk(id);
      if (!user)
        throw apiResponse(status.NOT_FOUND, "NOT_FOUND", "User not found");

      const isPasswordValid = await checkPassword(oldPassword, user.password);
      if (!isPasswordValid) {
        throw apiResponse(
          status.BAD_REQUEST,
          "BAD_REQUEST",
          "Old password does not match!"
        );
      }

      const hashed = await hashPassword(newPassword);
      const updatePassword = await user.update({
        password: hashed,
      });

      const userTransformed = UserTransform(updatePassword);

      return apiResponse(
        status.OK,
        "OK",
        `Success change ${user.username} password`,
        {
          user: userTransformed,
        }
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
