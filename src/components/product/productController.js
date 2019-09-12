'use strict';
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

var Product = require('./productModel')

var listAllProduct = async function (req, res) {
  try {
    const productList = await Product.findAll({
      order: [["id", "ASC"]]
    })
    return res.send({ data: productList })
  } catch (e) {
    return res.status(400).send({ Error: "Ha ocurrido un error en listAllProduct" + e })
  }
}

var addProduct = async function (req, res) {
  var newProduct = req.body
  var productIdMax = await Product.sequelize.query("select max(id) from products")
  var newID = productIdMax[0][0].max + 1
  try {
    await Product.create({
      name: newProduct.name,
      price: newProduct.price,
      description: newProduct.description,
      cuantity: newProduct.cuantity,
      id: newID
    })
    return res.send({ message: 'created', product_id: newID })
  } catch (e) {
    return res.status(400).send({ Error: " Ha ocurrido un error en addProduct" + e })
  }
}

var deleteProduct = async function (req, res) {
  try {
    await Product.destroy({
      where: {
        id: req.body.id_product
      }
    })
    return res.send({ message: 'Producto eliminado correctamente!' })
  } catch (e) {
    return res.status(400).send({ Error: 'Ha ocurrido un error en deleteProduct' + e })
  }
}

var updateProduct = async function (req, res) {
  const updatedProduct = req.body
  try {
    await Product.update({
      name: updatedProduct.name,
      price: updatedProduct.price,
      description: updatedProduct.description,
      cuantity: updatedProduct.cuantity
    }, {
      where: {
        id: updatedProduct.id_product
      }
    })
    return res.send({ status: 'ok', product: updatedProduct })
  } catch (e) {
    return res.status(400).send({ Error: "Ha ocurrido un error en updateProduct", e })
  }
}

const increaseCuantity = async function (req, res) {
  try {
    const result = await Product.findAll({
      where: {
        id: req.body.product_id
      },
      attributes: ['cuantity']
    })
    const currentQuantity = result[0].dataValues.cuantity
    await Product.update({
      cuantity: currentQuantity + req.body.add_quantity
    }, {
      where: {
        id: req.body.product_id
      }
    })
    return res.send({ message: 'Increment ok' })
  } catch (e) {
    return res.status(400).send({ Error: "Ha ocurrido un error en increaseCuantity " + e })
  }
}

const  searchProduct = async function (req, res) {
  const text = req.body.search_text.toLowerCase()
  try {
    const result = await Product.findAll({
      where: {
        name: { [Op.like]: `${text}%` }
      }
    })
    return res.send(result)
  } catch (e) {
    return res.status(400).send({ Error: 'Ha ocurrido un error en searchProduct' + e })
  }
}

module.exports = {
  listAllProduct,
  addProduct,
  deleteProduct,
  updateProduct,
  increaseCuantity,
  searchProduct
}