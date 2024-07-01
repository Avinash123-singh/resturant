const express = require("express");
const {
  RegisterController,
  loginController,
} = require("../controllers/authController");
const router = express.Router();

//routes
//REGISTER || POST
router.post("/register", RegisterController);
//LOGIN || POST
router.post("/login", loginController);
module.exports = router;
