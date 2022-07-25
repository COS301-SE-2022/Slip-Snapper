const router = require("express").Router();

router.get('/allSlips', async (req, res) => {
    let { userId } = req.query;

    const result = await req.app.get('db').retrieveAllSlips(1)

    let status = 200;

    //TODO checking for errors

    return res.status(status)
        .send({
            message: result.message,
            // numItems: result.numItems,
            // itemList: result.itemList
        });
});