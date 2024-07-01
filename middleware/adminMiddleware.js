const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    const user = await userModel.findById({ _id: req.body.id });
    console.log(user);
    if (user.usertype !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Only Admin can Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "UnAuthorized Access",
    });
  }
};
