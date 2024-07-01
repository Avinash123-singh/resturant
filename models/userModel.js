const mongoose = require("mongoose");

//schema

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "user name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    address: {
      type: Array,
    },
    phone: {
      type: String,
      required: [true, "Phone number id required"],
    },
    usertype: {
      type: String,
      required: [true, "User is required"],
      default: "Client",
      enum: ["Client", "Admin", "vendor", "driver"],
    },
    Profile: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  { timeStamp: true }
);

//export
module.exports = mongoose.model("User", userSchema);
