'use strict'
require('dotenv').config()

module.exports = {
  db: {
    pg: {
      host: process.env.PGHOST,
      port: process.env.PGPORT,
      database: process.env.PGDB,
      user: process.env.PGUSERNAME,
      password: process.env.PGPASSWORD
    }
  }
}
