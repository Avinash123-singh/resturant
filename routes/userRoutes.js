const express = require("express");
const {
  userController,
  updateUserController,
  resetPasswordController,
  updateUserPassword,
  deleteProfile,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//routes
//GET USER DATA
router.get("/getUser", authMiddleware, userController);

//UPDATE PROFILE

router.put("/updateUser/:id", authMiddleware, updateUserController);

//RESET PASSWORD

router.post("/resetPassword", authMiddleware, resetPasswordController);

//PASSWORD UPDATE

router.post("/updatePassword", authMiddleware, updateUserPassword);

//DELETE USER

router.delete("/deleteUser/:id", authMiddleware, deleteProfile);

module.exports = router;
