const { Pool } = require('pg')

const connection = new Pool({
    user: "",
    database: "",
    password: "",
    host: "",
    port: 0
})

function getUser(username){
    //get user from db
}

/**
 * Funtion to add the user to the database
 * @param {*} username The users name
 * @param {*} password The users password
 */
async function addUser(username, password){
    //query to add user here

    const userid = 1;

    return userid;
}

function deleteUser(username){
    //delete user from db
}

module.exports = {
    getUser,
    addUser,
    deleteUser
}
