const jwt = require("jsonwebtoken");
const User = require("..//models/user.model");
const { unauthenticatedError } = require("../utils/customerrors");

const verifyuser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) { 
      throw new unauthenticatedError("Authentication invalid");
    }

    const decoded =jwt.verify(token, process.env.ACCESS_JWT_SECRET);

    const user = await User.findOne({ _id: decoded._id }).select("-password");
   
    if (!user) {
      throw new unauthenticatedError("Authentication invalid");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new unauthenticatedError("Authentication invalid try again!");
  }
};

module.exports = verifyuser;
