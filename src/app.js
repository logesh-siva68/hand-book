const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: false }))

app.use(cors())

// Cors fix
/* app.use('/api',(req,res,next)=>{

  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
}) */

app.use('/api/', require('./routes'))

module.exports = app
