const verifySignUp = require("../middleware/verifySignup");
const controller = require("../controllers/auth.controller");
const verifyPassword = require('../middleware/passwordValidator');

module.exports = function(app) {

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateEmail
    ],
    verifyPassword,
    controller.signup
  );

  app.post("/api/auth/login", controller.login);

};