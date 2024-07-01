const mongoose = require("mongoose");

//Schema

const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Food Title is required"],
    },
    decription: {
      type: String,
      required: [true, "Food Description is required "],
    },
    price: {
      type: Number,
      required: "Food Price is required ",
    },
    imageURL: {
      type: String,
      default:
        "https://t3.ftcdn.net/jpg/02/52/38/80/360_F_252388016_KjPnB9vglSCuUJAumCDNbmMzGdzPAucK.jpg",
    },
    foodTags: {
      type: String,
    },
    category: {
      type: String,
    },
    code: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    resturant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resturant",
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
  },

  { Timestamps: true }
);

//export

module.exports = mongoose.model("foods", foodSchema);
