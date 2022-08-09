const fs = require('fs');
const fsPromises = require("fs/promises");
const doc = require('pdfkit');
const PDFDocument = require('pdfkit-table');
const router = require("express").Router();
const {S3BucketFunctions} = require("../S3Bucket")

/**
 * Determines the start date to search from
 * @param {*} period the user specified period
 * @returns the starting date of the period
 */
 async function determinePeriodStart(period, periodEnd){
    var date = new Date();
    switch (period) {
        case "Daily":
            return periodEnd;
        case "Weekly":
            date.setDate(date.getDate() - 7);
            return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
        case "Monthly":
            date.setMonth(date.getMonth() - 1);
            return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
        // case "Yearly":
        //     d.setFullYear(date.getFullYear() - 1);
        //     return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
    }
}
 
/**
 * Sorts the items into the relevant arrays for the relevant category
 * @param {*} itemList list of items
 * @returns JSON object of arrays with the items in them
 */
async function sortItemsIntoCategories(itemList){
    let types = { Food : [], Electronics : [], Fashion : [], Household : [], Other : [], totals: { 
        Other: ["", "", 0, 0 ],
        Food : ["", "", 0, 0 ], 
        Electronics : ["", "", 0, 0 ], 
        Fashion : ["", "", 0, 0 ], 
        Household : ["", "", 0, 0 ],
    }}
    let totals =  [{price:0, itemNum:0}]
    for(const item of itemList){
        totals[0].price += item.price
        totals[0].itemNum += 1
        item.price = parseFloat(item.price).toFixed(2)
        switch (item.type) {
            case "food": 
                types.totals.Food[3] += parseFloat(item.price)
                types.totals.Food[2] += 1
                types.Food.push(item);
                break
            case "Electronics": 
                types.totals.Electronics[3] += parseFloat(item.price)
                types.totals.Electronics[2] += 1
                types.Electronics.push(item);
                break
            case "fashion": 
                types.totals.Fashion[3] += parseFloat(item.price)
                types.totals.Fashion[2] += 1
                types.Fashion.push(item);
                break
            case "household": 
                types.totals.Household[3] += parseFloat(item.price)
                types.totals.Household[2] += 1
                types.Household.push(item);
                break
            default: 
                types.totals.Other[3] += parseFloat(item.price)
                types.totals.Other[2] += 1
                types.Other.push(item);
        }
    }

    for (const key in types.totals){
        if(types.totals.hasOwnProperty(key) && types.totals[key].length > 0){
            types.totals[key][3] = parseFloat(types.totals[key][3]).toFixed(2)
        }
    }

    return { 
        types,
        totals
    }
}

/**
 * Function to geneerate a pdf
 * @param {*} name The name of the pdf
 * @param {*} types The items list
 * @param {*} today The date for today
 * @returns the total for the pdf
 */
async function generatePDF(name, object, today, period){
    let pdf = new PDFDocument;
    pdf.pipe(fs.createWriteStream(name))
    let temp = period + " Report for " + today.getDate() + "-" + (today.getMonth()+1) + "-" + today.getFullYear();
    pdf.fontSize(20).text(temp);
    let pdfTotal = 0

    const types = object.types

    const table = { 
        title: `Report Statistics`,
        headers: [
            { "label":"Number of items on report", "property":"itemNum", "width":120 },
            { "label":"Total Amount (R)", "property":"price", "width":120 },
        ],
        datas: object.totals,
    }

    pdf.table(table);

    for (const key in types){
        if(types.hasOwnProperty(key) && types[key].length > 0){
            const table = { 
                title: `${key} Items`,
                headers: [
                    { "label":"Location", "property":"location", "width":100 },
                    { "label":"Name", "property":"itemName", "width":100 },
                    { "label":"Quantity", "property":"quantity", "width":100 },
                    { "label":"Price (R)", "property":"price", "width":100 },
                ],
                datas: types[key],
                rows: [ 
                    types.totals[key]
                ],
            }
        
            pdf.table(table);
        }
    }

    pdf.end();

    return {
        fileContent: pdf,
        total: pdfTotal
    };
}

/**
 * Generate the pdf report for a user
 * Uses the user id to get the items, userName to get the right folder, and period to determine the timeframe
 */
router.post('/pdf', async (req,res)=>{
    let { period, userName } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const tokenVerified = await req.app.get('token').verifyToken(token);

    var today = new Date();
    let periodEnd = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()
    
    var periodStart = await determinePeriodStart(period, periodEnd);
    const result = await req.app.get('db').getItemsReport(Number(tokenVerified.user.id), periodStart, periodEnd);
    let types = await sortItemsIntoCategories(result.itemList)

    let name = today.getDate() + "-" + (today.getMonth()+1) + "-" + today.getFullYear() + "_" + period + ".pdf";
    let dir = __dirname + "/"
    let pdfName = dir + name
    let report = await generatePDF(pdfName, types, today, period)
    
    const path = `${userName}/${name}`
    const bucket = new S3BucketFunctions

    if(report){
        const resultPDF = bucket.uploadFile(path, report.fileContent)
    
        const resultDB = await req.app.get('db').createReportRecord(Number(tokenVerified.user.id), name, report.total);
        try {
            await fsPromises.unlink(pdfName);
        } catch (err) {}

        return res.status(200)
            .send({
                message: "Report Generated and uploaded",
                title: name,
                reportTotal: report.total
            });
    }

    return res.status(503)
        .send({
            message: "Report unable to uploaded",
            title: "",
            reportTotal: 0
        });
});

