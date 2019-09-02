const express = require('express')
const api = express.Router()
const User = require('../components/user/userModel')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('../services/jwt')

const checkUserData = async function (req, res) {
  try {
    const user = await User.findAll({
      where: {
        user_name: req.body.user_name
      }
    })
    if (user) {
      const passMatch = await bcrypt.compareSync(user[0].password, req.body.password)
      if (!passMatch) return res.status(400).send({ Error: "Contraseña no valida." })
      const newToken = await jwt.createToken(user[0])
      return res.send({ token: newToken })
    } else {
      return res.status(404).send({ Error: "Usuario no encontrado." })
    }
  } catch (err) {
    return res.status(404).send({ Error: "User not found" })
  }
}

api.post('/', checkUserData)
module.exports = api