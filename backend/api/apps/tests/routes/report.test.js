const request = require("supertest")
const { makeApp } = require('../../src/index.js');

const getItemsReport = jest.fn();

const app = makeApp({
  getItemsReport
})

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
    test('Should Generate a report for the user', async ()=>{
        const res = await request(app)
            .get('/api/report/budget')
        
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual("Your budget is a");
    })
})

/**
 * Test for the generate report query
 */
describe('POST /report/budget', ()=>{
    test('Should Generate a report for the user', async ()=>{
        
        const res = await request(app)
            .post('/api/report/budget')
            .send({
                user: 1
            })
        
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual("Your budget has been set");
    })
})