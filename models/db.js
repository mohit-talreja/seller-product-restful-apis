const mongoose = require('mongoose')

const dbString = 'mongodb://localhost:27017/SellerProductAPIs'

mongoose
    .connect(dbString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => console.log('Connected to MongoDB.'))
    .catch(err => console.log('Error in connecting to MongoDB!'))