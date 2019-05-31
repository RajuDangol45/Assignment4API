const mongoose = require('mongoose');
const Product = mongoose.model('Product',
    {
        itemName: { 
            type: String
        },
       itemPrice: {  
            type: Number  
        },
        itemImageName: { 
            type: String 
        },  
        itemDescription: { 
            type: String 
        }
    });
    module.exports = Product 