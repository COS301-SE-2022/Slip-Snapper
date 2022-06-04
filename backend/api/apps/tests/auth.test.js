const request = require("supertest")
const { makeApp } = require('../src/index.js');

const getUser = jest.fn();
const addUser = jest.fn();
const deleteUser = jest.fn();

const app = makeApp({
  getUser,
  addUser,
  deleteUser
})

/**
 * Test for the add user query
 */
describe('Post /user/signup', ()=>{

beforeEach(()=>{
    addUser.mockReset();
})

test('should save the username and password to the database', async ()=>{
    const bodydata = [
    { username: "username1", password: "password1"},
    { username: "username2", password: "password2"},
    { username: "username3", password: "password3"}
    ]

    for (const body of bodydata){
    addUser.mockReset();

    const res = await request(app)
    .post('/api/user/signup')
    .send(
        body
    )

    expect(addUser.mock.calls.length).toBe(1);
    expect(addUser.mock.calls[0][0]).toBe(body.username);
    expect(addUser.mock.calls[0][1]).toBe(body.password);
    }
    
})

test('should return a json object containing the user id ', async ()=>{
    for (let i = 0; i < 10; i++){
    addUser.mockReset();
    addUser.mockResolvedValue(i);

    const res = await request(app)
    .post('/api/user/signup')
    .send(
        { username: "username1", password: "password1"}
    )

    expect(res.body.userId).toEqual(i);
    }
})

test('should return a status code of 200', async ()=>{
    const res = await request(app)
    .post('/api/user/signup')
    .send(
        { username: "username1", password: "password1"}
    )

    expect(res.statusCode).toEqual(200);
})
})

/**
 * Test for logging a user in
 */
//  describe('Post /user/login', ()=>{
//   test('Should log a user in', async ()=>{
//     const res = await request(app)
//       .post('/api/user/login')
//       .send({
//         name: "John Doe"
//       })

//       expect(res.statusCode).toEqual(200)
//       expect(res.text).toEqual("\"User logged in successfully\"")
//   })

// })

/**
 * Test for the update user query
 */
//  describe('Post /user/update', ()=>{
//   test('Should update a user in the database', async ()=>{
//     const res = await request(app)
//       .post('/api/user/update')
//       .send({
//         userid: "user6",
//         name: "jefferson",
//       })

//       expect(res.statusCode).toEqual(200)
//   })
// })

/**
 * Test for the delete user query
 */
//  describe('Post /user/delete', ()=>{
//   test('Should delete a user in the database', async ()=>{
//     const res = await request(app)
//       .post('/api/user/delete')
//       .send({
//         userid: "user6"
//       })

//       expect(res.statusCode).toEqual(200)
//   })
// })

