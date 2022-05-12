const express =require('express');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const Cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(Cors())

/**
 * Example api call
 * Gets all users
 */
app.get('/users',async(_req,res)=>{
    fs.readFile( __dirname + "/users.json", 'utf8', function (err, data) {
        if(err) {
            return console.log(err);
        }

        return res.status(200).end(data);
    });
})

/**
 * Add a user
 * Adds a user with an Name, Age
 */
 app.post('/addUser',async(req,res)=>{
    fs.readFile( __dirname + "/users.json", 'utf8', function (err, data) {
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
        fs.writeFile(__dirname + "/users.json", JSON.stringify(d,null,2), function(erra) {
            if(erra) {
                return console.log(erra);
            }
        });

        return res.status(200).end(JSON.stringify(d,null,2));
    });
})

/**
 * Delete an item
 * Uses the user id delete the user
 */
 app.post('/deleteUser',async(req,res)=>{
    fs.readFile( __dirname + "/users.json", 'utf8', function (err, data) {
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
        fs.writeFile(__dirname + "/users.json", JSON.stringify(d,null,2), function(erra) {
            if(erra) {
                return console.log(erra);
            }
        }); 

        return res.status(200).end(JSON.stringify(d,null,2));
    });
})

/**
 * Update a user
 * Uses the user id to update the user
 */
 app.post('/updateUser',async(req,res)=>{
    fs.readFile( __dirname + "/users.json", 'utf8', function (err, data) {
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
        fs.writeFile(__dirname + "/users.json", JSON.stringify(d,null,2), function(erra) {
            if(erra) {
                return console.log(erra);
            }
        }); 

        return res.status(200).end(JSON.stringify(d,null,2));
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

        return res.status(200).end(JSON.stringify(resp,null,2));
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
        let last = Object.keys(d)[Object.keys(d).length-1].slice(-1)
        let itemid = "item"+(parseInt(last)+1);
        let item = {
            [itemid]:{
                "id":parseInt(last)+1,
                "user": req.body.user,
                "location":req.body.location,
                "date":req.body.date,
                "item_name":req.body.name,
                "quantity":req.body.quantity,
                "price":req.body.price,
                "type":req.body.type
            }
        }
        d[itemid] = item[itemid];
        fs.writeFile(__dirname + "/items.json", JSON.stringify(d,null,2), function(erra) {
            if(erra) {
                return console.log(erra);
            }
        });

        return res.status(200).end(JSON.stringify(d,null,2));
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
        fs.writeFile(__dirname + "/items.json", JSON.stringify(d,null,2), function(erra) {
            if(erra) {
                return console.log(erra);
            }
        }); 

        return res.status(200).end(JSON.stringify(d,null,2));
    });
})

/**
 * Update an item
 * Uses the user id and itemId to update the item
 */
 app.post('/updateItem',async(req,res)=>{
    fs.readFile( __dirname + "/items.json", 'utf8', function (err, data) {
        if(err) {
            return console.log(err);
        }
        let d = JSON.parse(data);
        var a;
        for(var i = 0;i < Object.keys(d).length;i++){
            if(d[Object.keys(d)[i]].user == req.body.user && Object.keys(d)[i] == req.body.itemid){
                a = req.body.itemid;
                console.log(a)
                break;
            }
        }

        if(req.body.name != undefined){
            d[a].item_name = req.body.name;
        }
        if(req.body.location != undefined){
            d[a].location = req.body.location;
        }
        if(req.body.quantity != undefined){
            d[a].quantity = req.body.quantity;
        }
        if(req.body.price != undefined){
            d[a].price = req.body.price;
        }
        if(req.body.type != undefined){
            d[a].type = req.body.type;
        }

        fs.writeFile(__dirname + "/items.json", JSON.stringify(d,null,2), function(erra) {
            if(erra) {
                return console.log(erra);
            }
        }); 

        return res.status(200).end(JSON.stringify(d,null,2));
    });
})

/**
 * Generate the pdf report for a user
 * Uses the user id to get the items
 */
 app.get('/generatePDFReport',async(req,res)=>{
    let pdf = new PDFDocument;
    let date = new Date();
    let name = "report-" + date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear() + "-a.pdf";
    console.log(name);
    pdf.pipe(fs.createWriteStream(name))
    fs.readFile( __dirname + "/" + "items.json", 'utf8', function (err, data) {
        if(err) {
            return console.log(err);
        }
        let d = JSON.parse(data);
        let typeF = [];
        let typeC = [];
        for(var i = 0;i < Object.keys(d).length;i++){
            if(d[Object.keys(d)[i]].user == req.query.user){
                typeF.push(d[Object.keys(d)[i]]);
                typeC.push(d[Object.keys(d)[i]]);
            }
        }
        let temp = "Report for " + date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear();
        pdf.text(temp);

        pdf.text("Food items");
        for(var i = 0;i < typeF.length;i++){
            let temp = "item: " + typeF[Object.keys(typeF)[i]].name;
            pdf.text(temp);
        }

        pdf.text("Clothing items");
        for(var i = 0;i < typeC.length;i++){
            let temp = "item: " + typeF[Object.keys(typeF)[i]].name;
            pdf.text(temp);
        }

        pdf.end();

        return res.status(200).end(JSON.stringify("Report Genereated",null,2));
    });
})

module.exports = {app}