const express = require('express')
const router = express.Router()

router.post('/updateRemove', (req, res) => {
  res.status(200).json({ message: 'use this to update or Users' })
})

module.exports = router
