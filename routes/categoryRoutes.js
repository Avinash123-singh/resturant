const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const {
  createCategoryController,
  getAllCategory,
  updateCategotyController,
  deleteCategoryController,
} = require("../controllers/categoryController");

const router = express.Router();

//routes
//CREATE CATEGORY

router.post("/create", authMiddleware, createCategoryController);

//Get All Category
router.get("/getAll", authMiddleware, getAllCategory);

//UPDATE CATEGORY
router.put("/updateCategory/:id", authMiddleware, updateCategotyController);

//DELETE CATEGORY

router.delete("/deleteCategory/:id", authMiddleware, deleteCategoryController);

module.exports = router;
