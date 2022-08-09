const request = require("supertest")
const { makeApp } = require('../../src/index.js');

const getItemsReport = jest.fn();
const getUserBudgets = jest.fn();
const setUserBudgets = jest.fn();
const getUserStats = jest.fn();
const getAllReports = jest.fn();
const getRecentReports = jest.fn();
const getUserProfile = jest.fn();
const verifyToken = jest.fn()

const app = makeApp({
  getItemsReport,
  getUserBudgets,
  setUserBudgets,
  getUserStats,
  getAllReports,
  getRecentReports,
  getUserProfile,
},{},{
    verifyToken,
})

/**
 * TODO Test for the generate report query
 */
// describe('Get /report/generate', ()=>{

//     beforeEach(()=>{
//         getItemsReport.mockReset();
//     })

//     //TODO Expand

//     test('Should Generate a report for the user', async ()=>{
//         getItemsReport.mockResolvedValue({
//             message:"All associated items retrieved",
//             numItems: 1,
//             itemList: [{
//                 id: 0,
//                 itemId: 1,
//                 itemName: "name",
//                 type: "type",
//                 quantity: 1,
//                 price: 111111,
//                 location: "location",
//                 date: "date"
//             }]
//         });
        
//         const res = await request(app)
//             .get('/api/report/generate?user=1?period=week&userId=1')
            
//         expect(res.statusCode).toEqual(200);
//         expect(res.body.message).toEqual("Report Generated");
//     })
// })

/**
 * Test for determine period start function
 */
describe('determinePeriodStart', ()=>{
    //TODO expand
})

/**
 * Test for sort item categories function
 */
describe('sortItemsIntoCategories', ()=>{
    //TODO expand
})

/**
 * Test createPDF function
 */
describe('createPDF', ()=>{
    //TODO expand
})


/**
 * Test for the get budget
 */
