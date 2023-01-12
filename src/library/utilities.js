const ex = module.exports;
const jwt = require('jsonwebtoken');
const dbUser = require('../data/user');
const bcrypt = require('bcryptjs');

ex.validateAuth = async(req,res)=>{
    let token = null;
    try{
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
            let decoded = await jwt.verify(token, process.env.JWT_SECRET)
            if(!decoded.u_id || !decoded.u_email)
            throw "Unatuheried user"
            else{
                let user = await dbUser.getUserById(decoded.u_id)
                if(user && user.u_id && (decoded.u_id ===   user.u_id &&  decoded.u_email === user.u_email))
                req.user = user;
                else  throw "Unatuheried user"
                return;
            }
        } else{
          throw "Invlaid Access"
        }
    }catch(err){throw {"message":err}}
}

ex.hash = async(str)=>{
  try{
    let salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(str, salt);

  }
  catch(err){throw err;}
}
