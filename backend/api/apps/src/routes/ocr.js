const router = require("express").Router();
const createWorker = require('tesseract.js').createWorker;

/**
 * Request to have text extracted to be processed by the ML
 */
router.post('/process', async (req,res)=>{
    let { image } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const tokenVerified = await req.app.get('token').verifyToken(token);

    if(tokenVerified === "Error"){
        return res.status(200)
            .send({
                message: "Token has expired Login again to continue using the application",
                text : []
            });
    }

    const worker =  createWorker({
        cachePath: '..',
        cacheMethod: 'readOnly',
    });

    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const {
        data: { text },
    } = await worker.recognize(image);
    
    await worker.terminate();

    const processedText = await req.app.get('parser').parse(text);

    return res.status(200).send({
            message : "Text has been processed",
            text : processedText
        });

});

module.exports.router = router;
