const router = require("express").Router();

/**
 * Request to have text extracted to be processed by the ML
 */
router.post('/process', async (req,res)=>{
    let { text } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const tokenVerified = await req.app.get('token').verifyToken(token);

    if(tokenVerified === "Error"){
        return res.status(200)
            .send({
                message: "Token has expired Login again to continue using the application",
                text : []
            });
    }

    let lines = text.split('\n')

    const processedText = await req.app.get('parser').parse(lines);

    return res.status(200).send({
            message : "Text has been processed",
            text : processedText
        });
});

module.exports.router = router;
