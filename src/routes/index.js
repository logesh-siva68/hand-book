const router = require('express').Router()
const utilities = require('../utils')
// Un-Auth Routes
router.use('/auth', require('./security'))

router.use('/', async (req, res, next) => {
  console.log('in')
  try {
    await utilities.validateAuth(req, res)
    if (req.user) next()
  } catch (err) {
    res.status(403).json({
      status: 'error',
      error: err,
      message: err.message
    })
  }
})

router.use('/clients', require('./clients'))
router.use('/users', require('./user'))

router.use(function (req, res) {
  res.status(404).json({ message: 'Resource Not Found for ' + req.url })
})

module.exports = router
