const router = require("express").Router();

router.post('/signup', (req,res)=>{
    res.send("signup");
});

router.post('/login', (req,res)=>{
    res.send("login");
});

module.exports = router