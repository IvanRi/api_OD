import Sequelize from 'sequelize'
import { sequelize } from '../../db/config'

const Product = sequelize.define('product',{
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
  }
},{
  tableName:'products',
  underscored:true,
  timestamps: true
})

export default Product