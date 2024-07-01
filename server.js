const express = require("express");

const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

// rest object

const app = express();
require("./connection/connec");

//middleware
app.use(cors());

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/test", require("./routes/testRoute"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/resturant", require("./routes/resturantRoutes"));
app.use("/api/v1/category", require("./routes/categoryRoutes"));
app.use("/api/v1/food", require("./routes/foodRoutes"));

//
app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome to food hub</h1>");
});

app.listen(8000, () => {
  console.log("hello");
});
