const jwt = require('../services/jwt')

function isAuth(req, res, next) {
  const token = req.headers.authorization
  //reviza que exista una autorizacion
  if (!token) {
    return res.status(403).send({ message: 'No tiene autorizacion para entrar!' })
  }

  jwt.decodeToken(token)
    .then(response => {
      console.log("RESPONSE OK", response)
      req.user = response
      next()
    })
    .catch(response => {
      console.log("RESPONSE FAIL", response)
      res.status(response.status)
    })
}

module.exports = isAuth