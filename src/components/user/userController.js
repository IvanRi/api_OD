const User = require('./userModel')

const listUsers = async function (req, res) {
  try {
    const userList = await User.findAll({
      order: [["user_id", "ASC"]]
    })
    return res.send({ message: userList })
  } catch (err) {
    return res.status(400).send({ Error: "Ha ocurrido un error en listUser" + err })
  }
}

const addNewUser = async function (req, res, next) {
  let result = null
  let cont = 0
  while (result == null && cont <= 3) {
    try {
      let maxId = await User.sequelize.query("select max(user_id) from users")
      maxId = maxId[0][0].max
      maxId += 1
      result = await User.create({
        user_name: req.body.user_name,
        password: req.body.password,
        user_rol: req.body.user_rol,
        user_id: maxId
      })
    } catch (err) {
      cont += 1
    }
  }
  if (cont > 3) {
    return res.status(400).send({ status: "Error", Error: "Ha ocurrido un error en addNewUser" })
  }
  if (result) {
    return res.send(result)
  }
}

const deleteUser = async function (req, res) {
  const userId = req.body.user_id
  try {
    await User.destroy({
      where: {
        user_id: userId
      }
    })
    return res.send({ status: "Usuario eliminado correctamente!" })
  } catch (err) {
    return res.status(400).send({ Error: "Ha ocurrido un error en deleteUser" + err })
  }
}

const updateUser = async function (req, res) {
  try {
    const updatedUser = await User.update({
      user_name: req.body.user_name,
      user_rol: req.body.user_rol,
      password: req.body.password
    }, {
      where: {
        user_id: req.body.user_id
      }
    }
    )
    return res.send({ status: 'updated' })
  } catch (err) {
    return res.status(400).send({ status: "Error", Error: "Ha ocurrido un error en updateUser" + err })
  }
}

module.exports = {
  listUsers,
  addNewUser,
  deleteUser,
  updateUser
}