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
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//routes products
app.use('/api/products',cors(), productRoutes)

app.listen(port, function () {
  console.log('Example app listening on port 3001!');
});

module.exports = app
