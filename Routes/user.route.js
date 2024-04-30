const express = require('express');
const router = express.Router();
const {regValidation, loginValidation} = require('../middlewares/expressValidator');
const {signup, login, logout, follow, updateUser, getUserprofile} =require('../controllers/userController')
const verifyuser = require('../middlewares/verifyJwt')


router.get('/getProfile/:username',getUserprofile )
router.post('/signup',regValidation,signup )
router.post('/login',loginValidation,login )
router.get('/logout',logout )
router.get('/follow/:id',verifyuser, follow )
router.post('/update/:id',verifyuser,updateUser)


module.exports = router;