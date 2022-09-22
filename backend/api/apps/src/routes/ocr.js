const router = require("express").Router();
const createWorker = require('tesseract.js').createWorker;
const processImage = require('../imageProcessor').processImage

/**
 * Request to have text extracted to be processed by the ML
 */
router.post('/process', async (req,res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const tokenVerified = await req.app.get('token').verifyToken(token);

    if(tokenVerified === "Error"){
        return res.status(200)
            .send({
                message: "Token has expired Login again to continue using the application",
                text : []
            });
    }

    let { image } = req.body;
    const processedImage = await processImage(image);

    const worker =  createWorker({
        cachePath: '..',
        cacheMethod: 'readOnly',
    });

    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');

    if(processedImage == "Error processing image"){
        return res.status(200).send({
            message : "Error processing image",
            text : []
        });
    }

    const {
        data: { text },
    } = await worker.recognize(processedImage);
    
    await worker.terminate();

    const processedText = await req.app.get('parser').parse(text);
    
    if(!processedText){
        return res.status(200).send({
            message : "Error processing image",
            text : []
        });
    }

    return res.status(200).send({
            message : "Text has been processed",
            text : processedText
        });

});

module.exports.router = router;
