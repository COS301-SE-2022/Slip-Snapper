const router = require("express").Router();
const bcrypt = require('bcrypt');

/**
 * Add a user
 * Adds a user with an Name, Password
 */
router.post('/signup', async (req,res)=>{
    //TODO add input checking and password hashing
    let { firstname, lastname, username, password } = req.body;

    const saltRounds = 15;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashed = bcrypt.hashSync(password,salt);
    console.log(hashed);

    const result = await req.app.get('db').addUser(username, hashed, firstname, lastname);

    const token = '';
    // const token = await req.app.get('token').generateToken(result.user)

    // const path = `${username}/`
    // const bucket = await req.app.get('bucket').createFolder(path)

    let status = 200;
    //TODO checking for errors

    return res.status(status)
        .send({
            message: result.message,
            userData: result.user,
            token: token,
        });
});

/**
 * Log a user in
 * Logs the user in with their password and username
 */
router.post('/login', async (req, res)=>{
    //TODO add input checking and password hashing
    let { username, password } = req.body;

    const result = await req.app.get('db').getUser(username,password);
    let status = 200;
    //TODO checking for errors
    
    const token = await req.app.get('token').generateToken(result.user)

    return res.status(status)
        .send({
            message: result.message,
            userData: result.user,
            token: token,
        });
});

/**
 * Delete a user
 * Uses the user ID to delete the user
 */
router.delete('', async (req,res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const tokenVerified = await req.app.get('token').verifyToken(token);

    if(tokenVerified === "Error"){
        return res.status(200)
            .send({
                message: "Token has expired Login again to continue using the application",
            });
    }

    const result = await req.app.get('db').deleteUser(Number(tokenVerified.user.id));

    let status = 200;
    //TODO checking for errors

    return res.status(status)
        .send({
            message: result.message,
        });
});

/**
 * Update a user
 * Uses the user id to update the user
 */
 router.patch('', async (req,res)=>{
    let { username, password, firstname, lastname, weeklyBudget, monthlyBudget } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const tokenVerified = await req.app.get('token').verifyToken(token);

    if(tokenVerified === "Error"){
        return res.status(200)
            .send({
                message: "Token has expired Login again to continue using the application",
                userData: {},
            });
    }

    let data = {}
    // if(username != undefined){
    //     data.username = username;
    // }

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

    const result = await req.app.get('db').updateUser(Number(tokenVerified.user.id), data);

    let status = 200;

    //TODO checking for errors

    return res.status(status)
        .send({
            message: result.message,
            userData: result.user,
        });
});
 

module.exports.router = router;
