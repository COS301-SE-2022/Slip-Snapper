const fs = require('fs');
const router = require("express").Router();

/**
 * Add a user
 * Adds a user with an Name, Age
 */
router.post('/signup', async (req,res)=>{
    fs.readFile("../api/apps/src/users.json", 'utf8', function (err, data) {
        if(err) {
            return console.log(err);
        }
        let d = JSON.parse(data);
        let last = Object.keys(d)[Object.keys(d).length-1].slice(-1)
        let userid = "user"+(parseInt(last)+1);
        let user = {
            [userid]:{
                "name": req.body.name,
                "age": req.body.age
            }
        }
        d[userid] = user[userid];
        fs.writeFile("../api/apps/src/users.json", JSON.stringify(d,null,2), function(erra) {
            if(erra) {
                return console.log(erra);
            }
        });

        res.status(200).send(JSON.stringify(d,null,2));
    });
});


/**
 * Log a user in
 * Logs the user in with their password and username
 */
router.post('/login', async (req,res)=>{
    fs.readFile( "../api/apps/src/users.json", 'utf8', function (err, data) {
        if(err) {
            return console.log(err);
        }
        let d = JSON.parse(data);
        for(var i = 0;i < Object.keys(d).length;i++){
            if(d[Object.keys(d)[i]].name === req.body.name){
                return res.status(200).send(JSON.stringify("User logged in successfully"));
            }
        }

        return res.status(400).send(JSON.stringify("Login Failed",null,2));
    });
});

/**
 * Delete a user
 * Uses the user id delete the user
 */
router.post('/delete', async (req,res)=>{
    fs.readFile("../api/apps/src/users.json", 'utf8', function (err, data) {
        if(err) {
            return console.log(err);
        }
        let d = JSON.parse(data);
        for(var i = 0;i < Object.keys(d).length;i++){
            if(Object.keys(d)[i] == req.body.userid){
                delete d[req.body.userid];
                break;
            }
        }
        fs.writeFile("../api/apps/src/users.json", JSON.stringify(d,null,2), function(erra) {
            if(erra) {
                return console.log(erra);
            }
        }); 

        return res.status(200).end(JSON.stringify(d,null,2));
    });
});

/**
 * Update a user
 * Uses the user id to update the user
 */

 router.post('/update', async (req,res)=>{
    fs.readFile("../api/apps/src/users.json", 'utf8', function (err, data) {
        if(err) {
            return console.log(err);
        }
        let d = JSON.parse(data);
        for(var i = 0;i < Object.keys(d).length;i++){
            if(Object.keys(d)[i] == req.body.userid){
                if(req.body.name != undefined){
                    d[req.body.userid].name = req.body.name;
                }
                if(req.body.age != undefined){
                    d[req.body.userid].age = req.body.age;
                }
                break;
            }
        }
        fs.writeFile("../api/apps/src/users.json", JSON.stringify(d,null,2), function(erra) {
            if(erra) {
                return console.log(erra);
            }
        }); 
    
        return res.status(200).end(JSON.stringify(d,null,2));
    });
});
 

module.exports = router