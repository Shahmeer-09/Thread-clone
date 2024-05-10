const AsyncError = require("../utils/HocError");
const User = require("../models/user.model");
const Post = require("../models/post.model");
const { badReqError, unauthorizedError } = require("../utils/customerrors");
const ApiResponse = require("../utils/Apiresponse");
const { StatusCodes } = require("http-status-codes");
const Uploadoncloudinary = require('../utils/Uploadoncloudinary')
const {v2:cloudinary} = require('cloudinary')
const createPost = AsyncError(async (req, res) => {
  const newpost = { ...req.body };
  const user = await User.findById(newpost.postedBy);
  if (!user) throw new badReqError("User not found");
  if (user._id.toString() !== req.user._id.toString())
    throw new unauthorizedError("User not authorized to post");
  if (newpost.img) {
    const post = await Uploadoncloudinary(newpost.img);
    newpost.img = post.profilepic;
    newpost.imgpublicId = post.public_id;
  }
  const postnew = await Post.create(newpost);

  res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, null, "post created successfully"));
});

const getpost = AsyncError(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw new badReqError("Post not found");
  res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, post, "posts fetched successfully"));
});
const deletPost = AsyncError(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw new badReqError("Post not found");
  if (post.postedBy.toString() !== req.user._id.toString())
    throw new unauthorizedError("User not authorized");
  if(post.imgpublicId){
    await  cloudinary.uploader.destroy(post.imgpublicId)
  }
  await Post.findByIdAndDelete(req.params.id);
  res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, null, "post deleted successfully"));
});

const likedPost = AsyncError(async (req, res) => {
  const { id: postid } = req.params;
  const user = req.user._id;
  const post = await Post.findById(postid);
  if (!post) throw new badReqError("Post not found");
  const isLiked = post.likes.includes(user);

  const update = isLiked
    ? { $pull: { likes: user } }
    : { $push: { likes: user } };
  const message = isLiked
    ? "post unliked successfully"
    : "post liked successfully";

  const lukedPost = await Post.findOneAndUpdate({ _id: postid }, update, {
    new: true,
  });
  console.log(lukedPost);
  res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, lukedPost, message));
});

const postReplies = AsyncError(async (req, res) => {
  const postid = req.params.id;
  const { text } = req.body;
  const userId = req.user._id;
  const userProfilePic = req.user.profilepic;
  const username = req.user.username;
  const post = await Post.findById(postid);
  if (!post) throw new badReqError("Post not found");
  const reply = { userId, text, userProfilePic, username };
  post.replies.push(reply);
  await post.save();
  res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, post, "post replied successfully"));
});

const feedPosts = AsyncError(async (req, res) => {
  const user = req.user._id;
  const currentuser = await User.findById(user);
  if (!currentuser) throw new badReqError("User not found");
  const following = currentuser.following;
  const feed = await Post.find({ postedBy: { $in: following } }).sort({
    createdAt: -1,
  });

  res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, feed, "feed fetched successfully"));
});

module.exports = {
  createPost,
  getpost,
  deletPost,
  likedPost,
  postReplies,
  feedPosts,
};