describe('Get /report/profile', ()=>{
    const token = ""

    beforeEach(()=>{
        getUserProfile.mockReset();
        verifyToken.mockReset();
    })

    test('Should get the user profile', async ()=>{
        const userId = [
            1,
            2,
            3
        ]

        for(const id of userId){
            getUserProfile.mockReset()
            getUserProfile.mockResolvedValue({
                message: "User profile statistics retrieved",
                storeDetails: { 
                    storeLocation: 'store', 
                    slips: [ {} ] },
                budget:{
                    message: 'User budget retrieved',
                    weeklyTotal: 1,
                    weekly: 2,
                    monthlyTotal: 3,
                    monthly: 4
                },
                budgets:{
                    message: 'User budgets retrieved',
                    budgets: {
                        id: 1,
                        usersId: 1,
                        weeklyFoodBudget: 0,
                        weeklyFashionBudget: 0,
                        weeklyElectronicsBudget: 0,
                        weeklyHouseholdBudget: 0,
                        weeklyOtherBudget: 0,
                        monthlyFoodBudget: 0,
                        monthlyFashionBudget: 0,
                        monthlyElectronicsBudget: 0,
                        monthlyHouseholdBudget: 0,
                        monthlyOtherBudget: 0
                    }
                }
            });

            verifyToken.mockReset();
            verifyToken.mockResolvedValue({
                user: {
                    id: id
                }
            });
        
            const res = await request(app)
                .get('/api/report/profile')
                .set({ "Authorization": "Bearer " + token })
            
            expect(getUserProfile.mock.calls.length).toBe(1);
            expect(getUserProfile.mock.calls[0][0]).toBe(id);
        }

        
    })

    test('Should return a json object with the message', async ()=>{
        getUserProfile.mockResolvedValue({
            message: "User profile statistics retrieved",
            storeDetails: { 
                storeLocation: 'store', 
                slips: [ {} ] },
            budget:{
                message: 'User budget retrieved',
                weeklyTotal: 1,
                weekly: 2,
                monthlyTotal: 3,
                monthly: 4
            },
            budgets:{
                message: 'User budgets retrieved',
                budgets: {
                    id: 1,
                    usersId: 1,
                    weeklyFoodBudget: 0,
                    weeklyFashionBudget: 0,
                    weeklyElectronicsBudget: 0,
                    weeklyHouseholdBudget: 0,
                    weeklyOtherBudget: 0,
                    monthlyFoodBudget: 0,
                    monthlyFashionBudget: 0,
                    monthlyElectronicsBudget: 0,
                    monthlyHouseholdBudget: 0,
                    monthlyOtherBudget: 0
                }
            }
        });

        verifyToken.mockResolvedValue({
            user: {
                id: 1
            }
        });

        const res = await request(app)
            .get('/api/report/profile?userId=1')
            .set({ "Authorization": "Bearer " + token })
        
        expect(res.body.message).toEqual("User profile statistics retrieved");
    })

    test('Should return a status code of 200', async ()=>{
        getUserProfile.mockResolvedValue({
            message: "User profile statistics retrieved",
            storeDetails: { 
                storeLocation: 'store', 
                slips: [ {} ] },
            budget:{
                message: 'User budget retrieved',
                weeklyTotal: 1,
                weekly: 2,
                monthlyTotal: 3,
                monthly: 4
            },
            budgets:{
                message: 'User budgets retrieved',
                budgets: {
                    id: 1,
                    usersId: 1,
                    weeklyFoodBudget: 0,
                    weeklyFashionBudget: 0,
                    weeklyElectronicsBudget: 0,
                    weeklyHouseholdBudget: 0,
                    weeklyOtherBudget: 0,
                    monthlyFoodBudget: 0,
                    monthlyFashionBudget: 0,
                    monthlyElectronicsBudget: 0,
                    monthlyHouseholdBudget: 0,
                    monthlyOtherBudget: 0
                }
            }
        });

        verifyToken.mockResolvedValue({
            user: {
                id: 1
            }
        });

        const res = await request(app)
            .get('/api/report/profile?userId=1')
            .set({ "Authorization": "Bearer " + token })
        
        expect(res.statusCode).toEqual(200);
    })

})

/**
 * Test for the update budget query
 */
describe('POST /report/budget', ()=>{
    const token = ""

    beforeEach(()=>{
        setUserBudgets.mockReset();
        verifyToken.mockReset();
    })

    test('Should Generate a report for the user', async ()=>{
        const body = [
            {userId:1, weeklyB: 1, monthlyB:1},
            {userId:2, weeklyB: 2, monthlyB:2},
            {userId:3, weeklyB: 3, monthlyB:3}
        ]

        const data = {}

        for (const bod of body){
            setUserBudgets.mockReset();
            setUserBudgets.mockResolvedValue({
                message: "User budget set",
                weekly: 1,
                monthly: 2,
            });

            verifyToken.mockReset();
            verifyToken.mockResolvedValue({
                user: {
                    id: bod.userId
                }
            });

            const res = await request(app)
                .post('/api/report/budget')
                .send( bod )
                .set({ "Authorization": "Bearer " + token })

            expect(setUserBudgets.mock.calls.length).toBe(1);
            expect(setUserBudgets.mock.calls[0][0]).toBe(bod.userId);
        }
    })

    test('Should return a json object with the message', async ()=>{
        setUserBudgets.mockResolvedValue({
            message: "User budget set",
            weekly: 1,
            monthly: 2,
        });

        verifyToken.mockResolvedValue({
            user: {
                id: 1
            }
        });

        const res = await request(app)
            .post('/api/report/budget')
            .send( {userId:1, weeklyB: 1, monthlyB:1} )
            .set({ "Authorization": "Bearer " + token })
        
        expect(res.body.message).toEqual("User budget set");
    })

    test('Should return a status code of 200', async ()=>{
        setUserBudgets.mockResolvedValue({
            message: "User budget set",
            weekly: 1,
            monthly: 2,
        });

        verifyToken.mockResolvedValue({
            user: {
                id: 1
            }
        });

        const res = await request(app)
            .post('/api/report/budget')
            .send( {userId:1, weeklyB: 1, monthlyB:1} )
            .set({ "Authorization": "Bearer " + token })
        
        expect(res.statusCode).toEqual(200);
    })
})

