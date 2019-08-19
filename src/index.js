var express = require('express')
var morgan = require('morgan')
var productRoutes = require('./components/product/productRoutes')
var cors = require('cors')
//init
var app = express();
var port = process.env.PORT || 3001;

//middleware
app.use(morgan('dev'))
app.use(express.json())
app.options('*', cors())


//routes products
app.use('/api/products',cors(), productRoutes)

app.listen(port, function () {
  console.log('Example app listening on port 3001!');
});

module.exports = app
