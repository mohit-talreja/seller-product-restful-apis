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
            const products = await Product.find()
            res.status(200).json({
                message: `${authData.email} Is A Verified Seller`,
                products
            })
        } else {
            res.sendStatus(403)
        }
    } catch (err) {
        res.status(500).json({ errMessage: 'Internal Server Error' })
    }
})

module.exports = router