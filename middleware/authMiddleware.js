// const JWT = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   try {
//     //GET TOKEN
//     const token = req.header("authorization").split(" ")[1];
//     JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
//       if (err) {
//         return res.status(401).send({
//           success: false,
//           message: "Unauthorized User",
//         });
//       } else {
//         req.body.id = decode.id;
//         next();
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error in Auth API Token",
//     });
//   }
// };

const JWT = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // GET TOKEN
    const token = req.header("authorization").split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          // Token is expired
          const newToken = JWT.sign({ id: decode.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
          return res.status(401).send({
            success: false,
            message: "Token expired",
            token: newToken,
          });
        } else {
          // Other JWT errors
          return res.status(401).send({
            success: false,
            message: "Unauthorized User",
          });
        }
      } else {
        // Check if id is deleted (example: id doesn't exist in the database anymore)
        if (!decode.id) {
          return res.status(401).send({
            success: false,
            message: "ID deleted",
          });
        }

        // Token is valid, attach decoded id to request body
        req.body.id = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Auth API Token",
    });
  }
};
