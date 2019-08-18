'use strict';

var Product = require('./productModel')

var listAllProduct =  async function (req , res){
  console.log(Product)
  const productList = await Product.findAll()
  res.send({data: productList})
}

module.exports = listAllProduct