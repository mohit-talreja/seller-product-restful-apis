const router = require('express').Router()

const jwt = require('jsonwebtoken')

const multer = require('multer')

const fs = require('fs')

const { Seller } = require('../models/seller')

const { Product } = require('../models/product')

const { verifyToken } = require('../middlewares/verifyToken')

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        dir = 'uploads/'
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir)
        }
        cb(null, dir)
    },
    filename : function(req, file, cb){
        const originalName = file.originalname
        const indexOfPeriod = originalName.indexOf('.')
        const fileName = originalName.slice(0,indexOfPeriod)
        const res = originalName.split('.')
        const ext = res[1]
        cb(null, fileName + '-' + new Date().getTime() + '.' + ext)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        console.log('file ext must be .png or .jpeg')
        cb(null, false)
    }
}

const upload = multer({
    storage : storage,
    limits : {
        fileSize : 1024 * 1024 * 5,
    },
    fileFilter : fileFilter
})

router.post('/', verifyToken,  upload.single('productpic'), async (req, res) => {
    try {
        const authData = await jwt.verify(req.token, 'SECRETKEY')
        if(authData){
            const { nModified } = await Seller.updateOne({ email: authData.email }, {
                $set: { verify: true }
            })
            const { filename } = req.file
            const { title, price, description } = req.body
            const productAlreadyExists = await Product.find({ title })
            if(productAlreadyExists.length > 0){
                return res.json({ errMessage: 'Product Already Exists In Our Database' })
            }
            const product = new Product({ title, price, description, productpic: filename })
            const newProduct = await product.save()
            res.status(200).json({
                message: `${authData.email} Is A Verified Seller`,
                newProduct
            })
        } else {
            res.sendStatus(403)
        }
    } catch (err) {
        res.status(500).json({ errMessage: 'Internal Server Error' })
    }
})

module.exports = router