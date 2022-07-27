const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

/**
 * Funtion to get the user from the database
 * @param {*} username (String) The users name
 * @param {*} password (String) The users password
 * @returns (JSON Object) Contains a message and the user object || null
 */
async function getUser(userName, password) {
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

    //TODO return specific aspects of the user and not everything

    return {
        message: "User logged in successfully",
        user: user
    };
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
    const user = await prisma.user.create({
        data: {
            username: username,
            password: password,
            lastname: lastname,
            firstname: firstname,
            weeklyBudget: 0,
            monthlyBudget: 0
        }
    })

    //TODO validate user added correctly

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

        //TODO validate user deleted correctly
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
            message: error,
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
            message: error,
            user: null
        };
    }
}

/**
 * Funtion to get the item from the database
 * @param {*} userId (Integer) The users id
 * @returns (JSON Object) Contains a message, the number of items and an array of Items
 */
async function getItem(userId) {
    const items = await prisma.slip.findMany({
        where: {
            usersId: userId
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
    for (var slip of items) {
        for (var item of slip.items) {
            itemList.push({
                id: i++,
                itemId: item.id,
                itemName: item.data.item,
                type: item.data.itemType,
                quantity: item.itemQuantity,
                price: item.itemPrice,
                location: slip.location,
                date: slip.transactionDate
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
 * @param {*} userid (Integer) The users id
 * @param {*} start The begginning of time frame
 * @param {*} end The end of time frame
 * @returns items
 */
async function getItemsReport(userid, start, end) {
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
    const slip = await prisma.slip.create({
        data: {
            location: location,
            total: total,
            usersId: userid,
            transactionDate: date
        }
    })

    if (slip == null) {
        return {
            message: "Slip could not be created",
            numItems: 0,
            items: []
        };
    }

    const dataItems = await prisma.dataItem.findMany({

    })

    let additions = []

    for (let item of data) {
        item.slipId = slip.id;
        let matched = false

        for (var dataItem of dataItems) {
            if (item.item == dataItem.item) {
                item.dataId = dataItem.id;
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
            item.dataId = dat.id;
        }

        additions.push({
            slipId: slip.id,
            itemPrice: item.itemPrice,
            itemQuantity: item.itemQuantity,
            dataId: item.dataId
        })
    }

    const items = await prisma.item.createMany({
        data: additions
    });

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

async function insertAllItems(slipId,insertItems){
    let additions = []

    const dataItems = await prisma.dataItem.findMany({})

    for (let item of insertItems) {
        let matched = false

        for (const dataItem of dataItems) {
            if (item.data.item == dataItem.item) {
                item.data.id = dataItem.id;
                matched = true;
                break;
            }
        }

        if (!matched) {
            const dat = await prisma.dataItem.create({
                data: {
                    item: item.data.item,
                    itemType: item.data.itemType,
                }
            })
            item.data.id = dat.id;
        }

        additions.push({
            slipId: slipId,
            itemPrice: parseFloat(item.itemPrice),
            itemQuantity: item.itemQuantity,
            dataId: item.data.id
        })
    }
    
    const items = await prisma.item.createMany({
        data: additions
    });

    return {
        message: "All items added"
    }
}

/**
 * Funtion to delete the item from the database
 * @param {*} itemId The item id
 * @returns userid
 */
async function deleteItem(itemId) {
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

/**
 * Funtion to delete multiple items from the database
 * @param {*} itemId The item id array
 * @returns 
 */
async function deleteManyItems(itemIdArray) {
    try{
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
    catch(error){
        return {
            message: error,
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
    var item;
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
        })

        item = await prisma.dataItem.update({
            where: {
                id: data.dataId
            },
            data: dataB
        })
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

//TODO improve this function
async function updateAllItems(updateItems){
    for(const item of updateItems){
        if(item.id !== undefined){
            let dataA = {}
            let dataB = {}

            dataA.itemPrice = parseFloat(item.itemPrice);
            dataA.itemQuantity = item.itemQuantity;

            dataB.item = item.data.item;
            dataB.itemType = item.data.itemType;

            await updateItem(item.id, dataA, dataB)
        }
    }

    return {
        message: "All items updated"
    }
}

/**
 * Function to update the slip and all relevant items
 */
async function updateSlip(userId,slipData,insertItems,updateItems,removeItems){
    const slip = await updateSlips(slipData[5], slipData[1], slipData[4], slipData[1])
    const update = await updateAllItems(updateItems)
    const remove = await deleteManyItems(removeItems)
    const insert = await insertAllItems(slipData[5],insertItems)

    return {
        message: slip.message
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



/**
 * Funtion to set the user budgets in the database
 * @param {*} userId The users id
 * @param {*} data the data to be added
 * @returns user data
 */
async function setUserBudgets(userId, data) {
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
 * @param {*} userId The users id
 * @returns user data
 */
async function getUserStats(userId) {
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
/**
 * Funtion to set the user budgets in the database
 * @param {*} userId The users id
 * @param {*} data the data to be added
 * @returns user data
 */

async function setUserSpecificBudgets(userid, data) {
    const user = await prisma.budgets.update({
        where: {
            usersId: userid
        },
        data: data
    })

    return {
        message: "User monthly budget set",
    };
}

/**
 * Function to get the most spend on a single category
 * @param {*} userid the users id
 * @returns the most spent on a category and its amount
 */
async function getFavouriteCategory(userid) {
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
            if (!types.cat.includes(sub.data.itemType)) {
                types.cat.push(sub.data.itemType)
                types.catNums.push(0)
                types.catPrices.push(0)
            }
            var pos = types.cat.indexOf(sub.data.itemType)
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

async function getFavouriteStore(userid) {
    const favouritestore = await prisma.slip.groupBy({
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
    for (const store of favouritestore) {
        storeLocation = store.location
    }

    const slips = await prisma.slip.findMany({
        where: {
            usersId: userid,
            location: storeLocation
        }
    })

    return {
        storeLocation,
        slips
    }
}

async function getMostExpensiveItem(userid) {
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
                dataItem = it.data.item;
            }
        }
    }

    return {
        dataItem,
        expensiveItem
    }
}

async function getMostSpentATStore(userid) {
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
    for (var itemL of mostExpensive) {
        if (itemL.total > mostspent) {
            mostspent = itemL.total;
            store = itemL.location;
        }
    }

    return {
        mostspent,
        store
    }
}

async function getWeeklyExpenditure(userid) {
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
    for (var weekly of weeklyExpenditure) {
        if (weekly.transactionDate.toISOString() >= date1.toISOString()) {
            recentWeek += weekly.total;
        }
        else if (weekly.transactionDate.toISOString() >= date2.toISOString()) {
            previousWeek += weekly.total;
        }
    }

    return {
        recentWeek,
        previousWeek
    }
}

async function getMonthlyExpenditure(userid) {
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
    for (var weekly of MonthlyExpenditure) {
        if (weekly.transactionDate.toISOString() >= date1.toISOString()) {
            recentMonth += weekly.total;
        }
        else if (weekly.transactionDate.toISOString() >= date2.toISOString()) {
            previousMonth += weekly.total;
        }
    }

    return {
        recentMonth,
        previousMonth
    }
}

/**
 * Function to get the most spend on a single category
 * @returns The items in the database and their defined categories
 */
async function getDataItems() {
    const dataItems = await prisma.dataItem.findMany({})

    return {
        items: dataItems
    }
}


/**
 * Function to get the reports
 * @param {*} userId (Integer) The users id
 * @returns numreports which is the number of reports, reportsList which consists of the report id, report name and the date.
 */
async function getAllReports(userid) {
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
    let numReports = 0
    let reportsList = []
    if (userReports == null) {
        return {
            numReports,
            reportsList
        }
    }
    else {
        for (var report of userReports) {
            numReports++
            reportsList.push({
                reportId: report.id,
                reportName: report.reportName,
                reportDate: report.generatedDate
            })
        }
        return {
            message: "All user reports Retrieved",
            numReports,
            reportsList
        }
    }
}

/**
 * Function to get the daily, weekly and monthly reports
 * @param {*} userId (Integer) The users id
 * @returns daily/weekly/monthly ReportsList which consists of the report id, report name and the date, numReports which is the number of reports.
 */
async function getDailyWeeklyMonthlyReports(userid) {
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
    let numReports = 0
    let dailyReportsList = []
    let weeklyReportsList = []
    let monthlyReportsList = []
    if (userReports == null) {
        return {
            numReports,
            dailyReportsList,
            weeklyReportsList,
            monthlyReportsList
        }
    }
    else {
        const date1 = new Date()
        for (var report of userReports) {
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
            numReports,
            dailyReportsList,
            weeklyReportsList,
            monthlyReportsList
        }
    }
}


/**
 * Function to get the most recent reports.
 * @param {*} userId (Integer) The users id.
 * @returns reportsList which consists of the report id, report name and the date.
 */
async function getRecentReports(userid) {
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
    let reportsList = []
    if (userReports == null) {
        return {
            reportsList
        }
    }
    else {
        for (var report of userReports) {
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
}


/**
 * Function to create a report record in the Reports model.
 * @param {*} userId (Integer) The users id.
 * @returns null
 */
async function createReportRecord(userid, reportName, reportTotal) {
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

/**
* Function to delete a report record in the Reports model.
* @param {*} reportId (Integer) The record id.
* @returns null
*/
async function deleteReportRecord(reportid) {
    const userReports = await prisma.reports.delete({
        where: {
            id: reportid
        }
    })
}

async function retrieveAllSlips(userid) {
    const allSlips = await prisma.slip.findMany({
        where: {
            usersId: userid
        },
        include: {
            items: true,
            items: {
                select: {
                    id: true,
                    itemPrice: true,
                    itemQuantity: true,
                    data: true
                }
            },
        }
    })
    return {
        message: "All slips retrieved",
        slips: allSlips
    }
}

async function todaysReports(userid) {
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

    var sum = 0
    var counter = 0
    for (var numItems in todaysReport) {
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
        sum,
        todaystotal: todaystotal._sum.total
    }
}

/**
 * Function to get all data for the user Profile top half
 * @param {*} userId the users id
 * @returns json object with all the relevant data
 */
async function getUserProfile(userId) {
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

async function getUserGeneralBudgets(userId, start, end) {
    const budgets = await prisma.budgets.findFirst({
        where: {
            usersId: userId
        },
        select:{
            weeklyFoodBudget: true,
            weeklyFashionBudget: true,
            weeklyElectronicsBudget: true,
            weeklyHouseholdBudget: true,
            weeklyOtherBudget: true,
            monthlyFoodBudget: true,
            monthlyFashionBudget: true,
            monthlyElectronicsBudget: true,
            monthlyHouseholdBudget: true,
            monthlyOtherBudget: true
        }
    })

    if(budgets === null){
        let budget = await prisma.budgets.create({
            data: {
                usersId: userId
            }
        })

        return {
            message: "User budgets retrieved",
            budgets: budget
        };
    }

    const items = await prisma.slip.findMany({
        where: {
            usersId: userId
            // transactionDate: {
            //     gte: start,
            //     lt:  end
            //   }
        },
        include: {
            items: {
                select: {
                    id: true,
                    itemPrice: true,
                    itemQuantity: true,
                    data: true
                }
            },
        }
    })

    // var date = new Date();
    // date.setDate(date.getDate() - 7);
    // let week = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()

    // date = new Date();
    // date.setDate(date.getMonth() - 1);
    // let month = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
    let totals = {
        Food:0,
        Fashion:0,
        Electronics:0,
        houseHold:0,
        Other:0,
    }
    for (var itemL of items) {
        
        for(it of itemL.items){
            if(it.data.itemType === 'food'){
                totals.Food += it.itemPrice
            }

            if(it.data.itemType === 'fashion'){
                totals.Fashion += it.itemPrice
            }

            if(it.data.itemType === 'Electronics'){
                totals.Electronics += it.itemPrice
            }

            if(it.data.itemType === 'household'){
                totals.houseHold += it.itemPrice
            }

            if(it.data.itemType === 'other'){
                totals.Other += it.itemPrice
            }
        }
    }

    return {
        message: "User budgets retrieved",
        budgets,
        totals
    };
}

/**
 * Funtion to get the user budgets from the database
 * @param {*} userId The users id
 * @returns user data
 */
 async function getUserBudgets(userId) {
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
    setUserSpecificBudgets,
}
