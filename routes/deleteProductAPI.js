const router = require('express').Router()

const jwt = require('jsonwebtoken')

const { Seller } = require('../models/seller')

const { Product } = require('../models/product')

const { verifyToken } = require('../middlewares/verifyToken')

router.delete('/:productId', verifyToken, async (req, res) => {
    try {
        const authData = await jwt.verify(req.token, 'SECRETKEY')
        if(authData){
            const { nModified } = await Seller.updateOne({ email: authData.email }, {
                $set: { verify: true }
            })
            const { productId } = req.params
            const productExists = await Product.find({ _id: productId })
            if(productExists.length === 0){
                return res.status(404).json({ errMessage: 'Product Not Found' })
            }
            const { deletedCount } = await Product.deleteOne({ _id: productId })
            res.status(200).json({
                message: `${authData.email} Is A Verified Seller, ${deletedCount} Product Removed` 
            })
        } else {
            res.sendStatus(403)
        }
    } catch (err) {
        res.status(500).json({ errMessage: 'Internal Server Error' })
    }
})

module.exports = router