const router = require("express").Router();
const { S3BucketFunctions } = require("./S3Bucket")

/**
 * Add a user
 * Adds a user with an Name, Password
 */
router.post('/signup', async (req,res)=>{
    //TODO add input checking and password hashing
    let { firstname, lastname, username, password } = req.body;
    const result = await req.app.get('db').addUser(username, password, firstname, lastname);
    console.log(username)

    const path = `${username}/`
    const bucket = new S3BucketFunctions
    const resultPDF = bucket.createFolder(path)

    let status = 200;
    //TODO checking for errors

    return res.status(status)
        .send({
            message: result.message,
            userData: result.user
        });
});

/**
 * Log a user in
 * Logs the user in with their password and username
 */
router.post('/login', async (req,res)=>{
    //TODO add input checking and password hashing
    let { username, password } = req.body;

    const result = await req.app.get('db').getUser(username,password);

    let status = 200;

    if(result.message == "Invalid Username" || result.message == "Invalid Password"){
        status = 400;
    }

    return res.status(status)
        .send({
            message: result.message,
            userData: result.user
        });
});

/**
 * Delete a user
 * Uses the user id delete the user
 */
router.post('/delete', async (req,res)=>{
    //TODO add input checking and password hashing

    let { userId } = req.body;

    const result = await req.app.get('db').deleteUser(userId);

    let status = 200;

    //TODO checking for errors

    return res.status(status)
        .send({
            message: result.message,
            userData: result.user
        });
});

/**
 * Update a user
 * Uses the user id to update the user
 */
 router.post('/update', async (req,res)=>{
    let { userId, username, password, firstname, lastname, weeklyBudget, monthlyBudget } = req.body;

    let data = {}
    if(username != undefined){
        data.username = username;
    }

    if(password != undefined){
        data.password = password;
    }

    if(firstname != undefined){
        data.firstname = firstname;
    }
    
    if(lastname != undefined){
        data.lastname = lastname;
    }

    if(weeklyBudget != undefined){
        data.weeklyBudget = weeklyBudget;
    }

    if(monthlyBudget != undefined){
        data.monthlyBudget = monthlyBudget;
    }
    
    const result = await req.app.get('db').updateUser(userId, data);

    let status = 200;

    //TODO checking for errors

    return res.status(status)
        .send({
            message: result.message,
            userData: result.user
        });
});
 

module.exports.router = router;
