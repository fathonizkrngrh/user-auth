const { register } = require("../services/auth.service");

module.exports = {
  register: async (req, res) => {
    try {
      const userServicesResponse = await register(req);
      return res.status(userServicesResponse.code).json(userServicesResponse);
    } catch (err) {
      return res.status(err.code).json(err);
    }
  },
};
