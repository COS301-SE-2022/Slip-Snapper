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
async function getUser(username, password){
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

/**
 * Funtion to get the item from the database
 * @param {*} userid The users id
 * @param {*} itemid The item id
 * @returns userid
 */
 async function getItem(userid, itemid){
    //query to add user here

    const userId = 1;

    return userId;
}

/**
 * Funtion to add the item to the database
 * @param {*} userid The users id
 * @param {*} itemid The item id
 * @returns userid
 */
 async function addItem(userid, itemid){
    //query to add user here

    const userId = 1;

    return userId;
}

/**
 * Funtion to delete the item from the database
 * @param {*} userid The users id
 * @param {*} itemid The item id
 * @returns userid
 */
 async function deleteItem(userid, itemid){
    //query to add user here

    const userId = 1;

    return userId;
}

/**
 * Funtion to update the item in the database
 * @param {*} userid The users id
 * @param {*} itemid The item id
 * @returns userid
 */
 async function updateItem(userid, itemid){
    //query to add user here

    const userId = 1;

    return userId;
}

module.exports = {
    getUser,
    addUser,
    deleteUser,
    updateUser,
    getItem,
    addItem,
    deleteItem,
    updateItem
}
