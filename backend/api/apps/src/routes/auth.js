const router = require("express").Router();
const bcrypt = require('bcrypt');

/**
 * Add a user
 * Adds a user with an Name, Password
 */
router.post('/signup', async (req, res) => {
    //TODO add input checking
    let { firstname, lastname, username, password, email } = req.body;

    /**
     * general input validation
     */
    if (
        (firstname == null || lastname == null || username == null || password == null || email == null) ||
        (typeof (firstname) != 'string') ||
        (typeof (lastname) != 'string') ||
        (typeof (username) != 'string') ||
        (typeof (password) != 'string') ||
        (typeof (email) != 'string')
    ) {
        return res.status(200)
            .send({
                message: "Error Creating User",
            });
    }

    /**
     * check that the password is minimum eight characters, 
     * at least one uppercase letter, one lowercase letter,
     * one number and one special character:
     */
    let strongPasswordChecker = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;

    if (!password.match(strongPasswordChecker)) {
        return res.status(200)
            .send({
                message: "Error Creating User",
            });
    }
    /**
     * email format validation
     */
    let emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!email.match(emailformat)) {
        return res.status(200)
            .send({
                message: "Error Creating User",
            });
    }
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashed = bcrypt.hashSync(password, salt);

    const result = await req.app.get('db').addUser(username, hashed, firstname, lastname, email);
    const token = await req.app.get('token').generateToken(result.token);

    const path = `${username}/`
    const bucket = await req.app.get('bucket').createFolder(path)

    //TODO checking for errors

    return res.status(200)
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
router.post('/login', async (req, res) => {
    //TODO add input checking
    let { username, password } = req.body;
    /**
     * general input validation
     */
    if (
        (username == null || password == null) ||
        (typeof (username) != 'string') ||
        (typeof (password) != 'string')
    ) {
        return res.status(200)
            .send({
                message: "Error validating user Details",
            });
    }

    const result = await req.app.get('db').getUser(username);
    if (result.token == null || result.user == null || !bcrypt.compareSync(password, result.password)) {
        return res.status(200)
            .send({
                message: "Error validating user Details",
                userData: null,
                token: "",
            });
    }
    //TODO checking for errors

    if (result.token != "") {
        result.token = await req.app.get('token').generateToken(result.token)
    }

    return res.status(200)
        .send({
            message: result.message,
            userData: result.user,
            token: result.token,
        });
});

/**
 * Delete a user
 * Uses the user ID to delete the user
 */
router.delete('', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const tokenVerified = await req.app.get('token').verifyToken(token);

    if (tokenVerified === "Error") {
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

module.exports.router = router;
