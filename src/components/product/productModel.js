"use strict";

var Sequelize = require('sequelize')
var sequelize = require('../../db/config')

var Product = sequelize.define('product', {
  name: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.INTEGER
  },
  description: {
    type: Sequelize.STRING
  },
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  quantity: {
    type: Sequelize.INTEGER,
  }
}, {
    tableName: 'products',
    underscored: true,
    timestamps: false
  })

module.exports = Product