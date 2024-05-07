const jwt = require("jsonwebtoken");
const { unauthenticatedError } = require("../utils/customerrors");
const { StatusCodes } = require("http-status-codes");

const verifyuser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token)
      throw new unauthenticatedError("Authentication invalid token expires");

    const decoded = jwt.verify(token, process.env.ACCESS_JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: error.message, statusCode:StatusCodes.UNAUTHORIZED });
    console.log("Error in authentication: ", error.message);
  }
};

module.exports = verifyuser;
