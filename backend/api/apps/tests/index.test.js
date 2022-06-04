const request = require("supertest")
const { makeApp } = require('../src/index.js');

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
 * Test pinging the api
 */
describe('Post /api/ping', ()=>{
  test('Should ping the api to test that it is running', async ()=>{
    const res = await request(app)
      .get('/api/ping')

      expect(res.statusCode).toEqual(200)
      expect(res.body.message).toEqual("API is running")
  })
})
