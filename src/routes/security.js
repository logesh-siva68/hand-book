const express = require('express')
const router = express.Router()
const libUser = require('../library/user')


router.post('/register', async(req,res)=>{
  try{
    let data = await libUser.register(req.body)
    res.status(200).json({"status":"Success", "data":data})
  }catch(err){
      res.status(400).json({"status":"Error", "message":err.message})
  }
});

router.post('/login', async(req,res)=>{
    try{
      let data = await libUser.loginUser(req.body)
      res.status(200).json({"status":"Success", "data":data})
    }catch(err){
        res.status(400).json({"status":"Error", "message":err.message})
    }
  });

  router.post('/forgot-password', async(req,res)=>{
    try{
      await libUser.changePassword(req.body);
      res.status(200).json({"status":"Success", "data":"Password Updated"})
    } catch(err){
      res.status(400).json({"status":"Error","message": err. message ? err.message : err})
    }
  });

module.exports = router;
