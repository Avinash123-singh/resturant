const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const {
  createFoodController,
  getFoodController,
  FoodById,
  FoodByResturantId,
  updateFoodController,
  deleteFoodController,
  foodOrder,
  orderStatus,
} = require("../controllers/foodController");
const adminMiddleware = require("../middleware/adminMiddleware");

//CREATE FOOD

router.post("/create", authMiddleware, createFoodController);

//GET FOOD
router.get("/getFood", authMiddleware, getFoodController);

// GET SINGLE FOOD
router.get("/getFoodById/:id", authMiddleware, FoodById);

//GET FOOD BY RESTURNAT
router.get("/getFoodByResturant/:id", authMiddleware, FoodByResturantId);

//UPDATE FOOD
router.put("/updateFood/:id", authMiddleware, updateFoodController);

//DELETE FOOD ITEMS
router.delete("/deleteFood/:id", authMiddleware, deleteFoodController);

//PLACE ORDER
router.post("/placeOrder", authMiddleware, foodOrder);

//ORDER STATUS
router.post("/statusOrder/:id", authMiddleware, adminMiddleware, orderStatus);

module.exports = router;
