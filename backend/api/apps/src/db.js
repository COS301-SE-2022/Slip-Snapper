const { Pool } = require('pg')

const connection = new Pool({
    user: "",
    database: "",
    password: "",
    host: "",
    port: 0
})

/**
 * Funtion to get the user from the database
 * @param {*} username The users name
 * @param {*} password The users password
 * @returns userid
 */
function getUser(username, password){
    //get user from db
    const userid = 1;

    return userid;
}

/**
 * Funtion to add the user to the database
 * @param {*} username The users name
 * @param {*} password The users password
 * @returns userid
 */
async function addUser(username, password){
    //query to add user here

    const userid = 1;

    return userid;
}

/**
 * Funtion to delete the user from the database
 * @param {*} username The users name
 * @param {*} password The users password
 * @returns userid
 */
 async function deleteUser(username, password){
    //query to add user here

    const userid = 1;

    return userid;
}

/**
 * Funtion to delete the user from the database
 * @param {*} username The users name
 * @param {*} password The users password
 * @returns userid
 */
 async function updateUser(username, password){
    //query to add user here

    const userid = 1;

    return userid;
}

module.exports = {
    getUser,
    addUser,
    deleteUser,
    updateUser
}
