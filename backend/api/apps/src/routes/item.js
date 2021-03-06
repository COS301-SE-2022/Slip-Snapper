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

    //TODO make use actual date

    let values = []
    for (var item of data){
        values.push({
            item : item.item,
            itemType: item.type,
            dataId: -1,
            itemQuantity: Number(item.quantity),
            itemPrice: Number(item.price),
        })
    }

    let date1 = new Date().toISOString()

    const result = await req.app.get('db').addItem(userId, location, date1, total, values);

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

    let dataA = {}
    let dataB = {}

    if(itemname != undefined){
        dataB.item = itemname;
    }

    if(itemprice != undefined){
        dataA.itemPrice = itemprice;
    }

    if(itemquantity != undefined){
        dataA.itemQuantity = itemquantity;
    }
    
    if(itemtype != undefined){
        dataB.itemType = itemtype;
    }

    const result = await req.app.get('db').updateItem(itemId, dataA, dataB);

    let status = 200;

    //TODO checking for errors

    return res.status(status)
        .send({
            message: result.message,
            item: result.item
        });
});

/**
 * Get all the slips and their related items
 * Uses the userid
 */
router.get('/slip', async (req, res) => {
    let { userId } = req.query;

    const result = await req.app.get('db').retrieveAllSlips(Number(userId))

    let status = 200;

    //TODO checking for errors

    return res.status(status)
        .send({
            message: result.message,
            slips: result.slips,
        });
});

/**
 * Update a slip and its related items
 * Uses the userid
 */
 router.post('/slip', async (req, res) => {
    let { userId, updateSlip,insertItems, updateItems, removeItems } = req.body;
   
    const result = await req.app.get('db').updateSlip(Number(userId),updateSlip.text,insertItems,updateItems,removeItems)

    let status = 200;

    //TODO checking for errors

    return res.status(status)
        .send({
            message: result.message,
        });
});

module.exports.router = router;
