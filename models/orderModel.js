const mongoose = require("mongoose");

//Schema

const orderSchema = new mongoose.Schema(
  {
    food: [{ type: mongoose.Schema.Types.ObjectId, ref: "foods" }],
    payments: {},
    buyers: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["Preparing", "Prepared", "Out For Delivery", "Deliverd"],
      default: "Preparing",
    },
  },
  { Timestamps: true }
);

//export

module.exports = mongoose.model("order", orderSchema);
