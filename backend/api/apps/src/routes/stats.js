const router = require("express").Router();

/**
 * Validate that a category budget object is valid
 * @param {*} category object to be checked
 * @returns boolean (true if invalid)
 */
function validateCategoryBudget(category){
    return ( 
        (Object.keys(category).join() != [ 'active', 'timeFrame', 'weeklyValue', 'monthlyValue' ].join()) ||
        (category.weeklyValue == null || category.monthlyValue == null || category.active == null || category.timeFrame == null) || 
        (category.active != null && typeof(category.active) != 'boolean') ||
        (category.timeFrame != null && typeof(category.timeFrame) != 'boolean') ||
        (category.weeklyValue != null && (typeof(category.weeklyValue) != 'number' || category.weeklyValue < 0)) ||
        (category.monthlyValue != null && (typeof(category.monthlyValue) != 'number' || category.monthlyValue < 0))
    )
}

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
        const token = req.headers.authorization.split(' ')[1];
        const tokenVerified = await req.app.get('token').verifyToken(token);
        
        if(tokenVerified === "Error"){
            return res.status(200)
                .send({
                    message: "Token has expired Login again to continue using the application",
                });
        }

        let { weekly, monthly } = req.body;
        if( (weekly == null && monthly == null) || 
            (weekly != null && (typeof(weekly) != 'number' || weekly < 0)) ||
            (monthly != null && (typeof(monthly) != 'number' || monthly < 0)) 
        ){
            return res.status(200)
                .send({
                    message: "Missing or Invalid input data",
                });
        }
        
        let data = {}
        if(weekly != undefined){
            data.weeklyBudget = weekly
        }
        if(monthly!= undefined){
            data.monthlyBudget = monthly
        }

        const result = await req.app.get('db').setUserBudgets( Number(tokenVerified.user.id), data);

        return res.status(200)
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
    const token = req.headers.authorization.split(' ')[1];
    const tokenVerified = await req.app.get('token').verifyToken(token);

    if (tokenVerified === "Error") {
        return res.status(200)
            .send({
                message: "Token has expired Login again to continue using the application",
            });
    }
    
    let { budgets } = req.body;
    for (const key in budgets) {
        if (budgets.hasOwnProperty(key)) {
            if( (!(['FoodBudget', 'FashionBudget', 'ElectronicsBudget', 'HouseholdBudget', 'OtherBudget', 'HobbyBudget', 'HealthcareBudget', 'VehicleBudget'].includes(key))) ||
                validateCategoryBudget(budgets[key])
            ){  
                return res.status(200)
                    .send({
                        message: "Missing or Invalid input data",
                    });
            }

            budgets[key].weeklyValue = parseFloat(budgets[key].weeklyValue)
            budgets[key].monthlyValue = parseFloat(budgets[key].monthlyValue)
        }
    }

    const result = await req.app.get('db').updateWeeklyMonthlyCategoryBudgets(Number(tokenVerified.user.id), budgets);

    return res.status(200)
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
            });
    }

    const result = await req.app.get('db').getUserStats( Number(tokenVerified.user.id) );

    return res.status(200)
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
            });
    }

    const result = await req.app.get("db").todaysReports(Number(tokenVerified.user.id));
    const lastWeeksResult = await req.app.get("db").thisWeeksExpenditure(Number(tokenVerified.user.id));

    //TODO error checking

    return res.status(200)
        .send({
            message: result.message,
            totalItems: result.sum,
            totalSpent: result.todaystotal,
            weekItemCount: lastWeeksResult.itemCount,
            weekTotal: lastWeeksResult.weekTotal
        });
});

/**
 * Get today's expenditure stats
 */
router.get('/today', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const tokenVerified = await req.app.get('token').verifyToken(token);

    if (tokenVerified === "Error") {
        return res.status(200)
            .send({
                message: "Token has expired Login again to continue using the application",
            });
    }

    const result = await req.app.get("db").todaysReports(Number(tokenVerified.user.id));

    //TODO error checking

    return res.status(200)
        .send({
            message: result.message,
            totalItems: result.sum,
            totalSpent: result.todaystotal
        });

});

/**
 * Get today's expenditure stats
 */
router.get('/forecast', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const tokenVerified = await req.app.get('token').verifyToken(token);

    if (tokenVerified === "Error") {
        return res.status(200)
            .send({
                message: "Token has expired Login again to continue using the application",
            });
    }

    const result = await req.app.get("db").getForecast(Number(tokenVerified.user.id));

    //TODO error checking

    return res.status(200)
        .send({
            message: result.message,
            averagesArray: result.averagesArray,
            futureDateArray: result.futureDateArray
        });

});

module.exports.router = router;
