const request = require("supertest")
const { makeApp } = require('../../src/index.js');

const getUserStats = jest.fn();
const getUserProfile = jest.fn();
const getUserBudgets = jest.fn();
const setUserBudgets = jest.fn();
const todaysReports = jest.fn();
const thisWeeksExpenditure = jest.fn();


const updateWeeklyMonthlyCategoryBudgets = jest.fn();

const verifyToken = jest.fn();

const app = makeApp({
  getUserBudgets,
  setUserBudgets,
  getUserStats,
  getUserProfile,
  updateWeeklyMonthlyCategoryBudgets,
  todaysReports,
  thisWeeksExpenditure,
},{},{
    verifyToken,
})


/**
 * Test for the get user statistics query
 */
describe('GET /stats', ()=>{
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
                .get('/api/stats')
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
            .get('/api/stats')
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
            .get('/api/stats')
            .set({ "Authorization": "Bearer " + token })
        
        expect(res.statusCode).toEqual(200);
    })
})

/**
 * Test for the get budget
 */
describe('Get /stats/profile', ()=>{
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
                .get('/api/stats/profile')
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
            .get('/api/stats/profile')
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
            .get('/api/stats/profile')
            .set({ "Authorization": "Bearer " + token })
        
        expect(res.statusCode).toEqual(200);
    })

})

/**
 * Test for the update budget query
 */
describe('POST /stats/budget', ()=>{
    const token = ""

    beforeEach(()=>{
        setUserBudgets.mockReset();
        verifyToken.mockReset();
    })

    test('Should Generate a report for the user', async ()=>{
        const body = [
            { userId:1, weekly: 1, monthly:1 },
            { userId:2, weekly: 2, monthly:2 },
            { userId:3, weekly: 3, monthly:3 }
        ]

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
                .post('/api/stats/budget')
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
            .post('/api/stats/budget')
            .send( { weekly: 1, monthly:1 } )
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
            .post('/api/stats/budget')
            .send( { weekly: 1, monthly:1 } )
            .set({ "Authorization": "Bearer " + token })
        
        expect(res.statusCode).toEqual(200);
    })
})

/**
 * Test for the update category budget query
 */
describe('POST /stats/categoryBudgets', ()=>{
    const token = ""

    beforeEach(()=>{
        updateWeeklyMonthlyCategoryBudgets.mockReset();
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
            updateWeeklyMonthlyCategoryBudgets.mockReset();
            updateWeeklyMonthlyCategoryBudgets.mockResolvedValue({
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
                .post('/api/stats/categoryBudgets')
                .send( bod )
                .set({ "Authorization": "Bearer " + token })

            expect(updateWeeklyMonthlyCategoryBudgets.mock.calls.length).toBe(1);
            expect(updateWeeklyMonthlyCategoryBudgets.mock.calls[0][0]).toBe(bod.userId);
        }
    })

    test('Should return a json object with the message', async ()=>{
        updateWeeklyMonthlyCategoryBudgets.mockResolvedValue({
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
            .post('/api/stats/categoryBudgets')
            .send( {userId:1, weeklyB: 1, monthlyB:1} )
            .set({ "Authorization": "Bearer " + token })
        
        expect(res.body.message).toEqual("User budget set");
    })

    test('Should return a status code of 200', async ()=>{
        updateWeeklyMonthlyCategoryBudgets.mockResolvedValue({
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
            .post('/api/stats/categoryBudgets')
            .send( {userId:1, weeklyB: 1, monthlyB:1} )
            .set({ "Authorization": "Bearer " + token })
        
        expect(res.statusCode).toEqual(200);
    })
})

/**
 * Test for the get budget
 */
describe('Get /stats/today', ()=>{
    const token = ""

    beforeEach(()=>{
        todaysReports.mockReset();
        thisWeeksExpenditure.mockReset();
        verifyToken.mockReset();
    })

    test('Should get the user profile', async ()=>{
        const userId = [
            1,
            2,
            3
        ]

        for(const id of userId){
            todaysReports.mockReset()
            todaysReports.mockResolvedValue({
                message: "Today's Stats retrieved",
                sum: 0,
                todaystotal: 0,
            });

            thisWeeksExpenditure.mockReset()
            thisWeeksExpenditure.mockResolvedValue({
                message: "This Weeks Expenditure Retrieved",
                itemCount: 0,
                weekTotal: 0
            });

            verifyToken.mockReset();
            verifyToken.mockResolvedValue({
                user: {
                    id: id
                }
            });
        
            const res = await request(app)
                .get('/api/stats/today')
                .set({ "Authorization": "Bearer " + token })
            
            expect(todaysReports.mock.calls.length).toBe(1);
            expect(todaysReports.mock.calls[0][0]).toBe(id);
        }

        
    })

    test('Should return a json object with the message', async ()=>{
        todaysReports.mockResolvedValue({
            message: "Today's Stats retrieved",
            sum: 0,
            todaystotal: 0,
        });
        thisWeeksExpenditure.mockResolvedValue({
            message: "This Weeks Expenditure Retrieved",
            itemCount: 0,
            weekTotal: 0
        });

        verifyToken.mockResolvedValue({
            user: {
                id: 1
            }
        });

        const res = await request(app)
            .get('/api/stats/today')
            .set({ "Authorization": "Bearer " + token })
        
        expect(res.body.message).toEqual("Today's Stats retrieved");
    })

    test('Should return a status code of 200', async ()=>{
        todaysReports.mockResolvedValue({
            message: "Today's Stats retrieved",
            sum: 0,
            todaystotal: 0,
        });

        thisWeeksExpenditure.mockResolvedValue({
            message: "This Weeks Expenditure Retrieved",
            itemCount: 0,
            weekTotal: 0
        });

        verifyToken.mockResolvedValue({
            user: {
                id: 1
            }
        });

        const res = await request(app)
            .get('/api/stats/today')
            .set({ "Authorization": "Bearer " + token })
        
        expect(res.statusCode).toEqual(200);
    })

})
