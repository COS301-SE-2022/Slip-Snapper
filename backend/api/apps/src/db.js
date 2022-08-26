const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

/**
 * Funtion to get the user from the database
 * @param {*} username (String) The users name
 * @param {*} password (String) The users password
 * @returns (JSON Object) Contains a message and the user object || null
 */
async function getUser(userName, password) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                username: userName
            }
        })

        if (user == null) {
            return {
                message: "Invalid Username",
                user: null
            };
        }

        if (user.password != password) {
            return {
                message: "Invalid Password",
                user: null
            };
        }

        return {
            message: "User logged in successfully",
            user: {
                id: user.id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                weeklyBudget: user.weeklyBudget,
                monthlyBudget: user.monthlyBudget,
                budgets: user.budgets
            }
        };
    }
    catch (error) {
        return {
            message: "Error validating user Details",
            user: null
        };
    }

}

/**
 * Function to add user to the database
 * @param {*} username (String) the username
 * @param {*} password (String) the user password
 * @param {*} firstname (String) the firstname
 * @param {*} lastname (String) the lastname
 * @returns (JSON Object) Contains a message and the user object || null
 */
async function addUser(username, password, firstname, lastname) {
    try {

        let budgetObject = {
            FoodBudget: {
                active: false,
                timeFrame: false,
                weeklyValue: 0,
                monthlyValue: 0
            },
            FashionBudget: {
                active: false,
                timeFrame: false,
                weeklyValue: 0,
                monthlyValue: 0
            },
            ElectronicsBudget: {
                active: false,
                timeFrame: false,
                weeklyValue: 0,
                monthlyValue: 0
            },
            HouseholdBudget: {
                active: false,
                timeFrame: false,
                weeklyValue: 0,
                monthlyValue: 0
            },
            OtherBudget: {
                active: false,
                timeFrame: false,
                weeklyValue: 0,
                monthlyValue: 0
            }
        }
        let budgetObjectString = JSON.stringify(budgetObject)
        const user = await prisma.user.create({
            data: {
                username: username,
                password: password,
                lastname: lastname,
                firstname: firstname,
                weeklyBudget: 0,
                monthlyBudget: 0,
                budgets: JSON.parse(budgetObjectString)
            }
        })

        if (user == null) {
            return {
                message: "User failed to be added",
                user: null
            };
        }

        //TODO return specific aspects of user and not all

        return {
            message: "User added successfully",
            user: user
        };
    }
    catch (error) {
        return {
            message: "Error Creating User",
            user: null
        };
    }

}

/**
 * Funtion to delete the user from the database
 * @param {*} userId (Integer) The users Id
 * @returns (JSON Object) Contains a message and the user object || null
 */
async function deleteUser(userId) {
    try {
        const user = await prisma.user.delete({
            where: {
                id: userId
            }
        })

        if (user == null) {
            return {
                message: "User could not be deleted",
                user: null
            };
        }

        return {
            message: "User deleted successfully",
            user: user
        };
    } catch (error) {
        return {
            message: "Error removing user",
            user: null
        };
    }
}

/**
 * Funtion to delete the user from the database
 * @param {*} userId (Integer) The users id
 * @param {*} data (JSON Object) The data that needs to be updated
 * @returns (JSON Object) Contains a message and the user object || null
 */
async function updateUser(userId, data) {
    try {
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: data
        })

        let message = "User updated successfully"
        if (user == null) {
            message = "User could not be updated"
        }

        //TODO return certain aspects of user data

        return {
            message: message,
            user: user
        };
    } catch (error) {
        return {
            message: "Error updating User",
            user: null
        };
    }
}

/**
 * Funtion to get the item from the database
 * @param {*} userId (Integer) The users id
 * @returns (JSON Object) Contains a message, the number of items and an array of Items
 */
