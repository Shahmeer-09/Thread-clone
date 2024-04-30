const { StatusCodes } = require("http-status-codes");
const User = require("../models/user.model");
const ApiResponse = require("../utils/Apiresponse");
const { badReqError } = require("../utils/customerrors");
const AsyncError = require("../utils/HocError");

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
    .json(new ApiResponse(StatusCodes.OK, "user created succefully"));
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
  //  const existedUSer = await User.findOne({_id:user._id});
  const token = await user.giveAccesstoken();
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    secure: false,
    sameSite: "strict",
  });
  res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, user, "login successfully"));
});
const logout = (req, res) => {
  res.clearCookie("token");
  res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, "logout successfully"));
};

const follow = AsyncError(async (req, res) => {
  const { id } = req.params;
  const usertoMoidfy = await User.findById(id);
  const currentUser = await User.findById(req.user._Id);
  if (id == req.user._id) throw new badReqError("you can't follow yourself");

  if (!usertoMoidfy || currentUser) throw new badReqError("user not found");

  const isFollowing = currentUser?.following?.includes(id);

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
      .json(new ApiResponse(StatusCodes.OK, " follow successfully"));
  }
});

const updateUser = AsyncError(async (req, res) => {
  const userid = req.user._id;
  const user = await User.findById(userid);
  if (!user) throw new badReqError("user not found");

  if (req.params.id !== req.user._id.toString())
    throw new badReqError("you can only update your profile");
  const updatedUser = await User.findByIdAndUpdate(userid, req.body, {
    new: true,
  }).select("-password");
  res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(StatusCodes.OK, "user updated successfully", updatedUser)
    );
});

const getUserprofile = AsyncError(async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username }).select("-password -updatedAt");
  if (!user) throw new badReqError("user not found");
  res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, "user found", user));
});
module.exports = { signup, login, logout, follow, updateUser, getUserprofile };
