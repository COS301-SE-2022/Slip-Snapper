const router = require("express").Router();

/**
 * Add a user
 * Adds a user with an Name, Password
 */
router.post('/signup', async (req,res)=>{
    //TODO add input checking and password hashing
    let username = req.body.username;
    let password = req.body.password;

    const userid = await req.app.get('db').addUser(username,password);

    return res.status(200)
        .send({
            message: "User succesfully added",
            userId: userid
        });
});


/**
 * Log a user in
 * Logs the user in with their password and username
 */
router.post('/login', async (req,res)=>{
    //TODO add input checking and password hashing
    let username = req.body.username;
    let password = req.body.password;

    const userid = await req.app.get('db').getUser(username,password);

    return res.status(200)
        .send({
            message: "User logged in succesfully",
            userId: userid
        });
});

/**
 * Delete a user
 * Uses the user id delete the user
 */
router.post('/delete', async (req,res)=>{
    //TODO add input checking and password hashing
    let username = req.body.username;
    let password = req.body.password;

    const userid = await req.app.get('db').deleteUser(username,password);

    return res.status(200)
        .send({
            message: "User deleted succesfully",
            userId: userid
        });
});

/**
 * Update a user
 * Uses the user id to update the user
 */
 router.post('/update', async (req,res)=>{
    let username = req.body.username;
    let password = req.body.password;

    const userid = await req.app.get('db').updateUser(username,password);

    return res.status(200)
        .send({
            message: "User updated succesfully",
            userId: userid
        });
});
 

module.exports.router = router;
