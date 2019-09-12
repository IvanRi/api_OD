const Sequelize = require('sequelize')
const sequelize = require('../../db/config')

const User = sequelize.define('user', {
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  user_name: {
    type: Sequelize.STRING
  },
  user_rol: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
}, {
  tableName: 'users',
  underscored: true,
  timestamps: false
}
)

module.exports = User
