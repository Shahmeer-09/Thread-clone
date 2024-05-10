const { body, validationResult, param } = require("express-validator");
const { badReqError } = require("../utils/customerrors");
const User = require("../models/user.model");
const validateFunc = (validationValues) => {
  return [
    validationValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorsmsg = errors.array().map((err) => err.msg);
        throw new badReqError(errorsmsg);
      }
      next();
    },
  ];
};

module.exports.regValidation = validateFunc([
  body("name").notEmpty().withMessage("name is required"),
  body("username").notEmpty().withMessage("username is required"),
  body("email").isEmail().withMessage("email is required"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be atleast 6 characters"),
]);
module.exports.loginValidation = validateFunc([
  body("username").notEmpty().withMessage("username is required"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be atleast 6 characters")
]);
module.exports.createPostValidation = validateFunc([
  body("postedBy").notEmpty().withMessage("please provide some text"),
  body("text")
    .notEmpty()
    .withMessage("Porvide some Text to post")
]);
module.exports.commentValidation = validateFunc([
  body("text").notEmpty().withMessage("please provide some text"),
]);

    