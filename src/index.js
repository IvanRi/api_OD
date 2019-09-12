const express = require('express')
const morgan = require('morgan')
const productRoutes = require('./components/product/productRoutes')
const userRoutes = require('./components/user/userRoutes')
const orderRoutes = require('./components/order/orderRoutes')
const productOrderRoutes = require('./components/productOrder/productOrderRoutes')
const login = require('./services/login')
const auth = require('./middlewares/auth')
const cors = require('cors')
//init
const app = express();
const port = process.env.PORT || 3001;

const allowCrossDomain = function (req, res, next) {
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
app.use('/login', cors(), login)
app.use('/api/products', [cors(), auth], productRoutes)
app.use('/api/users', [cors(), auth], userRoutes)
app.use('/api/order', cors(), orderRoutes)
app.use('/api/product_order', cors(), productOrderRoutes)

app.listen(port, function () {
  console.log('Example app listening on port 3001!');
});

module.exports = app
