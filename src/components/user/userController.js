const User = require('./userModel')

const listUsers = async function (req, res) {
  try {
    const userList = await User.findAll({
      order: [["user_id", "ASC"]]
    })
    return res.send({ message: userList })
  } catch (err) {
    return res.status(400).send({ "Error": err })
  }
}

const addNewUser = async function (req, res) {
  var userIdMax = await User.sequelize.query("select max(user_id) from users")
  var newID = userIdMax[0][0].max + 1
  try {
    const newUser = await User.create({
      user_name: req.body.user_name,
      password: req.body.password,
      user_rol: req.body.user_rol,
      user_id: newID
    })
    return res.send(newUser)
  } catch (err) {
    return res.status(400).send({ status: "Error", Error: err })
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
    return res.send({ status: "deleted" })
  } catch (err) {
    return res.status(400).send({ "error": err })
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
    return res.send({ status: 'updated'})
  } catch (err) {
    return res.status(400).send({ status: "Error", Error: err })
  }
}

module.exports = {
  listUsers,
  addNewUser,
  deleteUser,
  updateUser
}