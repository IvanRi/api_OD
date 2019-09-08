"use strict";

var Sequelize = require('sequelize')
var sequelize = require('../../db/config')

var ProductOrder = sequelize.define('product_order', {
  order_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  id_product: {
    type: Sequelize.INTEGER,
  },
  id_product_order: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  cuantity: {
    type: Sequelize.INTEGER,
  },
  product_name:{
    type: Sequelize.STRING
  }
}, {
    tableName: 'product_order',
    underscored: true,
    timestamps: false
  })

module.exports = ProductOrder