/**
 * Test for the get user statistics query
 */
describe('GET /report/statistics', ()=>{
    const token = ""

    beforeEach(()=>{
        getUserStats.mockReset();
        verifyToken.mockReset();
    })

    //TODO expand
    test('Should get all user statistics', async ()=>{
        const userId = [
            1,
            2,
            3
        ]
        
        for (const id of userId){
            getUserStats.mockReset();
            getUserStats.mockResolvedValue({
                message: "User statistics retrieved",
                storeDetails: {
                        storeLocation:"location",
                        total: 20
                    },
                expensiveItem: {
                        dataItem:"item",
                        expensiveItem: 20
                    },
                mostAtStore: {
                        store: "location",
                        mostspent: 20
                    },
                week: {
                        recentWeek: 20,
                        previousWeek: 20
                    },
                month: {
                        recentMonth: 20,
                        previousMonth: 20
                    },
                category: {
                        category:"category",
                        amount: 20
                    },
            });

            verifyToken.mockReset();
            verifyToken.mockResolvedValue({
                user: {
                    id: id
                }
            });

            const res = await request(app)
                .get('/api/report/statistics')
                .set({ "Authorization": "Bearer " + token })
            
            expect(getUserStats.mock.calls.length).toBe(1);
            expect(getUserStats.mock.calls[0][0]).toBe(id);
        }
    })

    test('Should return a json object with the message', async ()=>{
        getUserStats.mockResolvedValue({
            message: "User statistics retrieved",
            storeDetails: {
                    storeLocation:"location",
                    total: 20
                },
            expensiveItem: {
                    dataItem:"item",
                    expensiveItem: 20
                },
            mostAtStore: {
                    store: "location",
                    mostspent: 20
                },
            week: {
                    recentWeek: 20,
                    previousWeek: 20
                },
            month: {
                    recentMonth: 20,
                    previousMonth: 20
                },
            category: {
                    category:"category",
                    amount: 20
                },
        });

        verifyToken.mockResolvedValue({
            user: {
                id: 1
            }
        });

        const res = await request(app)
            .get('/api/report/statistics')
            .set({ "Authorization": "Bearer " + token })
        
        expect(res.body.message).toEqual("User statistics retrieved");
    })

    test('Should return a status code of 200', async ()=>{
        getUserStats.mockResolvedValue({
            message: "User statistics retrieved",
            storeDetails: {
                    storeLocation:"location",
                    total: 20
                },
            expensiveItem: {
                    dataItem:"item",
                    expensiveItem: 20
                },
            mostAtStore: {
                    store: "location",
                    mostspent: 20
                },
            week: {
                    recentWeek: 20,
                    previousWeek: 20
                },
            month: {
                    recentMonth: 20,
                    previousMonth: 20
                },
            category: {
                    category:"category",
                    amount: 20
                },
        });

        verifyToken.mockResolvedValue({
            user: {
                id: 1
            }
        });

        const res = await request(app)
            .get('/api/report/statistics')
            .set({ "Authorization": "Bearer " + token })
        
        expect(res.statusCode).toEqual(200);
    })
})

/**
 * Test for the get user reports query
 */
