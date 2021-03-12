const router = require('express').Router()

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const { Seller } = require('../models/seller')

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body
        const sellerMatch = await Seller.findOne({ email })
        const passwordMatch = await bcrypt.compare(password, sellerMatch.password)
        if(!sellerMatch || !passwordMatch){
            return res.status(401).json({
                errMessage: 'Seller Is Neither Authentic Nor Authorized'
            })
        }
        const payload = req.body
        const token = await jwt.sign(payload, 'SECRETKEY')
        res.status(200).json({ token })
    } catch (err) {
        res.status(500).json({ errMessage: 'Internal Server Error' })
    }
})

module.exports = router