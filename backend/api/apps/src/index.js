const express =require('express');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const Cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(Cors())

/**
 * Add a user
 * Adds a user with an Name, Age
 */
 app.post('/user/signup',async(req,res)=>{
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
 * Log a user in
 * Logs the user in with their password and username
 */
app.post("/user/login",async(req,res)=>{
    fs.readFile( __dirname + "/users.json", 'utf8', function (err, data) {
        if(err) {
            return console.log(err);
        }
        let d = JSON.parse(data);
        for(var i = 0;i < Object.keys(d).length;i++){
            if(d[Object.keys(d)[i]].name === req.body.name){
                return res.status(200).end(JSON.stringify("User logged in successfully"));
            }
        }

        return res.status(400).end(JSON.stringify("Login Failed",null,2));
    });
})

/**
 * Delete an item
 * Uses the user id delete the user
 */
 app.post('/user/delete',async(req,res)=>{
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
 app.post('/user/update',async(req,res)=>{
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
app.get('/item/all',async(req,res)=>{
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
app.post('/item/add',async(req,res)=>{
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
 app.post('/item/delete',async(req,res)=>{
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
 app.post('/item/update',async(req,res)=>{
    fs.readFile( __dirname + "/items.json", 'utf8', function (err, data) {
        if(err) {
            return console.log(err);
        }
        let d = JSON.parse(data);
        var a;
        var found = false;
        for(var i = 0;i < Object.keys(d).length;i++){
            if(d[Object.keys(d)[i]].user == req.body.user && Object.keys(d)[i] == req.body.itemid){
                a = req.body.itemid;
                found = true;
                break;
            }
        }
        
        if(found){
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
        }
        else{
            return res.status(404).end("Item was not found");
        }
    });
})

/**
 * Generate the pdf report for a user
 * Uses the user id to get the items
 */
 app.get('/report/generate',async(req,res)=>{
    let period = req.query.period;
    var today = new Date();
    let periodEnd = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()
    var date = new Date();
    var periodStart;
    
    switch (period) {
        case "day":
            periodStart = periodEnd;
            break;
        case "week":
            date.setDate(date.getDate() - 7);
            periodStart = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
            break;
        case "month":
            date.setMonth(date.getMonth() - 1);
            periodStart = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
            break;
        case "year":
            d.setFullYear(date.getFullYear() - 1);
            periodStart = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
            break;
    }

    let pdf = new PDFDocument;
    let name = "report-" + today.getDate() + "-" + (today.getMonth()+1) + "-" + today.getFullYear() + "-a.pdf";
    pdf.pipe(fs.createWriteStream(name))
    fs.readFile( __dirname + "/items.json", 'utf8', function (err, data) {
        if(err) {
            return console.log(err);
        }
        let d = JSON.parse(data);
        let typeF = [];
        let typeC = [];
        for(var i = 0;i < Object.keys(d).length;i++){
            if(d[Object.keys(d)[i]].user == req.query.user){
                if(d[Object.keys(d)[i]].type == "food"){
                    typeF.push(d[Object.keys(d)[i]]);
                }
                else{
                    typeC.push(d[Object.keys(d)[i]]);
                }
            }
        }
        let temp = "Report for " + date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear();
        pdf.fontSize(20).text(temp);

        pdf.fontSize(17).text("Food items",110);
        for(i = 0;i < typeF.length;i++){
            temp = "Item: " + typeF[Object.keys(typeF)[i]].item_name;
            pdf.fontSize(15).text(temp,120);
            temp = "quantity: " + typeF[Object.keys(typeF)[i]].quantity;
            pdf.fontSize(12).text(temp,150);
            temp = "Price: R " + typeF[Object.keys(typeF)[i]].price;
            pdf.text(temp);
            temp = "Location: " + typeF[Object.keys(typeF)[i]].location;
            pdf.text(temp);
        }

        pdf.fontSize(17).text("\nCleaning items",110);
        for(i = 0;i < typeC.length;i++){
            temp = "Item: " + typeC[Object.keys(typeF)[i]].item_name;
            pdf.fontSize(15).text(temp,120);
            temp = "quantity: " + typeC[Object.keys(typeF)[i]].quantity;
            pdf.fontSize(12).text(temp,150);
            temp = "Price: R " + typeC[Object.keys(typeF)[i]].price;
            pdf.text(temp);
            temp = "Location: " + typeC[Object.keys(typeF)[i]].location;
            pdf.text(temp);
        }

        pdf.end();
    });
    
    return res.status(200).end(JSON.stringify("Report Generated",null,2));
})

module.exports = {app}