//****************************************************************** */
//Start changing from here
//******************************************************************** */
async function getItem(userId) {
    try {
        const items = await prisma.slip.findMany({
            where: {
                usersId: userId
            },
            select: {
                location: true,
                transactionDate: true,
                total: true,
                items: {
                    include: {
                        data: true
                    }
                }
            }
        })



        if (items == null) {
            return {
                message: "No items associated with the user",
                numItems: 0,
                items: []
            };
        }

        let itemList = [];
        let i = 1;
        for (const slip of items) {
            for (const item of slip.items) {
                if (slip.items.length > 0) {
                    itemList.push({
                        id: i++,
                        itemId: item.id,
                        itemName: item.data[0].item,
                        type: item.data[0].itemType,
                        quantity: item.itemQuantity,
                        price: item.itemPrice,
                        location: slip.location,
                        date: slip.transactionDate
                    })
                }
            }
        }
        return {
            message: "All associated items retrieved",
            numItems: i,
            itemList: itemList
        };
    }
    catch (error) {
        return {
            message: "Error retrieving items",
            numItems: 0,
            itemList: []
        };
    }
}

/**
 * Funtion to get the item from the database
 * @param {*} userid (Integer) The users id
 * @param {*} start The begginning of time frame
 * @param {*} end The end of time frame
 * @returns items
 */
