const express = require('express')
const api = express.Router()

const userController = require('./userController')

api.get('/', userController.listUsers)
api.post('/', userController.addNewUser)
api.delete('/', userController.deleteUser)
api.put('/', userController.updateUser)

module.exports = api