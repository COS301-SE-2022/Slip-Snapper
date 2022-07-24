const request = require("supertest")
const { makeApp } = require('../../src/index.js');

const getItemsReport = jest.fn();
const getUserBudgets = jest.fn();
const setUserBudgets = jest.fn();
const getUserStats = jest.fn();
const getAllReports = jest.fn();
const getRecentReports = jest.fn();


const app = makeApp({
  getItemsReport,
  getUserBudgets,
  setUserBudgets,
  getUserStats,
  getAllReports,
  getRecentReports
})

/**
 * Test for the generate report query
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

//TODO test determine start period function call

//TODO test sort categories function call

/**
 * Test for the get budget
 */
describe('Get /report/budget', ()=>{

    beforeEach(()=>{
        getUserBudgets.mockReset();
    })

    test('Should Generate a report for the user', async ()=>{
        getUserBudgets.mockResolvedValue({
            message: "User budget retrieved",
            weeklyTotal: 1,
            weekly: 2,
            monthlyTotal: 3,
            monthly: 4
        });
        
        const res = await request(app)
            .get('/api/report/budget?userId=1')
        
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual("User budget retrieved");
    })
})

/**
 * Test for the update budget query
 */
describe('POST /report/budget', ()=>{
    test('Should Generate a report for the user', async ()=>{
        setUserBudgets.mockResolvedValue({
            message: "User budget set",
            weekly: 1,
            monthly: 2,
        });

        const res = await request(app)
            .post('/api/report/budget')
            .send({
                userId: 1,
                weeklyB: 1,
                monthlyB: 2,
            })
        
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual("User budget set");
    })
})

/**
 * Test for the get user statistics query
 */
describe('GET /report/statistics', ()=>{

    //TODO expand
    test('Should get all user statistics', async ()=>{
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

        const res = await request(app)
            .get('/api/report/statistics?userId=1')
        
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual("User statistics retrieved");
    })
})

/**
 * Test for the get user statistics query
 */
describe('GET /report/user', ()=>{

    beforeEach(()=>{
        getAllReports.mockReset();
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

            const res = await request(app)
                .get('/api/report/user?userId='+id)
            
            expect(getAllReports.mock.calls.length).toBe(1);
            expect(getAllReports.mock.calls[0][0]).toBe(id);
        }
        
        
    })

    test('Should return a json object with the message', async ()=>{
        getAllReports.mockResolvedValue({
            message: "All user reports Retrieved",
            reports: []
        });

        const res = await request(app)
            .get('/api/report/user?userId=1')
        
        expect(res.body.message).toEqual("All user reports Retrieved");
    })

    test('Should return a status code of 200', async ()=>{
        getAllReports.mockResolvedValue({
            message: "All user reports Retrieved",
            reports: []
        });

        const res = await request(app)
            .get('/api/report/user?userId=1')
        
        expect(res.statusCode).toEqual(200);
    })
})
