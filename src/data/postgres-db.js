// https://www.npmjs.com/package/pg-promise
// https://github.com/vitaly-t/pg-promise/wiki/Learn-by-Example

const pgpLib = require('pg-promise')
const monitor = require('pg-monitor')
const promise = require('bluebird')
// db config
const pgconfig = {
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDB,
  user: process.env.PGUSERNAME,
  password: process.env.PGPASSWORD
}

// console.log(pgconfig)

// pg-promise initialization options:
const options = {
  promiseLib: promise
  // capTX: true, // capitalize transaction commands;
}

monitor.attach(options) // attaching to all events;
monitor.setTheme('matrix') // changing default theme;

const pgp = pgpLib(options) // initializing pg-promise;
pgp.pg.defaults.poolSize = 100

const db = pgp(pgconfig)
module.exports = db
