const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
const Multer = require("multer");

const diarySchema =new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    Title:{
        type:String,
        require:true,
    },
    content:{
        type:String,
        require:true,
    },
    date:
    {
        day:{
            type:String,
            require:true
        },
        month:{
            type:String,
            require:true
        },
        year:{
            type:String,
            require:true
        }
    },
    image: 
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        },
    favourite:{
        type:Boolean,
        require:true,
    }
})
const encryptedFieldsMap = {
    encryptedFields: {
      fields: [
        {
          path: "diary.content",
          bsonType: "string"
        },
        {
          path: "diary.Title",
          bsonType: "string",
        },
        {
            path: "diary.image",
            bsonType: "object",
        },
      ],
    },
  };
const Diary = new mongoose.model("diary",diarySchema);
module.exports = {Diary,encryptedFieldsMap};
