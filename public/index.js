"use strict";

var express = require('express');

var app = express();
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});

var Sequelize = require('sequelize');

var sequelize = new Sequelize('postgres://siejympukospvw:f90c9df894f86771f8d292bdc607e631d93308fcff3c165b29a053c8a65fc81a@ec2-75-101-147-226.compute-1.amazonaws.com:5432/d5tbpa4hp8qhd1');
sequelize.authenticate().then(function () {
  console.log('Connection has been established successfully.');
})["catch"](function (err) {
  console.error('Unable to connect to the database:', err);
});