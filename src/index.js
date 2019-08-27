var express = require('express')
var morgan = require('morgan')
var productRoutes = require('./components/product/productRoutes')
var userRoutes = require('./components/user/userRoutes')
var login = require('./services/login')
var auth = require('./middlewares/auth')
//init
var app = express();
var port = process.env.PORT || 3001;

var allowCrossDomain = function(req, res, next) {
  // res.header('Access-Control-Allow-Origin', 'https://orderdispatcher.herokuapp.com');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'auth, Content-Type,X-Auth-Token, Origin, Authorization, Content-Length, X-Requested-With');
    
  next()
};

app.use(allowCrossDomain)

//middleware
app.use(morgan('dev'))
app.use(express.json())


//routes products
app.use('/login', login)
app.use('/api/products',auth, productRoutes)
app.use('/api/users',auth, userRoutes)

app.listen(port, function () {
  console.log('Example app listening on port 3001!');
});

module.exports = app
