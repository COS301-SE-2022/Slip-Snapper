const fs = require('fs');
const PDFDocument = require('pdfkit');
const router = require("express").Router();

/**
 * Generate the pdf report for a user
 * Uses the user id to get the items
 */
router.get('/generate', async (req,res)=>{
    let { period, userId } = req.query;
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

    const result = await req.app.get('db').getItemsReport(Number(userId), periodStart, periodEnd);

    let pdf = new PDFDocument;
    let name = "report-" + today.getDate() + "-" + (today.getMonth()+1) + "-" + today.getFullYear() + "-a.pdf";
    pdf.pipe(fs.createWriteStream(name))

    let typeFood = [];
    let typeCleaning = [];
    let typeFurniture = [];
    let typeOther = [];

    for(var item of result.itemList){
        if(item.type == "food"){
            typeFood.push(item);
        }
        else if(item.type == "cleaning"){
            typeCleaning.push(item);
        }
        else if(item.type == "furniture"){
            typeFurniture.push(item);
        }
        else{
            typeOther.push(item);
        }
    }

    let temp = "Report for " + date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear();
    pdf.fontSize(20).text(temp);

    pdf.fontSize(17).text("Food items",110);
    for(var item of typeFood){
        pdf.fontSize(15).text("Item: " + item.itemName, 120);
        pdf.fontSize(12).text("quantity: " + item.quantity, 150);
        pdf.text("Price: R " + item.price);
        pdf.text("Location: " + item.location);
    }

    pdf.fontSize(17).text("\nCleaning items",110);
    for(var item of typeCleaning){
        pdf.fontSize(15).text("Item: " + item.itemName, 120);
        pdf.fontSize(12).text("quantity: " + item.quantity, 150);
        pdf.text("Price: R " + item.price);
        pdf.text("Location: " + item.location);
    }

    pdf.fontSize(17).text("\nFurniture items",110);
    for(var item of typeFurniture){
        pdf.fontSize(15).text("Item: " + item.itemName, 120);
        pdf.fontSize(12).text("quantity: " + item.quantity, 150);
        pdf.text("Price: R " + item.price);
        pdf.text("Location: " + item.location);
    }

    pdf.fontSize(17).text("\nOther items",110);
    for(var item of typeOther){
        pdf.fontSize(15).text("Item: " + item.itemName, 120);
        pdf.fontSize(12).text("quantity: " + item.quantity, 150);
        pdf.text("Price: R " + item.price);
        pdf.text("Location: " + item.location);
    }

    pdf.end();

    return res.status(200)
        .send({
            message: "Report Generated",
            title: name
        });
});

/**
 * Get the users budget
 * Uses the user id to get the items
 */
router.get('/budget', async (req,res)=>{
    let { userId } = req.query;

    const result = await req.app.get('db').getUserBudgets(Number(userId));

    let status = 200;

    //TODO error checking

    return res.status(status)
        .send({
            message: result.message,
            weeklyTotal: result.weeklyTotal,
            weekly: result.weekly,
            monthlyTotal: result.monthlyTotal,
            monthly: result.monthly
        });
    
});

/**
 * Set the users budget
 * Uses the user id to get the items
 */
router.post('/budget', async (req,res)=>{
    let { userId, weekly, monthly } = req.body;

    let data = {}
    if(weekly != null){
        data.weeklyBudget = weekly
    }

    if(monthly != null){
        data.monthlyBudget = monthly
    }

    const result = await req.app.get('db').setUserBudgets(userId, data);

    let status = 200;

    return res.status(status)
        .send({
            message: result.message,
            weekly: result.weekly,
            monthly: result.monthly
        });
});

/**
 * Get the user statistics
 * Uses the user Id
 */
router.get('/statistics', async (req,res)=>{
     let { userId } = req.body;

    const result = await req.app.get('db').getUserStats( userId );

    let status = 200;
    
    return res.status(status)
        .send({
            message : result.message,
            favouriteStore: {
                name: result.storeDetails.storeLocation,
                total: result.storeDetails.total,
                items: []
            },
            category: {
                // amount: result.category.amount,
                // name: result.category.category
                amount: 0,
                name: ''
            },
            mostExpensive: {
                amount: result.expensiveItem.expensiveItem,
                name: result.expensiveItem.dataItem
            },
            lastWeek:{
                current: result.week.recentWeek,
                previous: result.week.previousWeek
            },
            lastMonth:{
                current: result.month.recentMonth,
                previous: result.month.previousMonth
            }
        });
});

module.exports.router = router;
