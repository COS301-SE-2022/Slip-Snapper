const request = require("supertest")
const { makeApp } = require('../../src/index.js');

const getItemsReport = jest.fn();
const getUserBudgets = jest.fn();
const setUserBudgets = jest.fn();

const app = makeApp({
  getItemsReport,
  getUserBudgets,
  setUserBudgets
}, {})

/**
 * Test for the generate report query
 */
describe('Get /report/generate', ()=>{

    beforeEach(()=>{
        getItemsReport.mockReset();
    })

    test('Should Generate a report for the user', async ()=>{
        getItemsReport.mockResolvedValue({
            message:"All associated items retrieved",
            numItems: 1,
            itemList: [{
                id: 0,
                itemId: 1,
                itemName: "name",
                type: "type",
                quantity: 1,
                price: 111111,
                location: "location",
                date: "date"
            }]
        });
        
        const res = await request(app)
            .get('/api/report/generate?user=1?period=week&userId=1')
            
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual("Report Generated");
    })
})

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
 * Test for the generate report query
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
