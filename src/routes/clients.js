const express = require('express')
const router = express.Router()

router.post('/getClients', (req,res)=>{

    res.status(200).json({"message":"use this to get clients"})
});

router.post('/addClients', (req,res)=>{

    res.status(200).json({"message":"use this to add clients"})
});

router.post('/updateRemove', (req,res)=>{
    res.status(200).json({"message":"use this to upadate or clients"})
});

module.exports = router;
