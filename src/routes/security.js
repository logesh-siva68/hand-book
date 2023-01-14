const express = require('express')
const router = express.Router()

const joiValidator = require('../utils/joiValidator')
const libUser = require('../library/user')

async function registerHandler (req, res, next) {
  try {
    const data = await libUser.register(req.body)
    res.status(200).json({ status: 'Success', data })
  } catch (err) {
    res.status(400).json({ status: 'Error', message: err.message })
  }
}

router.post('/register', joiValidator, registerHandler)

router.post('/login', async (req, res) => {
  try {
    const data = await libUser.loginUser(req.body)
    res.status(200).json({ status: 'Success', data })
  } catch (err) {
    res.status(400).json({ status: 'Error', message: err.message })
  }
})

router.post('/forgot-password', async (req, res) => {
  try {
    await libUser.changePassword(req.body)
    res.status(200).json({ status: 'Success', data: 'Password Updated' })
  } catch (err) {
    res.status(400).json({
      status: 'Error',
      message: err.message ? err.message : err
    })
  }
})

module.exports = router
