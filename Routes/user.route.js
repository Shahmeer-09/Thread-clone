const express = require('express');
const router = express.Router();
const {regValidation, loginValidation} = require('../middlewares/expressValidator');
const {signup, login, logout, follow, updateUser, getUserprofile, getUser, getPost} =require('../controllers/userController')
const verifyuser = require('../middlewares/verifyJwt')

router.get('/userposts/:username', getPost)
router.get('/current', verifyuser, getUser)
router.get('/Profile/:param',getUserprofile )
router.post('/signup',regValidation,signup )
router.post('/login',loginValidation,login )
router.get('/logout',logout )
router.get('/follow/:id',verifyuser, follow )
router.put('/update/:id',verifyuser,updateUser)


module.exports = router;