async function getItemsReport(userid, start, end) {
    try {
        const items = await prisma.slip.findMany({
            where: {
                usersId: userid,
                // transactionDate: {
                //     gte: start,
                //     lt:  end
                //   } 
            },
            select: {
                items: {
                    select: {
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

        if (items == null) {
            return {
                message: "No items associated with the user",
                numItems: 0,
                items: []
            };
        }

        let itemList = [];
        var i = 1;
        for (var itemL of items) {
            let location = itemL.location;
            let date = itemL.transactionDate;

            for (var it of itemL.items) {
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
    catch (error) {
        return {
            message: "Error retrieving Items",
            numItems: 0,
            itemList: []
        };
    }

}

/**
 * Function to add item to the database
 * @param {*} userid the user id
 * @param {*} location the location
 * @param {*} total the total
 * @param {*} date the location
 * @param {*} data the items to add
 * @returns 
 */
async function addItem(userid, location, date, total, data) {
    try {
       

        const slip = await prisma.slip.create({
            data: {
                location: location,
                total: total,
                usersId: userid,
                transactionDate: date,
            }
        })

        if (slip == null) {
            return {
                message: "Slip could not be created",
                numItems: 0,
                items: []
            };
        }

        const dataItems = await prisma.dataItem.findMany({})

        let additions = []
        let dataIds
        for (let item of data) {
            item.slipId = slip.id;
            let matched = false

            for (const dataItem of dataItems) {
                if (item.item == dataItem.item) {
                    dataIds = dataItem.id;
                    matched = true;
                }
            }

            if (!matched) {
                const dat = await prisma.dataItem.create({
                    data: {
                        item: item.item,
                        itemType: item.itemType,
                    }
                })
                dataIds = dat.id;
            }
            let newItem = await prisma.item.create({
                data: {
                    Slip: {
                        connect: { id: slip.id }
                    },
                    itemPrice: parseFloat(item.itemPrice),
                    itemQuantity: item.itemQuantity,
                    data: {
                        connect: {
                            id: dataIds
                        }
                    }
                }
            })

        }



        if (items == null) {
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
    catch (error) {
        return {
            message: "Error creating Slip nad associated Item/s",
            numItems: 0,
        };
    }

}

/**
 * Function to insert items that have been added to a slip
 * @param {*} slipId The slip ID
 * @param {*} insertItems The items that need to be inserted
 * @returns json object with a message 
 */
async function insertAllItems(slipId, insertItems) {
    try {
        let dataIds
        const dataItems = await prisma.dataItem.findMany({})

        for (let item of insertItems) {
            let matched = false

            for (const dataItem of dataItems) {
                if (item.data[0].item == dataItem.item) {
                    dataIds = dataItem.id;
                    matched = true;
                    break;
                }
            }

            if (!matched) {
                const dat = await prisma.dataItem.create({
                    data: {
                        item: item.data[0].item,
                        itemType: item.data[0].itemType,
                    }
                })
                dataIds = dat.id;
            }
            let newItem = await prisma.item.create({
                data: {
                    Slip: {
                        connect: { id: slipId }
                    },
                    itemPrice: parseFloat(item.itemPrice),
                    itemQuantity: item.itemQuantity,
                    data: {
                        connect: {
                            id: dataIds
                        }
                    }
                }
            })
        }
        return {
            message: "All items added"
        }
    }
    catch (error) {
        return {
            message: "Error adding Item/s"
        }
    }

}

/**
 * Funtion to delete the item from the database
 * @param {*} itemId The item id
 * @returns userid
 */

async function deleteItem(itemId) {
    try {
        const item = await prisma.item.delete({
            where: {
                id: itemId
            }
        });

        return {
            message: "Item has been deleted",
            item: item,
        };
    }
    catch (error) {
        return {
            message: "Error Deleting Item",
            item: null,
        };
    }
}
/**
 * Funtion to delete multiple a slip from the database
 * @param {*} itemId The slip id array
 * @returns 
 */
async function deleteSlip(slipId) {
    try {
        const slip = await prisma.slip.findFirst({
            where: {
                id: slipId
            },
            include: {
                items: {
                    select: {
                        id: true
                    }
                }
            }
        })
        let itemArray = []
        for (const itemIds of slip.items) {
            itemArray.push(itemIds.id)
        }

        const item = await prisma.item.deleteMany({
            where: {
                id: {
                    in: itemArray
                }
            }
        });
        slip = await prisma.slip.delete({
            where: {
                id: slipId
            }
        })

        const transaction = await prisma.$transaction([item, slip])
        return {
            message: "Slip has been deleted",
            slip: slip,
        };
    } catch (error) {
        return {
            message: "Error Deleting slip",
            slip: null,
        };
    }
}
/**
 * Funtion to delete multiple items from the database
 * @param {*} itemId The item id array
 * @returns 
 */
async function deleteManyItems(itemIdArray) {
    try {
        const item = await prisma.item.deleteMany({
            where: {
                id: {
                    in: itemIdArray
                }
            }
        });

        return {
            message: "Items have been deleted",
            itemIdArray: item
        };
    }
    catch (error) {
        return {
            message: "Error Deleting Item/s",
            itemIdArray: []
        };
    }

}

/**
 * Function to update item in the database
 * @param {*} itemId the item id
 * @param {*} dataA the data to update
 * @param {*} dataB the data to update
 * @returns 
 */
async function updateItem(itemId, dataA, dataB) {
    try {
        let item;
        if (dataA != {}) {
            item = await prisma.item.update({
                where: {
                    id: itemId
                },
                data: dataA
            })
        }

        if (dataB != {}) {
            let data = await prisma.item.findFirst({
                where: {
                    id: itemId
                },
                include: {
                    data: true
                }
            })

            //to avoid duplicates in the dataItem table
            let search = await prisma.dataItem.findFirst({
                where: {
                    item: dataB.item,
                    itemType: dataB.itemType
                }
            })
            if (search == null) {

                const dataItem = await prisma.dataItem.create({
                    data: {
                        item: dataB.item,
                        itemType: dataB.itemType,
                        items: {
                            connect: { id: itemId },
                        },
                    },
                    include: {
                        items: true, // Include all posts in the returned object
                    },
                })
                item = await prisma.item.update({
                    where: {
                        id: itemId
                    },
                    data: {
                        data: {
                            disconnect: {
                                id: data.data[0].id
                            },
                            connect: {
                                id: dataItem.id
                            },

                        }
                    }

                })

            }
            else {
                item = await prisma.item.upsert({
                    where: {
                        id: itemId
                    },
                    create: {
                        itemPrice: dataA.itemPrice,
                        itemQuantity: dataA.itemQuantity,
                        data: {
                            connectOrCreate: {
                                create: {
                                    item: dataB.item,
                                    itemType: dataB.itemType
                                },
                                where: {
                                    id: search.id
                                }
                            }
                        }
                    },
                    update: {
                        data: {
                            connectOrCreate: {
                                create: {
                                    item: dataB.item,
                                    itemType: dataB.itemType
                                },
                                where: {
                                    id: search.id
                                }
                            }, disconnect: {
                                id: data.data[0].id
                            },
                            connect: {
                                id: search.id
                            }
                        }
                    }
                })
            }
        }
        if (item == null) {
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
    catch (error) {

        return {

            message: "Error updating Item",
            item: null
        };
    }

}

//TODO improve this function
async function updateAllItems(updateItems) {
    try {
        for (const item of updateItems) {
            if (item.id !== undefined) {
                let dataA = {}
                let dataB = {}

                dataA.itemPrice = parseFloat(item.itemPrice);
                dataA.itemQuantity = item.itemQuantity;

                dataB.item = item.data[0].item;
                dataB.itemType = item.data[0].itemType;

                await updateItem(item.id, dataA, dataB)
            }
        }

        return {
            message: "All items updated"
        }
    }
    catch (error) {
        return {
            message: "Error updating items"
        }
    }

}

/**
 * Function to update the slip and all relevant items
 */
async function updateSlip(userId, slipData, insertItems, updateItems, removeItems) {
    try {
        const slip = await updateSlips(slipData[5], slipData[1], slipData[4], slipData[1])
        const update = await updateAllItems(updateItems)
        const remove = await deleteManyItems(removeItems)
        const insert = await insertAllItems(slipData[5], insertItems)

        return {
            message: slip.message
        }
    }
    catch (error) {
        return {
            message: "Error updating Slip"
        }
    }
}

/**
 * Function to update the slip in the database
 * @param {*} slipId the slip id
 * @param {*} editLocation the new location
 * @param {*} editTotal the new total
 * @param {*} editDate the new date
 * @returns a success message
 */
async function updateSlips(slipId, editLocation, editTotal, editDate) {
    try {
        const updateSlip = await prisma.slip.update({
            where: {
                id: slipId
            },
            data: {
                location: editLocation,
                total: editTotal,
                // transactionDate: editDate
            },
        })

        return {
            message: "Slip succussfully updated"
        }
    }
    catch (error) {
        return {
            message: "Error updating the slip"
        }
    }
}

/**
 * Funtion to set the user budgets in the database
 * @param {*} userId The users id
 * @param {*} data the data to be added
 * @returns user data
 */
async function setUserBudgets(userId, data) {
    try {
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
    catch (error) {
        return {
            message: "Error updating the budget",
            weekly: 0,
            monthly: 0
        };
    }

}

/**
 * Funtion to set the user weekly and monthly category budgets in the database
 * @param {*} userId The users id
 * @param {*} data the data to be added
 * @returns user data
 */
async function updateWeeklyMonthlyCategoryBudgets(userId, data) {
    try {
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                budgets: data
            }
        })

        return {
            message: "User budget/s set",
        };
    }
    catch (error) {
        return {
            message: "Error updating the budget/s",
        };
    }

}

/**
 * Funtion to get the user weekly and monthly category budgets from the database
 * @param {*} userId The users id
 * @returns budget json object
 */
async function getWeeklyMonthlyCategoryBudgets(userId) {
    try {
        const budgetObject = await prisma.user.findFirst({
            where: {
                id: userId
            },
            select: {
                budgets: true
            }
        })

        return {
            message: "User budget/s retrieved",
            budgets: budgetObject
        };
    }
    catch (error) {
        return {
            message: "Error retrieving the budget/s",
        };
    }
}

/**
 * Funtion to get the user statistics from the database
 * @param {*} userId The users id
 * @returns user data
 */
async function getUserStats(userId) {
    try {
        let store = await getFavouriteStore(userId);
        let expItem = await getMostExpensiveItem(userId);
        let mostStore = await getMostSpentATStore(userId);
        let week = await getWeeklyExpenditure(userId);
        let month = await getMonthlyExpenditure(userId);
        let favouriteCategory = await getFavouriteCategory(userId);

        return {
            message: "User statistics retrieved",
            storeDetails: store,
            expensiveItem: expItem,
            mostAtStore: mostStore,
            week: week,
            month: month,
            category: favouriteCategory
        };
    }
    catch (error) {
        return {
            message: "Error retrieving user stats",
            storeDetails: {},
            expensiveItem: {},
            mostAtStore: {},
            week: {},
            month: {},
            category: {}
        };
    }

}

/**
 * Function to get the most spend on a single category
 * @param {*} userid the users id
 * @returns the most spent on a category and its amount
 */
async function getFavouriteCategory(userid) {
    try {
        const items = await prisma.slip.findMany({
            where: {
                usersId: userid
            },
            select: {
                items: {
                    select: {
                        itemPrice: true,
                        data: {
                            select: {
                                itemType: true
                            }
                        }
                    }
                }
            },

        })

        let types = {
            cat: [],
            catNums: [],
            catPrices: []
        }
        for (var item of items) {
            for (var sub of item.items) {
                if (!types.cat.includes(sub.data[0].itemType)) {
                    types.cat.push(sub.data[0].itemType)
                    types.catNums.push(0)
                    types.catPrices.push(0)
                }
                var pos = types.cat.indexOf(sub.data[0].itemType)
                types.catNums[pos]++;
                types.catPrices[pos] += sub.itemPrice;
            }
        }

        const max = Math.max(...types.catNums);
        const index = types.catNums.indexOf(max);

        types.catPrices[index] = Math.round((types.catPrices[index] + Number.EPSILON) * 100) / 100

        return {
            category: types.cat[index],
            amount: types.catPrices[index]
        }
    }
    catch (error) {
        return {
            category: "",
            amount: 0
        }
    }

}

/**
 * Function to get the most frequent store for a user
 * @param {*} userid The users Id
 * @returns json object with the user favourite store
 */
async function getFavouriteStore(userid) {
    try {
        const favouriteStore = await prisma.slip.groupBy({
            by: ['location'],
            where: {
                usersId: userid
            },
            _count: {
                location: true
            },
            take: 1,
            orderBy: {
                _count: {
                    location: 'desc'
                }
            }
        })

        let storeLocation = ""
        for (const store of favouriteStore) {
            storeLocation = store.location
        }

        const slips = await prisma.slip.findMany({
            where: {
                usersId: userid,
                location: storeLocation
            }
        })

        return {
            storeLocation: storeLocation,
            slips: slips
        }
    }
    catch (error) {
        return {
            storeLocation: "",
            slips: []
        }
    }

}

/**
 * Function to get the most expensivve item for a user
 * @param {*} userid The users Id
 * @returns json object with the user most expensive item
 */
async function getMostExpensiveItem(userid) {
    try {
        const mostExpensive = await prisma.slip.findMany({
            where: {
                usersId: {
                    in: userid
                },
            },
            select: {
                transactionDate: true,
                items: {
                    select: {
                        itemPrice: true,
                        data: {
                            select: {
                                item: true
                            }
                        }
                    },
                    orderBy: {
                        itemPrice: "desc"
                    },
                },
            },
        })
        let expensiveItem = 0;
        let dataItem = ""
        for (var itemL of mostExpensive) {
            for (var it of itemL.items) {
                if (it.itemPrice > expensiveItem) {
                    expensiveItem = it.itemPrice;
                    dataItem = it.data[0].item;
                }
            }
        }

        return {
            dataItem: dataItem,
            expensiveItem: expensiveItem
        }
    }
    catch (error) {
        return {
            dataItem: "",
            expensiveItem: 0
        }
    }

}

/**
 * Function to get the most spent at a store for a user
 * @param {*} userid The users Id
 * @returns json object with the user most spent at store
 */
async function getMostSpentATStore(userid) {
    try {
        const mostExpensive = await prisma.slip.findMany({
            where: {
                usersId: userid
            },
            select: {
                location: true,
                total: true
            }
        })

        let mostspent = 0;
        let store = "";
        for (const itemL of mostExpensive) {
            if (itemL.total > mostspent) {
                mostspent = itemL.total;
                store = itemL.location;
            }
        }

        return {
            mostspent: mostspent,
            store: store
        }
    }
    catch (error) {
        return {
            mostspent: 0,
            store: ""
        }
    }

}

/**
 * Function to get the weekly expenditure for a user
 * @param {*} userid The users Id
 * @returns json object with the user weekly expenditure
 */
async function getWeeklyExpenditure(userid) {
    try {
        const date1 = new Date()
        const lastweek = date1.setDate(date1.getDate() - 7);
        const date2 = new Date()
        const otherWeek = date2.setDate(date2.getDate() - 14)

        const weeklyExpenditure = await prisma.slip.findMany({
            where: {
                usersId: userid,
            },
            select: {
                transactionDate: true,
                total: true
            }
        })

        let recentWeek = 0;
        let previousWeek = 0;
        for (const weekly of weeklyExpenditure) {
            if (weekly.transactionDate.toISOString() >= date1.toISOString()) {
                recentWeek += weekly.total;
            }
            else if (weekly.transactionDate.toISOString() >= date2.toISOString()) {
                previousWeek += weekly.total;
            }
        }

        return {
            recentWeek: recentWeek,
            previousWeek: recentMonth
        }
    }
    catch (error) {
        return {
            recentWeek: 0,
            previousWeek: 0
        }
    }

}

/**
 * Function to get the monthly expenditure for a user
 * @param {*} userid The users Id
 * @returns json object with the user monthly expenditure
 */
async function getMonthlyExpenditure(userid) {
    try {
        const date1 = new Date()
        const lastMonth = date1.setDate(date1.getDate() - 4 * 7);
        const date2 = new Date()
        const otherMonth = date2.setDate(date2.getDate() - 8 * 7)

        const MonthlyExpenditure = await prisma.slip.findMany({
            where: {
                usersId: userid,
            },
            select: {
                transactionDate: true,
                total: true
            }
        })

        let recentMonth = 0;
        let previousMonth = 0;
        for (const weekly of MonthlyExpenditure) {
            if (weekly.transactionDate.toISOString() >= date1.toISOString()) {
                recentMonth += weekly.total;
            }
            else if (weekly.transactionDate.toISOString() >= date2.toISOString()) {
                previousMonth += weekly.total;
            }
        }

        return {
            recentMonth: recentMonth,
            previousMonth: previousMonth
        }
    }
    catch (error) {
        return {
            recentMonth: 0,
            previousMonth: 0
        }
    }
}

/**
 * Function to get the most spend on a single category
 * @returns The items in the database and their defined categories
 */
async function getDataItems() {
    try {
        const dataItems = await prisma.dataItem.findMany({})

        return {
            items: dataItems
        }
    }
    catch (error) {
        return {
            items: []
        }
    }

}

/**
 * Function to get the reports
 * @param {*} userId (Integer) The users id
 * @returns numreports which is the number of reports, reportsList which consists of the report id, report name and the date.
 */
async function getAllReports(userid) {
    try {
        const userReports = await prisma.reports.findMany({
            where: {
                usersId: userid
            },
            select: {
                id: true,
                reportName: true,
                generatedDate: true
            }
        })

        if (userReports == null) {
            return {
                numReports: 0,
                reportsList: []
            }
        }

        let numReports = 0
        let reportsList = []
        for (const report of userReports) {
            numReports++
            reportsList.push({
                reportId: report.id,
                reportName: report.reportName,
                reportDate: report.generatedDate
            })
        }
        return {
            message: "All user reports Retrieved",
            numReports: numReports,
            reportsList: reportsList
        }
    }
    catch (error) {
        return {
            message: "Error retrieving reports",
            numReports: 0,
            reportsList: []
        }
    }

}

/**
 * Function to get the daily, weekly and monthly reports
 * @param {*} userId (Integer) The users id
 * @returns daily/weekly/monthly ReportsList which consists of the report id, report name and the date, numReports which is the number of reports.
 */
async function getDailyWeeklyMonthlyReports(userid) {
    try {
        const date1 = new Date()
        const daily = date1.setDate(date1.getDate() - 1)
        const date2 = new Date()
        const weekly = date2.setDate(date1.getDate() - 7)
        const date3 = new Date()
        const monthly = date3.setDate(date1.getDate() - 30)

        const userReports = await prisma.reports.findMany({
            where: {
                usersId: userid
            },
            select: {
                id: true,
                reportName: true,
                generatedDate: true
            }
        })

        if (userReports == null) {
            return {
                numReports: 0,
                dailyReportsList: [],
                weeklyReportsList: [],
                monthlyReportsList: []
            }
        }

        let numReports = 0
        let dailyReportsList = []
        let weeklyReportsList = []
        let monthlyReportsList = []
        for (const report of userReports) {
            if (report.generatedDate.toISOString() >= date1.toISOString()) {
                numReports++
                dailyReportsList.push({
                    reportId: report.id,
                    reportName: report.reportName,
                    reportDate: report.generatedDate
                })
            }
            if (report.generatedDate.toISOString() >= date2.toISOString()) {
                numReports++
                weeklyReportsList.push({
                    reportId: report.id,
                    reportName: report.reportName,
                    reportDate: report.generatedDate
                })
            }
            if (report.generatedDate.toISOString() >= date3.toISOString()) {
                numReports++
                monthlyReportsList.push({
                    reportId: report.id,
                    reportName: report.reportName,
                    reportDate: report.generatedDate
                })
            }

        }
        return {
            numReports: numReports,
            dailyReportsList: dailyReportsList,
            weeklyReportsList: weeklyReportsList,
            monthlyReportsList: monthlyReportsList
        }
    }
    catch (error) {
        return {
            numReports: 0,
            dailyReportsList: [],
            weeklyReportsList: [],
            monthlyReportsList: []
        }
    }

}

/**
 * Function to get the most recent reports.
 * @param {*} userId (Integer) The users id.
 * @returns reportsList which consists of the report id, report name and the date.
 */
async function getRecentReports(userid) {
    try {
        const userReports = await prisma.Reports.findMany({
            where: {
                usersId: userid
            },
            select: {
                id: true,
                reportName: true,
                generatedDate: true
            },
            take: 5,
            orderBy: {
                generatedDate: 'desc'
            }
        })

        if (userReports == null) {
            return {
                message: "Recent Reports retrieved",
                reportsList: []
            }
        }

        let reportsList = []
        for (const report of userReports) {
            reportsList.push({
                reportId: report.id,
                reportName: report.reportName,
                reportDate: report.generatedDate
            })
        }

        return {
            message: "Recent Reports retrieved.",
            reportsList
        }
    }
    catch (error) {
        return {
            message: "Error retrieving reports",
            reportsList: []
        }
    }

}

/**
 * Function to create a report record in the Reports model.
 * @param {*} userId (Integer) The users id.
 * @returns null
 */
async function createReportRecord(userid, reportName, reportTotal) {
    try {
        const userReports = await prisma.reports.create({
            data: {
                usersId: userid,
                reportName: reportName
            }
        })

        return {
            message: "Report added Successfully"
        }
    }
    catch (error) {
        return {
            message: "Error adding report"
        }
    }

}

/**
* Function to delete a report record in the Reports model.
* @param {*} reportId (Integer) The record id.
* @returns null
*/
async function deleteReportRecord(reportid) {
    try {
        const userReports = await prisma.reports.delete({
            where: {
                id: reportid
            }
        })

        return {
            message: "Report deleted Successfully"
        }
    }
    catch (error) {
        return {
            message: "Error deleteing report"
        }
    }

}

/**
 * Function to return all the slips for a user
 * @param {*} userid The users Id
 * @returns json object with all the slips
 */
async function retrieveAllSlips(userid) {
    try {
        const allSlips = await prisma.slip.findMany({
            where: {
                usersId: userid
            },
            include: {
                items: {
                    include: {
                        data: true

                    }
                }
            }
        })

        return {
            message: "All slips retrieved",
            slips: allSlips
        }
    }
    catch (error) {
        return {
            message: "Error retrieving todays slips",
            slips: []
        }
    }

}
/**
 * Function to get all the statistics for home for today
 * @param {*} userid The user Id
 * @returns json object with the users statistics from today
 */
async function todaysReports(userid) {
    try {
        const date1 = new Date()
        const lastweek = date1.setDate(date1.getDate() - 1)
        const todaysReport = await prisma.slip.findMany({

            where: {
                usersId: userid,
                transactionDate: {
                    gte: date1
                }
            },
            select: {
                _count: {
                    select: {
                        items: true
                    }
                }
            }
        })

        let sum = 0
        let counter = 0
        for (const numItems in todaysReport) {
            sum += todaysReport.at(counter)._count.items
            counter++
        }

        const todaystotal = await prisma.slip.aggregate({
            where: {
                usersId: userid,
                transactionDate: {
                    gte: date1
                }
            },
            _sum: {
                total: true,
            },
        })

        return {
            message: "Today's Stats retrieved",
            sum: sum,
            todaystotal: todaystotal._sum.total
        }
    }
    catch (error) {
        return {
            message: "Error retrieving todays statistics",
            sum: 0,
            todaystotal: 0
        }
    }

}

/**
 * Function to get all data for the user Profile top half
 * @param {*} userId the users id
 * @returns json object with all the relevant data
 */
async function getUserProfile(userId) {
    try {
        let store = await getFavouriteStore(userId);
        let budget = await getUserBudgets(userId);
        let budgets = await getUserGeneralBudgets(userId);

        return {
            message: "User profile statistics retrieved",
            storeDetails: store,
            budget: budget,
            budgets: budgets
        };
    }
    catch (error) {
        return {
            message: "Error retrieving profile statistics",
            storeDetails: {},
            budget: {},
            budgets: {}
        };
    }

}

/**
 * Get all the budgets for the various categories
 * @param {*} userId The users Id
 * @param {*} start the start date for the period
 * @param {*} end the end date for the period
 * @returns json object with the user budgets
 */
async function getUserGeneralBudgets(userId, start, end) {

    try {
        const budgets = await prisma.user.findFirst({
            where: {
                id: userId
            },
            select: {
                budgets: true
            }
        })


        const items = await prisma.slip.findMany({
            where: {
                usersId: userId
            },
            select: {
                items: {
                    include: {
                        data: true
                    }
                },
                location: true,
                transactionDate: true,
                total: true
            }
        })


        // var date = new Date();
        // date.setDate(date.getDate() - 7);
        // let week = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()

        // date = new Date();
        // date.setDate(date.getMonth() - 1);
        // let month = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
        let totals = {
            Food: 0,
            Fashion: 0,
            Electronics: 0,
            houseHold: 0,
            Other: 0,
        }


        for (var itemL of items) {

            for (it of itemL.items) {

                if (it.data[0].itemType === 'food') {

                    totals.Food += it.itemPrice
                }

                if (it.data[0].itemType === 'fashion') {
                    totals.Fashion += it.itemPrice
                }

                if (it.data[0].itemType === 'Electronics') {
                    totals.Electronics += it.itemPrice
                }

                if (it.data[0].itemType === 'household') {
                    totals.houseHold += it.itemPrice
                }

                if (it.data[0].itemType === 'other') {
                    totals.Other += it.itemPrice
                }
            }
        }
        return {
            message: "User budgets retrieved",
            budgets: budgets,
            totals: totals
        };
    }
    catch (error) {
        return {
            message: "Error retrieving budgets",
            budgets: {},
            totals: {}
        };
    }

}

/**
 * Funtion to get the user budgets from the database
 * @param {*} userId The users id
 * @returns the user weekly or monthly budgets
 */
async function getUserBudgets(userId) {
    try {
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
        })

        let weeklyTotal = 0;
        let monthlyTotal = 0;
        // var date = new Date();
        // date.setDate(date.getDate() - 7);
        // let week = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()

        // date = new Date();
        // date.setDate(date.getMonth() - 1);
        // let month = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()

        for (var itemL of items) {
            //let tDate = transactionDate;

            //if(tDate > week){
            weeklyTotal += itemL.total;
            //}

            //if(tDate > month){
            monthlyTotal += itemL.total;
            //}
        }

        return {
            message: "User budget retrieved",
            weeklyTotal: weeklyTotal,
            weekly: user.weeklyBudget,
            monthlyTotal: monthlyTotal,
            monthly: user.monthlyBudget
        };
    }
    catch (error) {
        return {
            message: "Error retrieving budget",
            weeklyTotal: 0,
            weekly: 0,
            monthlyTotal: 0,
            monthly: 0
        };
    }

}

/**
 * Discriptve statistics measures of center: 
 */

/**
 * Function to get the users average spent
 * @param {*} userId The users ID 
 * @returns the user average
 */
async function getUserAverageSpent(userId) {

    //modify to average spent per week once the date is fixed

    try {
        const userAverage = await prisma.slip.aggregate({
            where: {
                usersId: userId
            },
            _avg: {
                total: true
            }
        })
        const average = userAverage._avg.total.toFixed(2)
        return {
            message: "Error retrieving average spent",
            average: average
        }
    }
    catch (error) {
        return {
            message: "Error retrieving average spent",
            average: "0.00"
        }
    }
}



async function getUserMode(userId) {

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
    getUserStats,
    getDataItems,
    getDailyWeeklyMonthlyReports,
    getAllReports,
    getRecentReports,
    deleteReportRecord,
    createReportRecord,
    retrieveAllSlips,
    todaysReports,
    getUserProfile,
    updateSlip,
    updateWeeklyMonthlyCategoryBudgets,
    getWeeklyMonthlyCategoryBudgets,
    deleteSlip,
}
