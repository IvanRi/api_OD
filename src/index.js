var express = require('express')
var morgan = require('morgan')
var productRoutes = require('./components/product/productRoutes')
var userRoutes = require('./components/user/userRoutes')
var orderRoutes = require('./components/order/orderRoutes')
var productOrderRoutes = require('./components/productOrder/productOrderRoutes')
var login = require('./services/login')
var auth = require('./middlewares/auth')
var cors = require('cors')
//init
var app = express();
var port = process.env.PORT || 3001;

var allowCrossDomain = function(req, res, next) {
  // res.header('Access-Control-Allow-Origin', 'https://orderdispatcher.herokuapp.com');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With , X-Auth-Token');
  next()
};

app.use(allowCrossDomain)

//middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())


//routes products
app.use('/login', login)
app.use('/api/products',[cors(),auth], productRoutes)
app.use('/api/users',auth, userRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/product_order', productOrderRoutes)

app.listen(port, function () {
  console.log('Example app listening on port 3001!');
});

module.exports = app
