const fs = require('fs');
const router = require("express").Router();

router.get('/all', async (req,res)=>{
    res.send("all")
});

router.post('/add', async (req,res)=>{
    res.send("add")
});

router.post('/delete', async (req,res)=>{
    res.send("delete")
});

router.post('/update', async (req,res)=>{
    res.send("update")
});

module.exports = router