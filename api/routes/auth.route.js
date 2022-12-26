const express = require("express");
const { route } = require("..");
const router = express.Router();
const authController = require("../controller/auth.controller");
const authValidator = require("../utils/validation/auth.validation");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", authValidator.register, authController.register);
router.post("/login", authValidator.login, authController.login);

module.exports = router;
