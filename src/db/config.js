//para poder hacer el conect a una uri le hace falta poner en 
//on por defecto el SSL
var pg = require('pg');
pg.defaults.ssl = true;

var Sequelize= require('sequelize')
var sequelize = new Sequelize('postgres://siejympukospvw:f90c9df894f86771f8d292bdc607e631d93308fcff3c165b29a053c8a65fc81a@ec2-75-101-147-226.compute-1.amazonaws.com:5432/d5tbpa4hp8qhd1')


module.exports = sequelize