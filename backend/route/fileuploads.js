
// INCLUDE ALL NECESSARY PACKAGES
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

// var url = "mongodb://127.0.0.1:27017/Media";
var MongoClient = require('mongodb').MongoClient;
const app = express();
// IMAGE UPLOAD CODE IN NODE.JS
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});
// FILE_FILTER WHICH IS PERMSSION FOR UPCOMING FILES FROM ANGULAR
const fileFilter = (req, file, cb) => {
    // ACCEPT OR REJECT A FILE
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'video/mp4' || file.mimetype === 'audio/ogg'
        || file.mimetype === 'audio/mp3' || file.mimetype === 'audio/x-m4a' || file.mimetype === 'application/octet-stream'
        || file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
// STORE THIS IMAGE IN A VARIABLE TO UPLOAD TO DATABASE
const upload = multer({
    storage: storage,
    //DEFINE THE SIZE OF IMAGE
    limits: {
        fileSize:  1024 * 1024 * 16  // 16MB Size
    },
    fileFilter: fileFilter
});
//..............................// Image Upload Code In node Js//.........................
const categoryModel = require('../app/modal/categoryModel')



router.post("/", upload.single('file'), (req, res, next) => {
    if(req.file.mimetype=="image/png" || req.file.mimetype=="image/jpeg" || req.file.mimetype=="image/jpg" || req.file.mimetype=="video/mp4"){

    const Category = new categoryModel({
        _id: new mongoose.Types.ObjectId(),
        title:req.body.title,
        path: req.file.path,
        name: req.file.filename,
        type:req.file.mimetype,
    });
    Category.save().then(result => {
        console.log(result);
       res.send( req.file.filename);
    });
}

   
});
router.get('/', (req, res, next) => {
    categoryModel.find(function (request, response) {
        res.status(200).json(response);
    });
});

module.exports = router;

