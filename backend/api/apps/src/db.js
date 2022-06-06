const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

/**
 * Funtion to get the user from the database
 * @param {*} username The users name
 * @param {*} password The users password
 * @returns user data
 */
async function getUser(userName, password){
    const user = await prisma.users.findFirst({
        where: {
            username: userName
        }
    })

    if( user == null ){
        return { 
            message: "Invalid Username",
            user: null
        };
    }

    if(user.password != password){
        return { 
            message: "Invalid Password",
            user: null
        };
    }

    return { 
        message: "User logged in successfully",
        user: user
    };
}

/**
 * Function to add user to the database
 * @param {*} username the username
 * @param {*} password the user password
 * @param {*} firstname the firstname
 * @param {*} lastname the lastname
 * @param {*} isBusiness the business
 * @param {*} email the email
 * @returns the the user data
 */
async function addUser(username, password, firstname, lastname, isBusiness, email){
    const user = await prisma.users.create({
        data:{
            username: username,
            password: password,
            lastname: lastname,
            firstname: firstname,
            isBusiness: isBusiness,
            email: email
        }
    })

    //TODO validate user added correctly

    return { 
        message: "User added successfully",
        user: user
    };
}

/**
 * Funtion to delete the user from the database
 * @param {*} userId The users Id
 * @returns user data
 */
 async function deleteUser(userId){
    const user = await prisma.users.delete({
        where: {
            id: userId
        }
    })

    //TODO validate user deleted correctly

    return { 
        message: "User deleted successfully",
        user: user
    };
}

/**
 * Funtion to delete the user from the database
 * @param {*} userId The users id
 * @param {*} data The data that needs to be updated
 * @returns userid
 */
 async function updateUser(userId,data){
    const user = await prisma.users.update({
        where: {
            id: userId
        },
        data: data
    })

    //TODO validate user deleted correctly

    return { 
        message: "User updated successfully",
        user: user
    };
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
