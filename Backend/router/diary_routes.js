
const express = require("express");
const{cloudinary}=require("../utils/clodinary_upload");
const authcontrol =require("../controllers/controls-diary")
const Diary = require("../Models/diary_models")
const diary_router= express.Router();

diary_router.route('/Write').post( authcontrol.Write);
diary_router.route('/Media').get(authcontrol.Media);
// diary_router.route('/Calender').get(authcontrol.Calender);
// diary_router.route('/Memories').get(authcontrol.Memories);

module.exports = diary_router;