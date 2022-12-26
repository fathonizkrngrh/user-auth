const { register, login } = require("../services/auth.service");

module.exports = {
  register: async (req, res) => {
    try {
      const userServicesResponse = await register(req);
      return res.status(userServicesResponse.code).json(userServicesResponse);
    } catch (err) {
      return res.status(err.code).json(err);
    }
  },
  login: async (req, res) => {
    try {
      const userServicesResponse = await login(req);
      return res.status(userServicesResponse.code).json(userServicesResponse);
    } catch (err) {
      return res.status(err.code).json(err);
    }
  },
};
