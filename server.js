
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

var uploadRouter = require('./upload');
const app = express();
app.use(express.json());

app.use('/uploads', express.static('./public/uploads'));
app.use(express.urlencoded({ extended: false }));

require('./db/mongooseDb');
const User = require('./models/user');
const Product = require('./models/product');

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/upload', uploadRouter);
module.exports = app;

app.post('/register', (req, res) => {
    console.log(req.body);
    var user = new User(req.body);
    user.save();
    res.json("Successful");
});

app.post('/add-cloth', (req, res) => {
    var product = new Product(req.body);
    product.save().then(function (req1, res1) {
        res.json("Success");
    }).catch(function (e) {
        
    });
});

app.get('/all-clothes', (req, res, next) => {
    console.log('ok');
    Product.find({})
        .then((product) => {
            res.json(product);
        }, (err) => next(err))
        .catch((err) => next(err));
});

app.post('/login', (req, res, next) => {
    console.log(req.body);
    User.findOne({ username: req.body.username, password: req.body.password }).then((user) => {
       console.log(user)
            if(user){ 
            res.json("Successfull");
         
        }else{
             res.json("Invalid");
         }
        
    }, (err) => next(err))
        .catch((err) => next(err));
});

app.listen(3000);
