const express = require('express')
const router = express.Router()
const UserModel = require('../models/users')
const UserService = require('../services/users')

const userService = new UserService(UserModel)

router.get('/me', async (req, res) => {
  const sessionUser = req.user

  if (!sessionUser) {
    return res.status(403).send({
      message: 'tú no deberías estar aquí'
    })
  }

  console.log('----------------------')
  console.log(req.user, req.permissions)
  console.log('----------------------')
  res.send({
    username: sessionUser.username
  })
})

router.get('/', async (req, res) => {
  // [users:getAll]
  const { limit, skip } = req.query
  const users = await userService.get(limit, skip)
  res.send(users)
})

router.post('/', async (req, res) => {
  const body = req.body

  const user = await userService.create(body)

  res.status(201).send(user)
})

module.exports = router

