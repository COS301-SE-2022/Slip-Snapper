const express = require('express');

function makeApp( database, parser = {}){
    const app = express();
    const bodyParser = require('body-parser');
    app.use(bodyParser.json());
    const Cors = require('cors')
    app.use(Cors())

    app.set( 'db', database )
    app.set( 'parser', parser )

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
    //router middleware
    app.use("/api/user",authRoute);
    app.use("/api/item",itemRoute);
    app.use("/api/report",reportRoute);
    app.use("/api/ocr",ocrRoute);

    return app;
}

module.exports.makeApp = makeApp;
