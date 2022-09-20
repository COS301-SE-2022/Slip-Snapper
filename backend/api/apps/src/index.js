const express = require('express');

function makeApp( database, parser = {}, token = {}, bucket = {}){
    const app = express();
    const bodyParser = require('body-parser');
    app.use(bodyParser.json({limit: '50mb'}));
    const Cors = require('cors')
    app.use(Cors())

    app.set( 'db', database )
    app.set( 'parser', parser )
    app.set( 'token', token )
    app.set( 'bucket', bucket )

    app.get('/api/ping', async (req,res)=>{
        return res.status(200)
            .send({
                message: "API is running"
            });
    });

    const authRoute = require("./routes/auth").router
    const itemRoute = require("./routes/item").router
    const reportRoute = require("./routes/report").router
    const ocrRoute = require("./routes/ocr").router
    const statsRoute = require("./routes/stats").router
    //router middleware
    app.use("/api/user",authRoute);
    app.use("/api/item",itemRoute);
    app.use("/api/report",reportRoute);
    app.use("/api/ocr",ocrRoute);
    app.use("/api/stats",statsRoute);

    return app;
}

module.exports.makeApp = makeApp;
