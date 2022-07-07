const fs = require('fs');
const PDFDocument = require('pdfkit');
const router = require("express").Router();

/**
 * Determines the start date to search from
 * @param {*} period the user specified period
 * @returns the starting date of the period
 */
 async function determinePeriodStart(period, periodEnd){
    var date = new Date();
    switch (period) {
        case "day":
            return periodEnd;
        case "week":
            date.setDate(date.getDate() - 7);
            return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
        case "month":
            date.setMonth(date.getMonth() - 1);
            return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
        case "year":
            d.setFullYear(date.getFullYear() - 1);
            return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
    }
}

/**
 * Sorts the items into the relevant arrays for the relevant category
 * @param {*} itemList list of items
 * @returns JSON object of arrays with the items in them
 */
async function sortItemsIntoCategories(itemList){
    let types = { Food : [], Cleaning : [], Furniture : [], Other : [], }
    for(var item of itemList){
        switch (item.type) {
            case "food": 
                types.Food.push(item);
                break
            case "cleaning": 
                types.Cleaning.push(item);
                break
            case "furniture": 
                types.Furniture.push(item);
                break
            default: 
                types.Other.push(item);
        }
    }
    return types
}

/**
 * Generate the pdf report for a user
 * Uses the user id to get the items
 */
router.get('/generate', async (req,res)=>{
    let { period, userId } = req.query;
    var today = new Date();
    let periodEnd = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()
    
    var periodStart = await determinePeriodStart(period, periodEnd);
    const result = await req.app.get('db').getItemsReport(Number(userId), periodStart, periodEnd);
    let types = await sortItemsIntoCategories(result.itemList)

    let pdf = new PDFDocument;
    let name = "report-" + today.getDate() + (today.getMonth()+1) + today.getFullYear() + "-" + today.getTime() + ".pdf";
    pdf.pipe(fs.createWriteStream(name))

    let temp = "Report for " + today.getDate() + "-" + (today.getMonth()+1) + "-" + today.getFullYear();
    pdf.fontSize(20).text(temp);

    for (var key in types){
        if(types.hasOwnProperty(key) && types[key].length > 0){
            pdf.fontSize(17).text(`${key} items`,110);
            for(var item of types[key]){
                pdf.fontSize(15).text("Item: " + item.itemName, 120);
                pdf.fontSize(12).text("quantity: " + item.quantity, 150);
                pdf.text("Price: R " + item.price);
                pdf.text("Location: " + item.location);
            }
        }
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

/**
 * Get the users report
 * Uses the user id and report id to get the reports
 */
router.get('/report', async (req,res)=>{
    let { userId, reportId } = req.query;
    
    //If report id is -1 then retrieve all reports for the user

    //const result = await req.app.get('db').getUserReports(Number(userId), Number(reportId));

    let status = 200;

    //TODO error checking

    return res.status(status)
        .send({
            message: result.message,
            report: result.reports
        });
    
});

module.exports.router = router;
