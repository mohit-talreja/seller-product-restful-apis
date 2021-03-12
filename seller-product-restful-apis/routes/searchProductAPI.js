const router = require('express').Router()

const jwt = require('jsonwebtoken')

const { Seller } = require('../models/seller')

const { Product } = require('../models/product')

const { verifyToken } = require('../middlewares/verifyToken')

router.get('/', verifyToken, async (req, res) => {
    try {
        const authData = await jwt.verify(req.token, 'SECRETKEY')
        if(authData){
            const { nModified } = await Seller.updateOne({ email: authData.email }, {
                $set: { verify: true }
            })
            const { searchInputKeyword } = req.body
            const regex = new RegExp(searchInputKeyword)
            const product = await Product.findOne({ title: { $regex: regex } })
            if(product){
                return res.status(200).json({
                    message: `${authData.email} Is A Verified Seller`,
                    product
                })
            } else {
                return res.status(404).json({ errMessage: 'Product Not Found' })
            }
        } else {
            res.sendStatus(403)
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

module.exports = router