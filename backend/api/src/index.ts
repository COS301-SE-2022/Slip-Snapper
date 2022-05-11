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
        if(err) {
            return console.log(err);
        }

        return res.status(200).end(data);
    });
})

/**
 * Get all items for a user
 * Uses the user id to get the items
 */
app.get('/items',async(req,res)=>{
    fs.readFile( __dirname + "/" + "items.json", 'utf8', function (err, data) {
        if(err) {
            return console.log(err);
        }
        let d = JSON.parse(data);
        let resp = [];
        for(var i = 0;i < Object.keys(d).length;i++){
            if(d[Object.keys(d)[i]].user == req.query.user){
                resp.push(d[Object.keys(d)[i]]);
            }
        }

        return res.status(200).end(JSON.stringify(resp));
    });
})

/**
 * Add an item
 * Uses the user id to add the item
 */
app.post('/addItem',async(req,res)=>{
    fs.readFile( __dirname + "/items.json", 'utf8', function (err, data) {
        if(err) {
            return console.log(err);
        }
        let d = JSON.parse(data);
        let itemid = "item"+(Object.keys(d).length+1);
        let item = {
            [itemid]:{
                "user": req.body.user,
                "name": req.body.name
            }
        }
        d[itemid] = item[itemid];
        fs.writeFile(__dirname + "/items.json", JSON.stringify(d), function(err) {
            if(err) {
                return console.log(err);
            }
        });

        return res.status(200).end(JSON.stringify(d));
    });
})

/**
 * Delete an item
 * Uses the user id and itemId to delete the item
 */
 app.post('/deleteItem',async(req,res)=>{
    fs.readFile( __dirname + "/items.json", 'utf8', function (err, data) {
        if(err) {
            return console.log(err);
        }
        let d = JSON.parse(data);
        for(var i = 0;i < Object.keys(d).length;i++){
            if(d[Object.keys(d)[i]].user == req.body.user && Object.keys(d)[i] == req.body.item){
                delete d[req.body.item];
                break;
            }
        }
        fs.writeFile(__dirname + "/items.json", JSON.stringify(d), function(err) {
            if(err) {
                return console.log(err);
            }
        }); 

        return res.status(200).end(JSON.stringify(d));
    });
})

/**
 * Update an item
 * Uses the user itemId to update the item
 */
 app.post('/updateItem',async(req,res)=>{
    fs.readFile( __dirname + "/items.json", 'utf8', function (err, data) {
        if(err) {
            return console.log(err);
        }
        let d = JSON.parse(data);
        for(var i = 0;i < Object.keys(d).length;i++){
            if(d[Object.keys(d)[i]].user == req.body.user && Object.keys(d)[i] == req.body.item){
                if(req.body.name != undefined){
                    d[req.body.item].name = req.body.name;
                }
                break;
            }
        }
        fs.writeFile(__dirname + "/items.json", JSON.stringify(d), function(err) {
            if(err) {
                return console.log(err);
            }
        }); 

        return res.status(200).end(JSON.stringify(d));
    });
})