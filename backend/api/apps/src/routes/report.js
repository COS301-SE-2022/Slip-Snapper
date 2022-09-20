const fs = require('fs');
const fsPromises = require("fs/promises");
const PDFDocument = require('pdfkit-table');
const Excel = require('exceljs')
const router = require("express").Router();

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
            date.setDate(date.getDate())
            var day = date.getDay(),
                diff = date.getDate() - day + (day == 0 ? -6 : 1);
            let monday = new Date(date.setDate(diff));
            return monday.toISOString().substring(0, 10).replace("-", "/").replace("-", "/")
               
            case "Monthly":
                date.setDate(1)
                return date.toISOString().substring(0, 10).replace("-", "/").replace("-", "/")
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
    let types = {
        Food: [], Electronics: [], Fashion: [], Household: [], Healthcare: [], Hobby: [], Vehicle: [], Other : [], totals: { 
        Other: ["", "", 0, 0 ],
        Food : ["", "", 0, 0 ], 
        Electronics : ["", "", 0, 0 ], 
        Fashion : ["", "", 0, 0 ], 
        Household : ["", "", 0, 0 ],
        Healthcare: ["", "", 0, 0],
        Hobby: ["", "", 0, 0],
        Vehicle: ["", "", 0, 0],

    }}
    let totals =  [{price:0, itemNum:0}]
    for(const item of itemList){
        totals[0].price += item.price
        totals[0].itemNum += 1
        item.price = parseFloat(item.price).toFixed(2)
        switch (item.type) {
            case "Food": 
                types.totals.Food[3] += parseFloat(item.price)
                types.totals.Food[2] += 1
                types.Food.push(item);
                break
            case "Electronics": 
                types.totals.Electronics[3] += parseFloat(item.price)
                types.totals.Electronics[2] += 1
                types.Electronics.push(item);
                break
            case "Fashion": 
                types.totals.Fashion[3] += parseFloat(item.price)
                types.totals.Fashion[2] += 1
                types.Fashion.push(item);
                break
            case "Household": 
                types.totals.Household[3] += parseFloat(item.price)
                types.totals.Household[2] += 1
                types.Household.push(item);
                break
            case "Healthcare":
                 types.totals.Healthcare[3] += parseFloat(item.price)
                 types.totals.Healthcare[2] += 1
                 types.Healthcare.push(item);
                 break
             case "Hobby":
                 types.totals.Hobby[3] += parseFloat(item.price)
                 types.totals.Hobby[2] += 1
                 types.Hobby.push(item);
                 break
             case "Vehicle":
                 types.totals.Vehicle[3] += parseFloat(item.price)
                 types.totals.Vehicle[2] += 1
                 types.Vehicle.push(item);
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
 * Function to generate a pdf
 * @param {*} name The name of the pdf
 * @param {*} types The items list
 * @param {*} today The date for today
 * @returns the total for the pdf
 */
async function generatePDF(name, object, today, period){
    let pdf = new PDFDocument;
    pdf.pipe(fs.createWriteStream(name));
    const xcoord = pdf.x;
    await pdf.image(__dirname + '/assets/maskable_icon.png', 240, 50, {fit:[150,150], align:'center'});
    const pdfTitle = period + " Report for " + today.getDate() + "-" + (today.getMonth()+1) + "-" + today.getFullYear();
    pdf.fontSize(20).text(pdfTitle,xcoord,210,{align:'center'}); 
    pdf.y= 240;

    const types = object.types
    const table = { 
        title: `Report Statistics`,
        headers: [
            { "label":"Number of items on report", "property":"itemNum", "width":120 },
            { "label":"Total Amount (R)", "property":"price", "width":120 },
        ],
        datas: object.totals,
    }
    await pdf.table(table);

    let pdfTotal = 0
    for (const key in types){
        if(types.hasOwnProperty(key) && types[key].length > 0){
            const subTable = { 
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
            await pdf.table(subTable);
        }
    }
    pdf.end();

    return {
        fileContent: pdf,
        total: pdfTotal
    };
}

/**
 * Function to generate a excel spreadsheet
 * @param {*} name The name of the File
 * @param {*} allItems 
 * @returns the workbook object
 */
async function generateSpreadsheet(name, allItems){    
    const types = await sortItemsIntoCategories(allItems);
    
    const workbook = new Excel.Workbook();
    const allItemSheet = workbook.addWorksheet('All Items');
    allItemSheet.columns = [
        {header: 'Date', key:'date', width: 11},
        {header: 'Item Name', key:'itemName', width: allItems.reduce((w,r) => Math.max(w, r.itemName.length), 10) +1},
        {header: 'Location', key:'location', width: allItems.reduce((w,r) => Math.max(w, r.location.length), 10) +1},
        {header: 'Type', key:'type', width: 12},
        {header: 'Quantity', key:'quantity', width: 11},
        {header: 'Price', key:'price', width: 11},
        {},{},
        {width: 15},
    ]
 
    const titleRow = allItemSheet.getRow(1);
    titleRow.alignment = {
        horizontal: 'center'
    }
    
    if(allItems.length !== 0){
        allItems.map((item) => {
            let data = [ item.date, item.itemName, item.location, item.type, item.quantity, parseFloat(item.price) ];
            let row = allItemSheet.addRow(data);
        })
    
        allItemSheet.getCell('I2').value = "Total Quantity:"; 
        allItemSheet.getCell('J2').value = { formula: 'SUM(E2:'+allItemSheet.lastRow._cells[4]._address+")", result: 0 }; 
        allItemSheet.getCell('I3').value = "Total Price:"; 
        allItemSheet.getCell('J3').value = { formula: 'SUM(F2:'+allItemSheet.lastRow._cells[5]._address+")", result: 0 }; 

        for(const key in types.types){
            if(types.types.hasOwnProperty(key) && types.types[key].length > 0){
                const sheet = workbook.addWorksheet(key);
                sheet.columns = [
                    {header: 'Date', key:'date', width: 11},
                    {header: 'Item Name', key:'itemName', width: allItems.reduce((w,r) => Math.max(w, r.itemName.length), 10) +1},
                    {header: 'Location', key:'location', width: allItems.reduce((w,r) => Math.max(w, r.location.length), 10) +1},
                    {header: 'Type', key:'type', width: 12},
                    {header: 'Quantity', key:'quantity', width: 11},
                    {header: 'Price', key:'price', width: 11},
                    {},{},
                    {width: 15},
                ]
            
                const titleRow = sheet.getRow(1);
                titleRow.alignment = {
                    horizontal: 'center'
                }
    
                types.types[key].map((item) => {
                    let data = [ item.date, item.itemName, item.location, item.type, item.quantity, parseFloat(item.price) ];
                    let row = sheet.addRow(data);
                })
                
                sheet.getCell('I2').value = "Total Quantity:"; 
                sheet.getCell('J2').value = { formula: 'SUM(E2:'+allItemSheet.lastRow._cells[4]._address+")", result: 0 }; 
                sheet.getCell('I3').value = "Total Price:"; 
                sheet.getCell('J3').value = { formula: 'SUM(F2:'+allItemSheet.lastRow._cells[5]._address+")", result: 0 }; 
            }
        }    
    }
    
    await workbook.xlsx.writeFile(__dirname+'/'+name);
 
    return workbook;
}
  
/**
 * Generate the pdf report for a user
 * Uses the user id to get the items, userName to get the right folder, and period to determine the timeframe
 */
router.post('/pdf', async (req,res)=>{
    let { period, userName, newReportNumber } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const tokenVerified = await req.app.get('token').verifyToken(token);

    if(tokenVerified === "Error"){
        return res.status(200)
            .send({
                message: "Token has expired Login again to continue using the application",
                title: "",
                reportTotal: 0
            });
    }

    const today = new Date();
    const periodEnd = today.toISOString().substring(0, 10).replace("-", "/").replace("-", "/")
    const periodStart = await determinePeriodStart(period, periodEnd);
    const result = await req.app.get('db').getItemsReport(Number(tokenVerified.user.id), periodStart, periodEnd);

    const types = await sortItemsIntoCategories(result.itemList)

    const name = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear() + "_" + period + "_"+ newReportNumber+ ".pdf";
    const dir = __dirname + "/"
    const pdfName = dir + name
    const report = await generatePDF(pdfName, types, today, period)
    
    if(report){
        const path = `${userName}/${name}`
        const bucket = await req.app.get('bucket').uploadFile(path, report.fileContent)
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
    
    if(tokenVerified === "Error"){
        return res.status(200)
            .send({
                message: "Token has expired Login again to continue using the application",
                report: ""
            });
    }

    const path = `${userName}/${fileName}`
    const bucket = await req.app.get('bucket').getFile(path)
    
    let status = 200;

    //TODO error checking

    return res.status(status)
        .send({
            message: bucket.message,
            report: bucket.data
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
    
    if(tokenVerified === "Error"){
        return res.status(200)
            .send({
                message: "Token has expired Login again to continue using the application",
            });
    }

    const path = `${userName}/${fileName}`
    const bucket = await req.app.get('bucket').deleteFile(path)

    await req.app.get("db").deleteReportRecord(Number(reportID))
    
    let status = 200;

    //TODO error checking

    return res.status(status)
        .send({
            message: bucket.message,
        });
    
});

/**
 * Get the users budget
 * Uses the user id to get the items
 */
router.get('/profile', async (req,res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const tokenVerified = await req.app.get('token').verifyToken(token);

    if(tokenVerified === "Error"){
        return res.status(200)
            .send({
                message: "Token has expired Login again to continue using the application",
                weeklyTotal: 0,
                weekly: 0,
                monthlyTotal: 0,
                monthly: 0,
                favouriteStore: {
                    name: "",
                    receipts: [],
                },
                otherBudgets: {},
            });
    }
    
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
    
    if(tokenVerified === "Error"){
        return res.status(200)
            .send({
                message: "Token has expired Login again to continue using the application",
                weekly: 0,
                monthly: 0,
            });
    }

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
            monthly: result.monthly,
        });
});

/**
 * Set the users budget
 * Uses the user id to get the items
 */
router.post('/otherBudgets', async (req, res) => {
    let { budgets } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const tokenVerified = await req.app.get('token').verifyToken(token);

    if (tokenVerified === "Error") {
        return res.status(200)
            .send({
                message: "Token has expired Login again to continue using the application",
                budgets: {},
            });
    }

    for (const key in budgets) {
        if (budgets.hasOwnProperty(key)) {
            budgets[key].weeklyValue = parseFloat(budgets[key].weeklyValue)
            budgets[key].monthlyValue = parseFloat(budgets[key].monthlyValue)
        }
    }

    const result = await req.app.get('db').updateWeeklyMonthlyCategoryBudgets(Number(tokenVerified.user.id), budgets);
    let status = 200;

    return res.status(status)
        .send({
            message: result.message,
            budgets: result.budgets,
        });
});


/**
 * Get the user statistics
 * Uses the user Id
 */
router.get('/statistics', async (req,res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const tokenVerified = await req.app.get('token').verifyToken(token);

    if(tokenVerified === "Error"){
        return res.status(200)
            .send({
                message: "Token has expired Login again to continue using the application",

                category: {
                    amount: 0,
                    name: ""
                },
                mostExpensive: {
                    amount: 0,
                    name: ""
                },
                lastWeek:{
                    current: 0,
                    previous: 0
                },
                lastMonth:{
                    current: 0,
                    previous: 0
                }
            });
    }

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

    if(tokenVerified === "Error"){
        return res.status(200)
            .send({
                message: "Token has expired Login again to continue using the application",
                numReports: 0,
                reports: []
            });
    }
    
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
    
    if(tokenVerified === "Error"){
        return res.status(200)
            .send({
                message: "Token has expired Login again to continue using the application",
                reports: []
            });
    }

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

    if(tokenVerified === "Error"){
        return res.status(200)
            .send({
                message: "Token has expired Login again to continue using the application",
                reports: []
            });
    }

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

    if(tokenVerified === "Error"){
        return res.status(200)
            .send({
                message: "Token has expired Login again to continue using the application",
                totalItems: 0,
                totalSpent: 0
            });
    }

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

/**
 * Generate a excel spreadsheet for a user
 */
router.post('/spreadsheet', async (req, res) => {
    let { period } = req.body;
    // const token = req.headers.authorization.split(' ')[1];
    // const tokenVerified = await req.app.get('token').verifyToken(token);

    // if(tokenVerified === "Error"){
    //     return res.status(200)
    //         .send({
    //             message: "Token has expired Login again to continue using the application",
    //         });
    // }
    // console.log(tokenVerified)
    const today = new Date();
    const periodEnd = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()
    const periodStart = await determinePeriodStart(period, periodEnd);

    // const result = await req.app.get('db').getItemsReport(Number(tokenVerified.user.id), periodStart, periodEnd);
    const result = await req.app.get('db').getItemsReport(41, periodStart, periodEnd);
    const name = "Report.xlsx";

    const spreadSheet = await generateSpreadsheet(name,result.itemList);

    let status = 200;

    //TODO error checking
    res.status(status)
        .setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        .setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
    spreadSheet.xlsx.write(res)
        .then(() => {
            res.end();
        });

    // try {
    //     await fsPromises.unlink(__dirname+"/"+name);
    // } catch (err) {}
});

module.exports.router = router;
