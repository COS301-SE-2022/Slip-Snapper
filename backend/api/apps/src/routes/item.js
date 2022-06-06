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
 * Uses the user id to add the item\s
 */
router.post('/add', async (req,res)=>{
    let { userId, location, date, total, data } = req.body;
        // {
        //     item : "abc",
        //     itemType: "food",
        //     itemQuantities: 1,
        //     itemPrices: 123,
        //     slipId: -1
        // }

    const result = await req.app.get('db').addItem(userId, location, date, total, data);

    let status = 200;

    //TODO checking for errors

    return res.status(status)
        .send({
            message: result.message,
            numItems: result.numItems,
        });
});

/**
 * Delete an item
 * Uses the user id and itemId to delete the item
 */
router.post('/delete', async (req,res)=>{
    let { itemId } = req.body;

    const result = await req.app.get('db').deleteItem(itemId);

    let status = 200;

    //TODO checking for errors

    return res.status(status)
        .send({
            message: result.message,
            item: result.item,
        });
});

/**
 * Update an item
 * Uses the user id and itemId to update the item
 */
router.post('/update', async (req,res)=>{
    let { itemId, itemname, itemprice, itemquantity, itemtype } = req.body;

    let data = {}
    if(itemname != undefined){
        data.item = itemname;
    }

    if(itemprice != undefined){
        data.itemPrices = itemprice;
    }

    if(itemquantity != undefined){
        data.itemQuantities = itemquantity;
    }
    
    if(itemtype != undefined){
        data.itemType = itemtype;
    }

    const result = await req.app.get('db').updateItem(itemId,data);

    let status = 200;

    //TODO checking for errors

    return res.status(status)
        .send({
            message: result.message,
            item: result.item
        });
});

module.exports.router = router;
