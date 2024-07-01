//CREATE CONTROLLER

const categoryModel = require("../models/categoryModel");

const createCategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    //VALIDATION
    if (!title) {
      res.status(500).send({
        success: false,
        message: "please provide title and image",
      });
    }
    const newCategory = new categoryModel({ title, imageUrl });
    await newCategory.save();
    res.status(200).send({
      success: true,
      message: "Category Created Successfully",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating category API",
      error,
    });
  }
};
//GET ALL CATEGORY CONTROLLER
const getAllCategory = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "Categories Not Found ",
      });
    }
    res.status(200).send({
      success: true,
      totalCat: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting all api",
    });
  }
};
//Update Category Controller

const updateCategotyController = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, imageUrl } = req.body;
    const updateCategoty = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );
    if (!updateCategoty) {
      return res.status(500).send({
        success: false,
        message: " Category Not Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: " Error in updating category API",
    });
  }
};
const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(500).send({
        success: false,
        message: "please provide category id",
      });
    }
    const deleteCategory = await categoryModel.findById(id);
    if (!deleteCategory) {
      return res.status(500).send({
        success: false,
        message: "Error in deleting the category",
      });
    }
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succces: false,
      message: "Error in deleting category",
    });
  }
};

module.exports = {
  createCategoryController,
  getAllCategory,
  updateCategotyController,
  deleteCategoryController,
};