/**
 * Get a specific report from the S3 bucket
 * Uses the report name and UserName
 */
 router.get('/pdf', async (req,res)=>{
    let { userName, fileName } = req.query;
    const token = req.headers.authorization.split(' ')[1];
    const tokenVerified = await req.app.get('token').verifyToken(token);
    
    const path = `${userName}/${fileName}`
    const bucket = new S3BucketFunctions
    const result = await bucket.getFile(path)
    let status = 200;

    //TODO error checking

    return res.status(status)
        .send({
            message: result.message,
            report: result.data
        });
    
});

/**
 * Delete a specific report from the S3 bucket
 * Uses the report name and UserName and the reportID
 */
router.delete('/pdf', async (req,res)=>{
    let { userName, fileName, reportID } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const tokenVerified = await req.app.get('token').verifyToken(token);
    
    const path = `${userName}/${fileName}`
    const bucket = new S3BucketFunctions
    const result = bucket.deleteFile(path)
    
    await req.app.get("db").deleteReportRecord(Number(reportID))
    
    let status = 200;

    //TODO error checking

    return res.status(status)
        .send({
            message: result.message,
        });
    
});

/**
 * Get the users budget
 * Uses the user id to get the items
 */
router.get('/profile', async (req,res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const tokenVerified = await req.app.get('token').verifyToken(token);

    const result = await req.app.get('db').getUserProfile(Number(tokenVerified.user.id));

    let status = 200;
    //TODO error checking

    return res.status(status)
        .send({
            message: result.message,
            weeklyTotal: result.budget.weeklyTotal,
            weekly: result.budget.weekly,
            monthlyTotal: result.budget.monthlyTotal,
            monthly: result.budget.monthly,
            favouriteStore: {
                name: result.storeDetails.storeLocation,
                receipts: result.storeDetails.slips,
            },
            otherBudgets: result.budgets,
        });
    
});

/**
 * Set the users budget
 * Uses the user id to get the items
 */
router.post('/budget', async (req,res)=>{
    let { weekly, monthly } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const tokenVerified = await req.app.get('token').verifyToken(token);
    
    let data = {}
    if(weekly != null){
        data.weeklyBudget = weekly
    }

    if(monthly != null){
        data.monthlyBudget = monthly
    }

    const result = await req.app.get('db').setUserBudgets( Number(tokenVerified.user.id), data);

    let status = 200;

    return res.status(status)
        .send({
            message: result.message,
            weekly: result.weekly,
            monthly: result.monthly
        });
});

/**
 * Set the users budget
 * Uses the user id to get the items
 */
 router.post('/otherBudgets', async (req,res)=>{
    let { budgets } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const tokenVerified = await req.app.get('token').verifyToken(token);

    for (const key in budgets) {
        if (budgets.hasOwnProperty(key)) {
            budgets[key] = parseFloat(budgets[key])
        }
    }
    
    const result = await req.app.get('db').setUserSpecificBudgets( Number(tokenVerified.user.id), budgets);

    let status = 200;

    return res.status(status)
        .send({
            // message: result.message,
            // budgets: result.budgets,
        });
});

/**
 * Get the user statistics
 * Uses the user Id
 */
router.get('/statistics', async (req,res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const tokenVerified = await req.app.get('token').verifyToken(token);

    const result = await req.app.get('db').getUserStats( Number(tokenVerified.user.id) );
    let status = 200;

    return res.status(status)
        .send({
            message : result.message,

            category: {
                amount: result.category.amount,
                name: result.category.category
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
 * Get all the reports for a particular user
 * Uses the user id to get all linked reports
 */
router.get('/user', async (req,res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const tokenVerified = await req.app.get('token').verifyToken(token);
    
    const result = await req.app.get("db").getAllReports(Number(tokenVerified.user.id));

    let status = 200;

    //TODO error checking

    return res.status(status)
        .send({
            message: result.message,
            numReports: result.numReports,
            reports: result.reportsList
        });
    
});

/**
 * Get recent reports 
 * Uses the usersId
 */
router.get('/recent', async (req,res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const tokenVerified = await req.app.get('token').verifyToken(token);

    const result = await req.app.get("db").getRecentReports(Number(tokenVerified.user.id));

    let status = 200;

    //TODO error checking

    return res.status(status)
        .send({
            message: result.message,
            reports: result.reportsList
        });
    
});

/**
 * Get this weeks reports
 */
router.get('/thisweek', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const tokenVerified = await req.app.get('token').verifyToken(token);

    const result = await req.app.get("db").getDailyWeeklyMonthlyReports(Number(tokenVerified.user.id));

    let status = 200;

    //TODO error checking

    return res.status(status)
        .send({
            message: result.message,
            reports: result.weeklyReportsList
        });

});

/**
 * Get today's expenditure stats
 */
router.get('/today', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const tokenVerified = await req.app.get('token').verifyToken(token);

    const result = await req.app.get("db").todaysReports(Number(tokenVerified.user.id));

    let status = 200;

    //TODO error checking

    return res.status(status)
        .send({
            message: result.message,
            totalItems: result.sum,
            totalSpent: result.todaystotal
        });

});

module.exports.router = router;
