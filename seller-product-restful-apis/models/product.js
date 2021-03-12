const mongoose = require('mongoose')

require('./db')

module.exports = {
    Product: new mongoose.model('Product', new mongoose.Schema({
        title: {
            type: String
        },
        price: {
            type: Number
        },
        description: {
            type: String
        },
        productpic: {
            type: String
        }
    }, {
        timestamps: true
    }))
}