const express =require('express');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const Cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(Cors())

//Connect to db here


const authRoute = require("./routes/auth")
const itemRoute = require("./routes/item")
//router middleware
app.use("/api/user",authRoute);
app.use("/api/item",itemRoute);

/**
 * Generate the pdf report for a user
 * Uses the user id to get the items
 */
 app.get('/report/generate',async(req,res)=>{
    let period = req.query.period;
    var today = new Date();
    let periodEnd = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()
    var date = new Date();
    var periodStart;
    
    switch (period) {
        case "day":
            periodStart = periodEnd;
            break;
        case "week":
            date.setDate(date.getDate() - 7);
            periodStart = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
            break;
        case "month":
            date.setMonth(date.getMonth() - 1);
            periodStart = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
            break;
        case "year":
            d.setFullYear(date.getFullYear() - 1);
            periodStart = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
            break;
    }

    let pdf = new PDFDocument;
    let name = "report-" + today.getDate() + "-" + (today.getMonth()+1) + "-" + today.getFullYear() + "-a.pdf";
    pdf.pipe(fs.createWriteStream(name))
    fs.readFile( __dirname + "/items.json", 'utf8', function (err, data) {
        if(err) {
            return console.log(err);
        }
        let d = JSON.parse(data);
        let typeF = [];
        let typeC = [];
        for(var i = 0;i < Object.keys(d).length;i++){
            if(d[Object.keys(d)[i]].user == req.query.user){
                if(d[Object.keys(d)[i]].type == "food"){
                    typeF.push(d[Object.keys(d)[i]]);
                }
                else{
                    typeC.push(d[Object.keys(d)[i]]);
                }
            }
        }
        let temp = "Report for " + date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear();
        pdf.fontSize(20).text(temp);

        pdf.fontSize(17).text("Food items",110);
        for(i = 0;i < typeF.length;i++){
            temp = "Item: " + typeF[Object.keys(typeF)[i]].item_name;
            pdf.fontSize(15).text(temp,120);
            temp = "quantity: " + typeF[Object.keys(typeF)[i]].quantity;
            pdf.fontSize(12).text(temp,150);
            temp = "Price: R " + typeF[Object.keys(typeF)[i]].price;
            pdf.text(temp);
            temp = "Location: " + typeF[Object.keys(typeF)[i]].location;
            pdf.text(temp);
        }

        pdf.fontSize(17).text("\nCleaning items",110);
        for(i = 0;i < typeC.length;i++){
            temp = "Item: " + typeC[Object.keys(typeF)[i]].item_name;
            pdf.fontSize(15).text(temp,120);
            temp = "quantity: " + typeC[Object.keys(typeF)[i]].quantity;
            pdf.fontSize(12).text(temp,150);
            temp = "Price: R " + typeC[Object.keys(typeF)[i]].price;
            pdf.text(temp);
            temp = "Location: " + typeC[Object.keys(typeF)[i]].location;
            pdf.text(temp);
        }

        pdf.end();
    });
    
    return res.status(200).end(JSON.stringify("Report Generated",null,2));
})

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