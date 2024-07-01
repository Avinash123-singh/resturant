const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const {
  createResturantController,
  getAllResturant,
  getResturantById,
  resturantDeleteController,
} = require("../controllers/resturantController");

const router = express.Router();

//routes
//CREATE RESTURANT || POST
router.post("/create", authMiddleware, createResturantController);

//GET ALL RESTURANT || GET
router.get("/allResturant", getAllResturant);

// GET RESTURANT BY ID
router.get("/resturant/:id", getResturantById);

//DELETE RESTURANT
router.delete(
  "/deleteResturant/:id",
  authMiddleware,
  resturantDeleteController
);
module.exports = router;
