const express = require('express');
const verifyuser = require('../middlewares/verifyJwt');
const router = express.Router();
const { createPost, getpost, deletPost, likedPost, postReplies, feedPosts } = require('../controllers/postController');
const {createPostValidation}  = require('../middlewares/expressValidator')

router.get("/getFeed", verifyuser, feedPosts)
router.post("/createPost", verifyuser, createPostValidation, createPost )
router.get("/getpost/:id", getpost )
router.delete("/deletePost/:id", verifyuser, deletPost )
router.post("/like/:id", verifyuser, likedPost)
router.post("/reply/:id", verifyuser, postReplies)
module.exports = router;