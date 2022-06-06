const router = require("express").Router();

/**
 * Get all items for a user
 * Uses the user id to get the items
 */
router.get('/all', async (req,res)=>{
    let { userId } = req.query;

    const result = await req.app.get('db').getItem(Number(userId));

    let status = 200;

    //TODO checking for errors

    return res.status(status)
        .send({
            message: result.message,
            numItems: result.numItems,
            itemList: result.itemList
        });
});

/**
 * Add an item
 * Uses the user id to add the item
 */
router.post('/add', async (req,res)=>{
    let userid = req.body.userid;
    let itemname = req.body.name;
    let itemprice = req.body.price;
    let itemquantity = req.body.quantity;
    let itemtype = req.body.type;
    let location = req.body.location;
    let date = req.body.date;

    const resp = await req.app.get('db').addItem(userid,itemname,itemprice,itemquantity,itemtype,location,date);

    return res.status(200).send({
            message : "Item has been added",
            itemId : resp
        });
});

/**
 * Delete an item
 * Uses the user id and itemId to delete the item
 */
router.post('/delete', async (req,res)=>{
    let itemid = req.body.itemid;
    let userid = req.body.userid;

    const resp = await req.app.get('db').deleteItem(userid,itemid);

    return res.status(200).send({
            message : "Item has been deleted",
            itemId : resp
        });
});

/**
 * Update an item
 * Uses the user id and itemId to update the item
 */
router.post('/update', async (req,res)=>{
    let userid = req.body.userid;
    let itemname = req.body.name;
    let itemprice = req.body.price;
    let itemquantity = req.body.quantity;
    let itemtype = req.body.type;
    let location = req.body.location;
    let date = req.body.date;

    const resp = await req.app.get('db').updateItem(userid,itemname,itemprice,itemquantity,itemtype,location,date);

    return res.status(200).send({
            message : "Item has been updated successfully",
            itemId : resp
        });
});

module.exports.router = router;
