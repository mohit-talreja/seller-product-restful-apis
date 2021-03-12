const mongoose = require('mongoose')

const validator = require('validator')

require('./db')

module.exports = {
    Seller: new mongoose.model('Seller', new mongoose.Schema({
        name: {
            type: String
        },
        email: {
            type: String,
            validate: value => {
                if(!validator.isEmail(value)){
                    throw new Error('Invalid Email!')
                }
            }
        },
        password: {
            type: String
        },
        mobile: {
            type: String
        },
        verify: {
            type: Boolean,
            default: false
        }
    }, {
        timestamps: true
    }))
}