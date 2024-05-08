const { StatusCodes } = require("http-status-codes");
const User = require("../models/user.model");
const ApiResponse = require("../utils/Apiresponse");
const { badReqError } = require("../utils/customerrors");
const Uploadoncloudinary = require("../utils/Uploadoncloudinary");
const AsyncError = require("../utils/HocError");
const { v2: cloudinary } = require("cloudinary");
const { default: mongoose } = require("mongoose");
const getUser = AsyncError(async (req, res) => {
  const userID = req.user._id;
  const user = await User.findById(userID).select("-password");
  res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, user, "user fetched successfully"));
});
const signup = AsyncError(async (req, res) => {
  const { name, username, email, password } = req.body;
  const user = await User.findOne({ $or: [{ username }, { email }] });
  if (user) {
    throw new badReqError("user with this email or username already exist!");
  }

  const newUSer = await User.create({
    name,
    username,
    email,
    password,
  });

  res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, null, "user created succefully"));
});
const login = AsyncError(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    throw new badReqError("user with this username does not exist!");
  }
  const matchpwd = await user.comparePassword(password);
  if (!matchpwd) {
    throw new badReqError("Invalid password");
  }
  const token = await user.giveAccesstoken();
  const rest = {
    _id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    bio: user.bio,
    profilePic: user.profilepic,
  };
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    secure: false,
    sameSite: "strict",
  });
  res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, rest, "login successfully"));
});
const logout = (req, res) => {
  res.clearCookie("token");
  res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, null, "logout successfully"));
};

const follow = AsyncError(async (req, res) => {
  const { id } = req.params;
  const usertoMoidfy = await User.findById(id);
  const currentUser = await User.findById(req.user._id);
  if (id == req.user._id) throw new badReqError("you can't follow yourself");

  if (!usertoMoidfy || !currentUser) throw new badReqError("user not found");

  const isFollowing = currentUser?.following?.includes(id);
  console.log(isFollowing);
  if (isFollowing) {
    await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
    await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
    res
      .status(StatusCodes.OK)
      .json(new ApiResponse(StatusCodes.OK, " unfollow successfully"));
  } else {
    await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
    await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
    res
      .status(StatusCodes.OK)
      .json(new ApiResponse(StatusCodes.OK, null, " follow successfully"));
  }
});

const updateUser = AsyncError(async (req, res) => {
  const newUser = { ...req.body };
  const userid = req.user._id;
  const user = await User.findById(userid);
  if (!user) throw new badReqError("user not found");
  if (req.params.id !== req.user._id.toString())
    throw new badReqError("you can only update your profile");
  const profile = await Uploadoncloudinary(newUser.profilepic);
  if (!profile) throw new badReqError("profile pic not uploaded");
  newUser.profilepic = profile.profilepic;
  newUser.porfilepublic = profile.public_id || "";
  const updatedUser = await User.findByIdAndUpdate(userid, newUser);
  if (newUser && updatedUser.porfilepublic) {
    await cloudinary.uploader.destroy(updatedUser.porfilepublic);
  }
  if (!updatedUser) throw new badReqError("user not updated");
  const usernew = await User.findById(userid).select("-password");
  res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(StatusCodes.OK, usernew, "user updated successfully")
    );
});

const getUserprofile = AsyncError(async (req, res) => {
  const {param} = req.params;

  let user;
  if ( mongoose.Types.ObjectId.isValid(param)) {
    user = await User.findOne({ _id: param }).select("-password -updatedAt");
  } else {
    user = await User.findOne({ username: param }).select(
      "-password -updatedAt"
    );
  }
  if (!user) throw new badReqError("user not found");
  res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, user, "user found"));
});
module.exports = {
  signup,
  login,
  logout,
  follow,
  updateUser,
  getUserprofile,
  getUser,
};
