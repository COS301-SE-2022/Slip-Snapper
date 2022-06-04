const router = require("express").Router();

/**
 * Request to have text extracted to be processed by the ML
 */
router.post('/process', async (req,res)=>{
    let unprocessedText = req.body.text;

    //Send text for processing

    //Process Response

    //Respond with relevant text
    let processedText = "Temporary response"

    return res.status(200).send({
            message : "Text has been processed",
            text : processedText
        });
});

module.exports.router = router;