describe('GET /report/user', ()=>{
    const token = ""

    beforeEach(()=>{
        getAllReports.mockReset();
        verifyToken.mockReset();
    })

    //TODO expand
    test('Should Get all the reports for a particular user', async ()=>{
        const userId = [
            1,
            2,
            3
        ]
        
        for (const id of userId){
            getAllReports.mockReset();
            getAllReports.mockResolvedValue({
                message: "All user reports Retrieved",
                reports: []
            });

            verifyToken.mockReset();
            verifyToken.mockResolvedValue({
                user: {
                    id: id
                }
            });

            const res = await request(app)
                .get('/api/report/user')
                .set({ "Authorization": "Bearer " + token })
            
            expect(getAllReports.mock.calls.length).toBe(1);
            expect(getAllReports.mock.calls[0][0]).toBe(id);
        }
        
        
    })

    test('Should return a json object with the message', async ()=>{
        getAllReports.mockResolvedValue({
            message: "All user reports Retrieved",
            reports: []
        });

        verifyToken.mockResolvedValue({
            user: {
                id: 1
            }
        });

        const res = await request(app)
            .get('/api/report/user')
            .set({ "Authorization": "Bearer " + token })
        
        expect(res.body.message).toEqual("All user reports Retrieved");
    })

    test('Should return a status code of 200', async ()=>{
        getAllReports.mockResolvedValue({
            message: "All user reports Retrieved",
            reports: []
        });

        verifyToken.mockResolvedValue({
            user: {
                id: 1
            }
        });

        const res = await request(app)
            .get('/api/report/user?userId=1')
            .set({ "Authorization": "Bearer " + token })
        
        expect(res.statusCode).toEqual(200);
    })
})

/**
 * Test for the get recent reports query
 */
 describe('GET /report/recent', ()=>{
    const token = ""

    beforeEach(()=>{
        getRecentReports.mockReset();
        verifyToken.mockReset();
    })

    //TODO expand
    test('Should Get all the recent reports for a particular user', async ()=>{
        const userId = [
            1,
            2,
            3
        ]
        
        for (const id of userId){
            getRecentReports.mockReset();
            getRecentReports.mockResolvedValue({
                message: "Recent Reports retrieved.",
                reports: []
            });

            verifyToken.mockReset();
            verifyToken.mockResolvedValue({
                user: {
                    id: id
                }
            });

            const res = await request(app)
                .get('/api/report/recent')
                .set({ "Authorization": "Bearer " + token })
            
            expect(getRecentReports.mock.calls.length).toBe(1);
            expect(getRecentReports.mock.calls[0][0]).toBe(id);
        }
        
        
    })

    test('Should return a json object with the message', async ()=>{
        getRecentReports.mockResolvedValue({
            message: "Recent Reports retrieved.",
            reports: []
        });

        verifyToken.mockResolvedValue({
            user: {
                id: 1
            }
        });

        const res = await request(app)
            .get('/api/report/recent')
            .set({ "Authorization": "Bearer " + token })
        
        expect(res.body.message).toEqual("Recent Reports retrieved.");
    })

    test('Should return a status code of 200', async ()=>{
        getRecentReports.mockResolvedValue({
            message: "Recent Reports retrieved.",
            reports: []
        });

        verifyToken.mockResolvedValue({
            user: {
                id: 1
            }
        });

        const res = await request(app)
            .get('/api/report/recent')
            .set({ "Authorization": "Bearer " + token })
        
        expect(res.statusCode).toEqual(200);
    })
})

/** 
 * TODO TEST for delete from S3 bucket folder
*/
// describe('Delete /report/pdf', ()=>{

//     beforeEach(()=>{
//         getItemsReport.mockReset();
//     })

//     //TODO Expand

//     test('Should Generate a report for the user', async ()=>{
//         getItemsReport.mockResolvedValue({
//             message:"All associated items retrieved",
//             numItems: 1,
//             itemList: [{
//                 id: 0,
//                 itemId: 1,
//                 itemName: "name",
//                 type: "type",
//                 quantity: 1,
//                 price: 111111,
//                 location: "location",
//                 date: "date"
//             }]
//         });
        
//         const res = await request(app)
//             .delete('/api/report/generate?user=1?period=week&userId=1')
            
//         expect(res.statusCode).toEqual(200);
//         expect(res.body.message).toEqual("Report Generated");
//     })
// })
