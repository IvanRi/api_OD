var express = require('express')
var morgan = require('morgan')
var cors = require('cors')
var productRoutes = require('./components/product/productRoutes')
//init
var app = express();
var port = process.env.PORT || 3001;

//middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

//routes products
app.use('/api/products', productRoutes)

app.listen(port, function () {
  console.log('Example app listening on port 3001!');
});

module.exports = app
