const router = require("express").Router();

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
            user:result.user,
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
router.post('/categoryBudgets', async (req, res) => {
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
router.get('', async (req,res)=>{
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
                previous: result.week.previousWeek,
                current: result.week.recentWeek

            },
            lastMonth:{
                previous: result.month.previousMonth,
                 current: result.month.recentMonth,
            }
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

module.exports.router = router;
