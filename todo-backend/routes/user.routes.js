const express=require('express');
const { addUser, loginUser } = require('../controllers/user.controllers');

const UserRouter=express.Router();
// console.log('inside UserRouter .')
// user signup
UserRouter.post('/signup',addUser);

// user login
UserRouter.post('/login',loginUser);

module.exports=UserRouter;