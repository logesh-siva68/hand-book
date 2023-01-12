
const moment = require('moment');
const bcrypt = require('bcryptjs');
const db = require('../data/user');
const jwt = require('jsonwebtoken');
const utilities = require('./utilities');

let ex = module.exports;

//Inser - Regiester User

ex.register = async(user)=>{
    try{
        if(!user.email || !user.name || !user.password)
        throw {"message":"All fileds are needed"}
        let checkForUserExists = await db.getUserByEmail(user.email);

        if(checkForUserExists === 1)
        throw {"message":"Email exisits alrady"};
        else{
          user.password = await utilities.hash(user.password)
          await db.addUser(user)
          return "user registered"
        }


    }catch(err){
        throw err;
    }
}

ex.loginUser = async(user)=>{
    try{
        if(!user.email || !user.password)
        throw {"message":"email or password required"}
        let userData = await db.getUser(user.email);
        //plain pass - hashed
        let userWithOutPassword = {...userData}
        delete userWithOutPassword.u_password
        if(userData && (await bcrypt.compare(user.password,userData.u_password)))
        return {userId:userData.u_id, token: generateToken(userWithOutPassword), tokenExpireTime:process.env.EXPIRE_TIME}

        throw {"message":"invalid email / password"}
    }catch(err){
        throw err;
    }
}

const generateToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: process.env.EXPIRE_TIME,
    })
  }


ex.changePassword = async(params)=>{
  if(!params.email || !params.password || !params.confirmPassword)
  throw "Invalid Params";

  if(params.confirmPassword !== params.password)
  throw "Password and confirm password should be same";
  try{
    let email = await db.getUserByEmail(params.email);
    if(email > 0){
      params.password = await utilities.hash(params.password);
      await db.changePassword(params)
      return "Password Updated!!";
    } else throw "User not found"

  } catch(err){
    throw err;
  }
}




