const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// async function getAllUsers() {
//     const allUsers = await prisma.users.findMany()
//     //console.log(allUsers)
//     return allUsers;
// }

/**
 * Funtion to get the user from the database
 * @param {*} username The users name
 * @param {*} password The users password
 * @returns userid
 */
async function getUser(userName, password){
    //get user from db
    const user = await prisma.users.findUnique({
        where: {
            username: userName
        }
    })

    if( user == null ){
        return { message: "Invalid Username" };
    }

    if(user.password != password){
        return { message: "Invalid Password" };
    }

    return { 
        message: "User logged in successfully",
        user: user
    };
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
 async function getItem(userid){
    //query to add user here

    const userId = 1;

    return userId;
}

/**
 * Function to add item to the database
 * @param {*} userid the userid
 * @param {*} itemname the item name
 * @param {*} itemprice the item price
 * @param {*} itemquantity the item quantity
 * @param {*} itemtype the item type
 * @param {*} location the location
 * @param {*} date the date
 * @returns 
 */
 async function addItem(userid,itemname,itemprice,itemquantity,itemtype,location,date){
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
 * Function to update item in the database
 * @param {*} userid the userid
 * @param {*} itemname the item name
 * @param {*} itemprice the item price
 * @param {*} itemquantity the item quantity
 * @param {*} itemtype the item type
 * @param {*} location the location
 * @param {*} date the date
 * @returns 
 */
 async function updateItem(userid,itemname,itemprice,itemquantity,itemtype,location,date){
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
