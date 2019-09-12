"use strict";

const Sequelize = require('sequelize')
const sequelize = require('../../db/config')

const Order = sequelize.define('order', {
  user_id: {
    type: Sequelize.INTEGER
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