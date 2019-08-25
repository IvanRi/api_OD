const jwt = require('../services/jwt')

function isAuth(req, res, next) {
  //reviza que exista una autorizacion
  if (!req.headers.auth) {
    return res.status(403).send({ message: 'No tiene autorizacion para entrar!' })
  }
  //devuelve un token en formato de string de dos valores el 
  //primero no nos importa, por ende lo separamos y tomamos el de
  //ubicacion 1 de array que es finalmente el token q utilizaremos
  const token = req.headers.auth.split(' ')[1]

  jwt.decodeToken(token)
    .then(response => {
      req.user = response
      next()
    })
    .catch(response => {
      res.status(response.status)
    })
}

module.exports = isAuth