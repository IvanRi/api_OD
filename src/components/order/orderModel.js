"use strict";

var Sequelize = require('sequelize')
var sequelize = require('../../db/config')

var Order = sequelize.define('order', {
  user_id: {
    type: Sequelize.INTEGER
  },
  product_order: {
    type: Sequelize.STRING
  },
  order_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  delivered: {
    type: Sequelize.BOOLEAN,
  },
  paused: {
    type: Sequelize.BOOLEAN,
  }
}, {
    tableName: 'order',
    underscored: true,
    timestamps: false
  })

module.exports = Order