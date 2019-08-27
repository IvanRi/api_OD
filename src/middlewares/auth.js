const jwt = require('../services/jwt')

function isAuth(req, res, next) {
  console.log("SI ENTRO",req.headers)
  //reviza que exista una autorizacion
  if (!req.headers.X-Auth-Token) {
    console.log("ERROR", req.headers)
    return res.status(403).send({ message: 'No tiene autorizacion para entrar!' })
  }
  //devuelve un token en formato de string de dos valores el 
  //primero no nos importa, por ende lo separamos y tomamos el de
  //ubicacion 1 de array que es finalmente el token q utilizaremos
  const token = req.headers.Auth
  console.log("TOKEN",token)
  jwt.decodeToken(token)
    .then(response => {
  console.log("RESPONSE OK",response)

      req.user = response
      next()
    })
    .catch(response => {
  console.log("RESPONSE FAIL",response)

      res.status(response.status)
    })
}

module.exports = isAuth