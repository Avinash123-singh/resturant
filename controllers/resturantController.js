//CREATE RESTURANT

const resturantModel = require("../models/resturantModel");

const createResturantController = async (req, res) => {
  try {
    const {
      title,
      address,
      imageUrl,
      food,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords = {},
    } = req.body;

    //VLIDATION
    if (!title || !coords) {
      return res.status(404).send({
        success: false,
        message: "Please Provide title and address",
      });
    }
    const newResturant = new resturantModel({
      title,
      imageUrl,
      address,
      food,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newResturant.save();

    res.status(201).send({
      success: true,
      message: "New Resturant Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating resturant API",
      error,
    });
  }
};
//GET ALL RESTURANT
const getAllResturant = async (req, res) => {
  try {
    const resturants = await resturantModel.find({});
    if (!resturants) {
      return res.status(404).send({
        success: false,
        message: "No Resturant Available",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: resturants.length,
      resturants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting all resturant API",
    });
  }
};
const getResturantById = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide Resturant Id",
      });
    }
    //find resturant
    const resturant = await resturantModel.findById(resturantId);
    if (!resturant) {
      return res.status(404).send({
        success: false,
        message: "Resturant Not Found ",
      });
    }
    res.status(200).send({
      success: true,
      resturant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting Resturant by Id",
    });
  }
};
//DELETE RESTURANT
const resturantDeleteController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
      });
    }
    await resturantModel.findByIdAndDelete(resturantId);
    res.status(200).send({
      success: true,
      message: "Resturant Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Unable To Delete Resturant",
      error,
    });
  }
};

module.exports = {
  createResturantController,
  getAllResturant,
  getResturantById,
  resturantDeleteController,
};
