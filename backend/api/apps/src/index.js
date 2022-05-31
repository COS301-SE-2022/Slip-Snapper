const express = require('express');
const Cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(Cors())

//Connect to db here


const authRoute = require("./routes/auth")
const itemRoute = require("./routes/item")
const reportRoute = require("./routes/report")
//router middleware
app.use("/api/user",authRoute);
app.use("/api/item",itemRoute);
app.use("/api/report",reportRoute);

/**
 * Request to have text extracted to be processed by the ML
 */
app.post('/ocr',async(req,res)=>{
    let unprocessedText = req.body.text;

    //Send text for processing

    //Process Response

    //Respond with relevant text
    let processedText = "Temporary response"

    return res.status(200).end(JSON.stringify({message:"Text has been processed",text: processedText}));
})

module.exports = {app}