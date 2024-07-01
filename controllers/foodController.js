//Create Food Controller

const { log } = require("console");
const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

const createFoodController = async (req, res) => {
  try {
    const {
      title,
      decription,
      price,
      imageURL,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
    } = req.body;
    if (!title || !decription || !price || !resturant) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All The Details",
      });
    }
    const newFood = new foodModel({
      title,
      decription,
      price,
      imageURL,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
    });
    await newFood.save();
    res.status(201).send({
      success: true,
      message: "New Food Item Created",
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating food ",
    });
  }
};
//GET ALL FOOD

const getFoodController = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    if (!foods) {
      return res.status(404).send({
        success: false,
        totalFood: foods.length,
        foods,
        messsage: "Unable To Find The Food App",
      });
    }
    res.status(200).send({
      success: true,
      message: "All the Food gets successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error to get all food",
    });
  }
};

//GET FOOD BY ID

const FoodById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Unable to find food by id",
      });
    }
    const foodId = await foodModel.findById(id);
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Food id not available",
      });
    }
    res.status(201).send({
      success: true,
      message: "Food Get Successfully By Id",
      foodId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting food by Id ",
    });
  }
};

//GET FOOD BY RESTURANT

const FoodByResturantId = async (req, res) => {
  try {
    const resturantid = req.params.id;
    if (!resturantid) {
      return res.status(404).send({
        success: false,
        message: "Unable to find food by id",
      });
    }
    const food = await foodModel.find({ resturant: resturantid });
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food id not available",
      });
    }
    res.status(201).send({
      success: true,
      message: "Food Get Successfully By Resturant Id",
      resturantid,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting food by Id ",
    });
  }
};

//Update Food Controller

const updateFoodController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).send({
        success: false,
        message: "Unable to find Food by Id",
      });
    }
    const foodId = await foodModel.findById(id);
    if (!foodId) {
      res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }
    const {
      title,
      decription,
      price,
      imageURL,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
    } = req.body;
    const updatedFood = await foodModel.findByIdAndUpdate(
      id,
      {
        title,
        decription,
        price,
        imageURL,
        foodTags,
        category,
        code,
        isAvailable,
        resturant,
        rating,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Food Updated Successfully",
      updatedFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating food ",
      error,
    });
  }
};

//DELETE FOOD CONTROLLER
const deleteFoodController = async (req, res) => {
  try {
    const deleteId = req.params.id;
    if (!deleteId) {
      return res.status(404).send({
        success: false,
        message: "Unable to delete food items",
      });
    }
    const foodId = await foodModel.findById(deleteId);
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "food item not deleted ",
      });
    }
    await foodModel.findByIdAndDelete(deleteId);
    res.status(201).send({
      success: true,
      message: "Food Item Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting food items",
    });
  }
};
const foodOrder = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart) {
      return res.status(500).send({
        success: false,
        message: "Error in food cart ",
      });
    }
    let total = 0;
    //CALCULATE
    cart.map((i) => {
      total += i.price;
    });
    const newOrder = new orderModel({
      food: cart,
      payments: total,
      buyers: req.body.id,
    });
    await newOrder.save();
    res.status(201).send({
      success: true,
      message: "Order Placed Successfully",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Food Ordering",
      error,
    });
  }
};
//Update Order Status
const orderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "unable to find order Id",
      });
    }
    const { status } = req.body;
    if (!status) {
      return res.status(404).send({
        success: false,
        message: "Status not updated ",
      });
    }
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Order Status Updated ",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in change order status ",
    });
  }
};
module.exports = {
  createFoodController,
  getFoodController,
  FoodById,
  FoodByResturantId,
  updateFoodController,
  deleteFoodController,
  foodOrder,
  orderStatus,
};
