const express = require('express');
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, done) => {
        let ext = path.extname(file.originalname);
        done(null, file.fieldname + Date.now() + ext);
    }
});

var imageFileFilter = (req, file, done) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
        return done(new Error('Only image files are allowed'), false);
    }
    done(null, true);
}

var upload = multer({
    storage: storage,
    fileFilter: imageFileFilter,
    limits: { fileSize: 1000000 }
})

var uploadRouter = express.Router();

uploadRouter.route('/')
.post(upload.single('imageFile'), (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(req.file);
});

module.exports = uploadRouter;
