const request = require("supertest")
const { makeApp } = require('../../src/index.js');

const getUser = jest.fn();
const addUser = jest.fn();
const deleteUser = jest.fn();
const updateUser = jest.fn();

const app = makeApp({
  getUser,
  addUser,
  deleteUser,
  updateUser
})

/**
 * Test for the generate report query
 */
describe('Get /report/generate', ()=>{
    test('Should Generate a report for the user', async ()=>{
        const res = await request(app)
            .get('/api/report/generate?user=1?period=week')
            
        expect(res.statusCode).toEqual(200)
        expect(res.text).toEqual("\"Report Generated\"")
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