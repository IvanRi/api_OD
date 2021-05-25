//para poder hacer el conect a una uri le hace falta poner en 
//on por defecto el SSL
import dotenv from 'dotenv';
dotenv.config();

const pg = require('pg');
pg.defaults.ssl = true;

const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.CONNECTION_STRING)


module.exports = sequelize
