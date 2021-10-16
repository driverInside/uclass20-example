const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const UserModel = require('../models/users')
const UserService = require('../services/users')
const AuthService = require('../services/auth')

const userService = new UserService(UserModel)
const authService = new AuthService(userService)

const JWT_SECRET = process.env.JWT_SECRET

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await authService.login(email, password)
    const userRole = { ...user, role: 'admin', permissions: ['users:foo'] }
    // Generar un token
    const token = jwt.sign({ data: userRole, exp: Math.floor(Date.now() / 1000) + (60 * 60) }, JWT_SECRET)
    return res.send({
      _id: user._id,
      token
    })
  } catch (err) {
    console.error(err)
    return res.status(401).send({
      message: err.message
    })
  }

})

module.exports = router
