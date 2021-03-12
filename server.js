const express = require('express')

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use('/api/signup', require('./routes/signUpAPI'))

app.use('/api/login', require('./routes/loginAPI'))

app.use('/api/create/product', require('./routes/createProductAPI'))

app.use('/api/read/products', require('./routes/readProductsAPI'))

app.use('/api/update/product', require('./routes/updateProductAPI'))

app.use('/api/delete/product', require('./routes/deleteProductAPI'))

app.use('/api/search/products', require('./routes/searchProductAPI'))

const PORT = process.env.PORT || 1000

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}.`))