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
const ocrRoute = require("./routes/ocr")
//router middleware
app.use("/api/user",authRoute);
app.use("/api/item",itemRoute);
app.use("/api/report",reportRoute);
app.use("/api/ocr",ocrRoute);

module.exports = {app}