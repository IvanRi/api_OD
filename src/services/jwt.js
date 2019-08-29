const jwt = require('jwt-simple')
const SECRET = require('../services/jwt.config.js')
const moment = require('moment')

const createToken = async function (user) {
  const payload = {
    sub: user.user_rol,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  }
  return await jwt.encode(payload, SECRET)
}

function decodeToken(token) {
  const decode = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, SECRET)
      if (payload.exp <= moment().unix()) {
        reject({
          status: 401,
          message: 'Token ha expirado!'
        })
      }
      resolve(payload.sub)
    } catch (err) {
      reject({
        status: 500,
        message: 'Token invalido!'
      })
    }
  })
  return decode
}

module.exports = { createToken, decodeToken }