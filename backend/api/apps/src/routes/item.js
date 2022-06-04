const fs = require('fs');
const router = require("express").Router();

/**
 * Get all items for a user
 * Uses the user id to get the items
 */
router.get('/all', async (req,res)=>{
    fs.readFile("../api/apps/src/items.json", 'utf8', function (err, data) {
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
});

/**
 * Add an item
 * Uses the user id to add the item
 */
router.post('/add', async (req,res)=>{
    fs.readFile("../api/apps/src/items.json", 'utf8', function (err, data) {
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
        fs.writeFile("../api/apps/src/items.json", JSON.stringify(d,null,2), function(erra) {
            if(erra) {
                return console.log(erra);
            }
        });

        return res.status(200).end(JSON.stringify(d,null,2));
    });
});

/**
 * Delete an item
 * Uses the user id and itemId to delete the item
 */
router.post('/delete', async (req,res)=>{
    fs.readFile("../api/apps/src/items.json", 'utf8', function (err, data) {
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
        fs.writeFile("../api/apps/src/items.json", JSON.stringify(d,null,2), function(erra) {
            if(erra) {
                return console.log(erra);
            }
        }); 

        return res.status(200).end(JSON.stringify(d,null,2));
    });
});

/**
 * Update an item
 * Uses the user id and itemId to update the item
 */
router.post('/update', async (req,res)=>{
    fs.readFile("../api/apps/src/items.json", 'utf8', function (err, data) {
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

            fs.writeFile("../api/apps/src/items.json", JSON.stringify(d,null,2), function(erra) {
                if(erra) {
                    return console.log(erra);
                }
            }); 

            return res.status(200).end("Item updated successfully");
        }
        else{
            return res.status(404).end("Item was not found");
        }
    });
});

module.exports.router = router;
