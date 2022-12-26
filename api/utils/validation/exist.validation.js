const Joi = require("joi");
const { User } = require("../../db/models");

const customThrowErrorJoiString = (msg, field) => {
  throw new Joi.ValidationError(
    msg,
    [
      {
        message: msg,
        path: [field],
        type: `string.${field}`,
        context: {
          key: field,
          label: field,
          field,
        },
      },
    ],
    field
  );
};

module.exports = {
  isUsernameAvailable: async (username) => {
    const user = await User.findOne({ where: { username: username } });
    if (user) {
      customThrowErrorJoiString("Username already exist", "username");
    }

    return true;
  },
  isEmailAvailable: async (email) => {
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      customThrowErrorJoiString("Email already exist", "email");
    }
    return true;
  },
};
