//GET USER INFO

const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

const userController = async (req, res) => {
  try {
    //Find User
    const user = await userModel.findById({ _id: req.body.id });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    //Hide Password
    user.password = undefined;
    //response
    res.status(200).send({
      success: true,
      message: "User get Successfully",
    });
    user;
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In GET User API",
    });
  }
};
//UPDATE USER

const updateUserController = async (req, res) => {
  try {
    //Find User
    const user = await userModel.findById({ _id: req.body.id });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    //UPDATE
    const { username, address, phone } = req.body;
    if (username) user.username = username;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    //SAVE USER

    await user.save();
    res.status(200).send({
      success: true,
      message: "User Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Updating User API",
      error,
    });
  }
};
//RESET PASSWORD

const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please provide all field",
      });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User Not Found/Invalid Answer",
      });
    }
    //Hashing Password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Password Reset API",
      error,
    });
  }
};
//UPDATE USER PASSWORD

const updateUserPassword = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.id });
    //VALIDATION
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    //get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please provide old or new password",
      });
    }
    //Comapare Password

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid old Password",
      });
    }
    //Hashing Password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashPassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password Updated Successfuly",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Invalid Old Password",
    });
  }
};
//DELETE USER ACCOUNT

const deleteProfile = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Your account is deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete profile API",
      error,
    });
  }
};

module.exports = {
  userController,
  updateUserController,
  resetPasswordController,
  updateUserPassword,
  deleteProfile,
};
