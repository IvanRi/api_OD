'use strict';

var Product = require('./productModel')

var listAllProduct = async function (req, res) {
  const productList = await Product.findAll({
    order: [["id","ASC"]]
  })
  res.send({ data: productList })
}

var addProduct = async function (req, res) {
  var newProduct = req.body
  var productList = await Product.findAll()
  var newID = productList[productList.length - 1].id + 1
  try {
    await Product.create({
      name: newProduct.name,
      price: newProduct.price,
      description: newProduct.description,
      id: newID
    })
    res.send({ message: 'created', product_id: newID })
  } catch (e) {
    return res.status(500).send({ "Error": e })
  }
}

var deleteProduct = async function (req, res) {
  try {
    await Product.destroy({
      where: {
        id: req.body.id_product
      }
    })
    res.send({ message: 'Producto eliminado correctamente!' })
  } catch (e) {
    return res.status(500).send({ message: 'Error del servidor' })
  }
}

var updateProduct = async function (req,res){
  const newProduct = req.body
  try{
    await Product.update({ 
      name: newProduct.name,
      price: newProduct.price,
      description: newProduct.description,
    },{
      where: {
        id: newProduct.id_product
      }
    })
    return res.send({status:'ok'})
  }catch (e) {
    return res.status(500).send({message: `Ocurrio un erro inesperado!: ${e}`})
  }
}

module.exports = {
  listAllProduct,
  addProduct,
  deleteProduct,
  updateProduct
}