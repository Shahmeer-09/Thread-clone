const jwt  = require('jsonwebtoken')
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlenght: 6,
    },
    profilepic: {
      type: String,
      default: "",
    },
    porfilepublic: {
      type: String,
      default:"",
    },
    followers: {
      type: [String],
      default: [],
    },
    following: {
      type: [String],
      default: [],
    },
    bio:{
      type: String,
      default: "",
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.giveAccesstoken = function () {
  const token = jwt.sign(
    {
         _id: this._id,
         username: this.username,
         email: this.email,
     },
    process.env.ACCESS_JWT_SECRET,
     {
         expiresIn: "1d",
     } 
  );

  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
