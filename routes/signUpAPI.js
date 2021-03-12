const router = require('express').Router()

const bcrypt = require('bcryptjs')

const { Seller } = require('../models/seller')

router.post('/', async (req, res) => {
    try {
        const { name, email, password, mobile } = req.body
        const sellerAlreadyExists = await Seller.find({ email })
        if(sellerAlreadyExists.length > 0){
            return res.status(401).json({ errMessage: 'Seller Already Exists In Our Database' })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const seller = new Seller({ name, email, password: hashedPassword, mobile })
        const newSeller = await seller.save()
        res.status(200).json({ newSeller })
    } catch (err) {
        console.log(err)
        res.status(500).json({ errMessage: 'Internal Server Error' })
    }
})

module.exports = router