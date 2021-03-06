"use strict";

const Sequelize = require('sequelize')
const sequelize = require('../../db/config')

const ProductOrder = sequelize.define('product_order', {
  order_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  id_product: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  quantity_sell: {
    type: Sequelize.INTEGER,
  },
  product_name: {
    type: Sequelize.STRING
  }
}, {
  tableName: 'product_order',
  underscored: true,
  timestamps: false
})

module.exports = ProductOrder