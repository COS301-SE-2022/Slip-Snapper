const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

/**
 * Funtion to get the user from the database
 * @param {*} username The users name
 * @param {*} password The users password
 * @returns user data
 */
async function getUser(userName, password){
    const user = await prisma.user.findFirst({
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
async function addUser(username, password, firstname, lastname){
    const user = await prisma.user.create({
        data:{
            username: username,
            password: password,
            lastname: lastname,
            firstname: firstname,
            weeklyBudget: 0,
            monthlyBudget: 0
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
    const user = await prisma.user.delete({
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
    const user = await prisma.user.update({
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
 * @param {*} userId The users id
 * @returns userid
 */
async function getItem(userId){
    const items = await prisma.slip.findMany({
        where: {
            usersId: userId
        },
        select: {
            items : {
                select:{
                    itemPrice: true,
                    itemQuantity: true,
                    data: true
                }
            },
            location: true,
            transactionDate: true,
            total: true
        }
    })

    if( items == null ){
        return { 
            message: "No items associated with the user",
            numItems: 0,
            items: []
        };
    }

    let itemList = [];
    var i = 1;
    for(var itemL of items){
        let location = itemL.location;
        let date = itemL.transactionDate;

        for(var it of itemL.items){
            itemList.push({
                id: i++,
                itemId: it.id,
                itemName: it.data.item,
                type: it.data.itemType,
                quantity: it.itemQuantity,
                price: it.itemPrice,
                location: location,
                date: date
            })
        }
    }

    return { 
        message: "All associated items retrieved",
        numItems: i,
        itemList: itemList
    };
}

/**
 * Funtion to get the item from the database
 * @param {*} userid The users id
 * @param {*} start The begginning of time frame
 * @param {*} end The end of time frame
 * @returns items
 */
async function getItemsReport(userid, start, end){
    const items = await prisma.slip.findMany({
        where: {
            usersId: userid,
            // transactionDate: {
            //     gte: start,
            //     lt:  end
            //   } 
        },
        select: {
            items : {
                select:{
                    itemPrice: true,
                    itemQuantity: true,
                    data: true
                }
            },
            location: true,
            transactionDate: true,
            total: true
        }
    })

    if( items == null ){
        return { 
            message: "No items associated with the user",
            numItems: 0,
            items: []
        };
    }

    let itemList = [];
    var i = 1;
    for(var itemL of items){
        let location = itemL.location;
        let date = itemL.transactionDate;

        for(var it of itemL.items){
            itemList.push({
                itemName: it.data.item,
                type: it.data.itemType,
                quantity: it.itemQuantity,
                price: it.itemPrice,
                location: location,
                date: date
            })
            i++;
        }
    }

    return { 
        message: "All associated items retrieved",
        numItems: i,
        itemList: itemList
    };
}

/**
 * Function to add item to the database
 * @param {*} userid the userid
 * @param {*} location the location
 * @param {*} total the total
 * @param {*} date the location
 * @param {*} data the items to add
 * @returns 
 */
async function addItem(userid, location, date, total, data){
    const slip = await prisma.slip.create({
        data:{
            location: location,
            total: total,
            usersId: userid,
            transactionDate: date
        }
    })

    if( slip == null ){
        return { 
            message: "Slip could not be created",
            numItems: 0,
            items: []
        };
    }

    const dataItems = await prisma.dataItem.findMany({

    })

    let additions = []

    for (let item of data){
        item.slipId = slip.id;
        let matched = false
        for(var dataItem of dataItems){
            if( item.item == dataItem.item){
                item.dataId = dataItem.id;
                matched = true;
            }
        }

        if(!matched){
            const dat = await prisma.dataItem.create({
                data: {
                    item: item.item,
                    itemType: item.itemType,
                }
            })
            item.dataId = dat.id;
        }

        additions.push({
            slipId: slip.id,
            itemPrice: item.itemPrice,
            itemQuantity: item.itemQuantity,
            dataId : item.dataId
        })
    }

    const items = await prisma.item.createMany({
        data: additions
    });

    if( items == null ){
        return { 
            message: "Item/s could not be added",
            numItems: 0,
        };
    }

    return { 
        message: "Item/s has been added",
        numItems: items.count,
    };
}

/**
 * Funtion to delete the item from the database
 * @param {*} itemId The item id
 * @returns userid
 */
async function deleteItem(itemId){
    const item = await prisma.item.delete({
        where:{
            id: itemId
        }
    });

    return { 
        message: "Item has been deleted",
        item: item,
    };
}

/**
 * Function to update item in the database
 * @param {*} itemId the userid
 * @param {*} data the data to update
 * @returns 
 */
async function updateItem(itemId, dataA, dataB){
    var item;
    if(dataA != {}){
        item = await prisma.item.update({
            where: {
                id: itemId
            },
            data: dataA
        })
    }

    if(dataB != {}){
        let data = await prisma.item.findFirst({
            where: {
                id: itemId
            },
        })

        item = await prisma.dataItem.update({
            where: {
                id: data.dataId
            },
            data: dataB
        })
    }
    
    if( item == null ){
        return { 
            message: "No item associated with the user",
            numItems: 0,
            items: []
        };
    }
    
    return { 
        message: "Item has been updated successfully",
        item: item
    };
}

/**
 * Funtion to get the user budgets from the database
 * @param {*} userId The users name
 * @returns user data
 */
async function getUserBudgets( userId ){
    const user = await prisma.user.findFirst({
        where: {
            id: userId
        }
    })

    const items = await prisma.slip.findMany({
        where: {
            usersId: userId
            // transactionDate: {
            //     gte: start,
            //     lt:  end
            //   }
        },
        select:{
            items : {
                select:{
                    itemPrice: true,
                    itemQuantity: true,
                    data: true
                }
            },
            transactionDate: true,
        }
    })

    let weeklyTotal = 0;
    let monthlyTotal = 0;
    // var date = new Date();
    // date.setDate(date.getDate() - 7);
    // let week = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()

    // date = new Date();
    // date.setDate(date.getMonth() - 1);
    // let month = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()

    for(var itemL of items){
        //let tDate = transactionDate;
        
        for(var it of itemL.items){
            //if(tDate > week){
                weeklyTotal+= it.itemPrice;
            //}

            //if(tDate > month){
                monthlyTotal+= it.itemPrice;
            //}
        }
    }

    return { 
        message: "User budget retrieved",
        weeklyTotal: weeklyTotal,
        weekly: user.weeklyBudget,
        monthlyTotal: monthlyTotal,
        monthly: user.monthlyBudget
    };
}

/**
 * Funtion to set the user budgets in the database
 * @param {*} userId The users name
 * @param {*} data the data to be added
 * @returns user data
 */
async function setUserBudgets( userId, data ){
    const user = await prisma.user.update({
        where: {
            id: userId
        },
        data: data
    })

    return { 
        message: "User budget set",
        weekly: user.weeklyBudget,
        monthly: user.monthlyBudget
    };
}

/**
 * Funtion to get the user statistics from the database
 * @param {*} userId The users name
 * @returns user data
 */
 async function getUserStats( userId ){
    const user = await prisma.users.update({
        where: {
            id: userId
        },
        //data: data
    })

    return { 
        message: "User budget set",
        weekly: user,
        monthly: user
    };
}

module.exports = {
    getUser,
    addUser,
    deleteUser,
    updateUser,
    getItem,
    addItem,
    deleteItem,
    updateItem,
    getItemsReport,
    getUserBudgets,
    setUserBudgets,
    getUserStats
}
