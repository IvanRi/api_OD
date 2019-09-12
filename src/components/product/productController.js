'use strict';
//traido las Op de sequelize para hacer el like%
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

const Product = require('./productModel')

const listAllProduct = async function (req, res) {
  try {
    const productList = await Product.findAll({
      order: [["id", "ASC"]]
    })
    return res.send({ data: productList })
  } catch (e) {
    return res.status(400).send({ Error: "Ha ocurrido un error en listAllProduct" + e })
  }
}

const addProduct = async function (req, res) {
  let result = null
  let cont = 0
  while (result == null && cont <= 3) {
    const newProduct = req.body
    try {
      let maxId = await Product.sequelize.query("select max(id) from products")
      maxId = maxId[0][0].max
      maxId += 1
      result = await Product.create({
        name: newProduct.name,
        price: newProduct.price,
        description: newProduct.description,
        quantity: newProduct.quantity,
        id: maxId
      })
    } catch (e) {
      cont += 1
    }
  }
  if (cont > 3) {
    return res.status(400).send({ Error: " Ha ocurrido un error en addProduct"})
  }
  if (result) {
    return res.send(result)
  }
}

const deleteProduct = async function (req, res) {
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

const updateProduct = async function (req, res) {
  const updatedProduct = req.body
  try {
    await Product.update({
      name: updatedProduct.name,
      price: updatedProduct.price,
      description: updatedProduct.description,
      quantity: updatedProduct.quantity
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

const increaseQuantity = async function (req, res) {
  try {
    const result = await Product.findAll({
      where: {
        id: req.body.product_id
      },
      attributes: ['quantity']
    })
    const currentQuantity = result[0].dataValues.quantity
    await Product.update({
      quantity: currentQuantity + req.body.add_quantity
    }, {
      where: {
        id: req.body.product_id
      }
    })
    return res.send({ message: 'Increment ok' })
  } catch (e) {
    return res.status(400).send({ Error: "Ha ocurrido un error en increasequantity " + e })
  }
}

const decreaseQuantity = async function (req, res) {
  try {
    const result = await Product.findAll({
      where: {
        id: req.body.product_id
      },
      attributes: ['quantity']
    })
    const currentQuantity = result[0].dataValues.quantity
    await Product.update({
      quantity: currentQuantity - req.body.dec_quantity
    }, {
      where: {
        id: req.body.product_id
      }
    })
    return res.send({ message: 'Productos descontados correctamente.' })
  } catch (e) {
    return res.status(400).send({ Error: "Ha ocurrido un error en increasequantity " + e })
  }
}

const searchProduct = async function (req, res) {
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
  decreaseQuantity,
  addProduct,
  deleteProduct,
  updateProduct,
  increaseQuantity,
  searchProduct
}