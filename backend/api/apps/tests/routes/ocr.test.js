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
 * Test for the ocr query
 */
describe('POST /ocr', ()=>{
    test('Should Generate a report for the user', async ()=>{
        const res = await request(app)
            .post('/api/ocr/process')
            .send({
                text: "a",
            })
        
        expect(res.statusCode).toEqual(200)
        expect(res.body.message).toEqual("Text has been processed")
    })

    /**
     * TODO
     * Add unit test to check it classifies
     * Add unit tests to check varying branches
     */
})
