const express = require("express");
const authcontrol =require("../controllers/auth-control")
const user_router= express.Router(); 
user_router.route('/SignIn').post(authcontrol.SignIn);
user_router.route('/Signup').post(authcontrol.Signup);
module.exports = user_router;