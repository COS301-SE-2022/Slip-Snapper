const express = require('express');
const fs = require('fs');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.listen(1234, () =>{
    console.log('Server ready');
})

/**
 * Example api call
 * Gets all users
 */
app.get('/users',async(req,res)=>{
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        res.status(200).end(data);
    });
})

/**
 * Get all items for a user
 * Uses the user id to get the items
 */
app.get('/items',async(req,res)=>{
    fs.readFile( __dirname + "/" + "items.json", 'utf8', function (err, data) {
        let d = JSON.parse(data);
        let resp = [];
        for(var i = 0;i < Object.keys(d).length;i++){
            if(d[Object.keys(d)[i]].user == req.query.user){
                resp.push(d[Object.keys(d)[i]]);
            }
        }
        res.status(200).end(JSON.stringify(resp));
    });
})