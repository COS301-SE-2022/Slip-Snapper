const router = require("express").Router();

/**
 * Get all items for a user
 * Uses the user id to get the items
 */
router.get('', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const tokenVerified = await req.app.get('token').verifyToken(token);

    if (tokenVerified === "Error") {
        return res.status(200)
            .send({
                message: "Token has expired Login again to continue using the application",
                numItems: 0,
                itemList: []
            });
    }

    const result = await req.app.get('db').getItem(Number(tokenVerified.user.id));
    //TODO checking for errors

    return res.status(200)
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
router.post('', async (req, res) => {
    req.body = JSON.parse(JSON.stringify(req.body, function (a, b) {

        let result = typeof b === "string" ? b.toLowerCase() : b
        return typeof result === "string" ? result.charAt(0).toUpperCase() + result.slice(1) : result

    }));
    let { location, date, total, data } = req.body;
    //general validation
    if (
        (location == null || date == null || total == null || data == null || data == []) ||
        (typeof (location) != 'string') ||
        (typeof (date) != 'string') ||
        (typeof (total) != 'number')

    ) {
        return res.status(200)
            .send({
                message: "Missing or Invalid input data",
            });
    }
    /*regex to minimize junk input*/

    location = location.replace(/[^a-zA-Z0-9 ]/g, "").trim()
    location === '' ? location = "Store" : location

    location = location.charAt(0).toUpperCase() + location.slice(1)

    for (let item in data) {
        data[item].item = data[item].item.replace(/[^a-zA-Z0-9 ]/g, "").trim()
        if (data[item].item == '') {
            data[item].item = "Item"
        }
        data[item].item = data[item].item.charAt(0).toUpperCase() + data[item].item.slice(1)
    }


    const token = req.headers.authorization.split(' ')[1];
    const tokenVerified = await req.app.get('token').verifyToken(token);
    if (tokenVerified === "Error") {
        return res.status(200)
            .send({
                message: "Token has expired Login again to continue using the application",
                numItems: 0,
            });
    }

    //TODO make use actual date
    let values = []
    for (var item of data) {
        values.push({
            item: item.item,
            itemType: item.type,
            dataId: -1,
            itemQuantity: Number(item.quantity),
            itemPrice: Number(item.price),
        })
    }

    const result = await req.app.get('db').addItem(Number(tokenVerified.user.id), location, date, total, values);

    //TODO checking for errors

    return res.status(200)
        .send({
            message: result.message,
            numItems: result.numItems,
        });
});

/**
 * Delete an item
 * Uses the user id and itemId to delete the item
 */
router.delete('', async (req, res) => {
    let { itemId } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const tokenVerified = await req.app.get('token').verifyToken(token);

    if (tokenVerified === "Error") {
        return res.status(200)
            .send({
                message: "Token has expired Login again to continue using the application",
                item: {},
            });
    }

    const result = await req.app.get('db').deleteItem(itemId);

    //TODO checking for errors

    return res.status(200)
        .send({
            message: result.message,
            item: result.item,
        });
});

/**
 * Update an item
 * Uses the user id and itemId to update the item
 */
router.patch('', async (req, res) => {
    let { itemId, itemname, itemprice, itemquantity, itemtype } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const tokenVerified = await req.app.get('token').verifyToken(token);

    if (tokenVerified === "Error") {
        return res.status(200)
            .send({
                message: "Token has expired Login again to continue using the application",
                item: {},
            });
    }

    let dataA = {}
    let dataB = {}

    if (itemname != undefined) {
        dataB.item = itemname;
    }

    if (itemprice != undefined) {
        dataA.itemPrice = itemprice;
    }

    if (itemquantity != undefined) {
        dataA.itemQuantity = itemquantity;
    }

    if (itemtype != undefined) {
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
    const token = req.headers.authorization.split(' ')[1];
    const tokenVerified = await req.app.get('token').verifyToken(token);

    if (tokenVerified === "Error") {
        return res.status(200)
            .send({
                message: "Token has expired Login again to continue using the application",
                slips: [],
            });
    }

    const result = await req.app.get('db').retrieveAllSlips(Number(tokenVerified.user.id))

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
router.patch('/slip', async (req, res) => {
    let { updateSlip, insertItems, updateItems, removeItems } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const tokenVerified = await req.app.get('token').verifyToken(token);
    if (tokenVerified === "Error") {
        return res.status(200)
            .send({
                message: "Token has expired Login again to continue using the application",
            });
    }

    const result = await req.app.get('db').updateSlip(Number(tokenVerified.user.id), updateSlip.text, insertItems, updateItems, removeItems)

    let status = 200;

    //TODO checking for errors

    return res.status(status)
        .send({
            message: result.message,
        });
});

/**
 * Delete a slip and its related items
 * Uses the slipId
 */
router.delete('/slip', async (req, res) => {
    let { slipId } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const tokenVerified = await req.app.get('token').verifyToken(token);

    if (tokenVerified === "Error") {
        return res.status(200)
            .send({
                message: "Token has expired Login again to continue using the application",
            });
    }

    const result = await req.app.get('db').deleteSlip(Number(slipId))

    let status = 200;

    //TODO checking for errors

    return res.status(status)
        .send({
            message: result.message,
        });
});

/**
 * Get data for graphing item prices in various Store Location
 * Uses the slipId
 */

router.get('/graph', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const tokenVerified = await req.app.get('token').verifyToken(token);

    if (tokenVerified === "Error") {
        return res.status(200)
            .send({
                message: "Token has expired Login again to continue using the application",
                slips: [],
            });
    }

    const result = await req.app.get('db').getUserAnalysis(Number(tokenVerified.user.id))

    let status = 200;
    return res.status(status)
        .send({
            data: result.analysis,
        });
});

module.exports.router = router;
