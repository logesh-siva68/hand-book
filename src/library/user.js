const bcrypt = require('bcryptjs')
const db = require('../data/user')
const jwt = require('jsonwebtoken')
const utilities = require('../utils')

const ex = module.exports

// Insert - Register User

ex.register = async (user) => {
  try {
    if (!user.email || !user.name || !user.password) {
      throw Error('All fields are needed')
    }
    const checkForUserExists = await db.getUserByEmail(user.email)

    if (checkForUserExists === 1) {
      throw Error('Email exists already')
    } else {
      user.password = await utilities.hash(user.password)
      await db.addUser(user)
      return 'user registered'
    }
  } catch (err) {
    throw Error(err)
  }
}

ex.loginUser = async (user) => {
  try {
    if (!user.email || !user.password) {
      throw Error('email or password required')
    }
    const userData = await db.getUser(user.email)
    // plain pass - hashed
    const userWithOutPassword = { ...userData }
    delete userWithOutPassword.u_password
    if (
      userData &&
            (await bcrypt.compare(user.password, userData.u_password))
    ) {
      return {
        userId: userData.u_id,
        token: generateToken(userWithOutPassword),
        tokenExpireTime: process.env.EXPIRE_TIME
      }
    }

    throw Error('invalid email / password')
  } catch (err) {
    throw Error(err)
  }
}

const generateToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRE_TIME
  })
}

ex.changePassword = async (params) => {
  if (!params.email || !params.password || !params.confirmPassword) {
    throw Error('Invalid Params')
  }

  if (params.confirmPassword !== params.password) {
    throw Error('Password and confirm password should be same')
  }
  try {
    const email = await db.getUserByEmail(params.email)
    if (email > 0) {
      params.password = await utilities.hash(params.password)
      await db.changePassword(params)
      return 'Password Updated!!'
    } else throw Error('User not found')
  } catch (err) {
    throw Error(err)
  }
}
