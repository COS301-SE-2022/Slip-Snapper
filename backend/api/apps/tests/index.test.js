const request = require("supertest")
const {app} = require('../src/index.js');

/**
 * Test for the add user query
 */
 describe('Post /user/signup', ()=>{
  test('Should add a user to the database', async ()=>{
    const res = await request(app)
      .post('/user/signup')
      .send({
        name: "jeff",
        age: "18"
      })

      expect(res.statusCode).toEqual(200)
  })
})

/**
 * Test for the update user query
 */
 describe('Post /user/update', ()=>{
  test('Should update a user in the database', async ()=>{
    const res = await request(app)
      .post('/user/update')
      .send({
        userid: "user6",
        name: "jefferson",
      })

      expect(res.statusCode).toEqual(200)
  })
})

/**
 * Test for the delete user query
 */
 describe('Post /user/delete', ()=>{
  test('Should delete a user in the database', async ()=>{
    const res = await request(app)
      .post('/user/delete')
      .send({
        userid: "user6"
      })

      expect(res.statusCode).toEqual(200)
  })
})

describe('Post /user/login', ()=>{
  test('Should log a user in', async ()=>{
    const res = await request(app)
      .post('/user/login')
      .send({
        name: "John Doe"
      })

      expect(res.statusCode).toEqual(200)
      expect(res.text).toEqual("\"User logged in successfully\"")
  })
  
})

/**
 * Test for the get items for user query
 */
 describe('Get /item/all', ()=>{
  test('Should return a json array of items', async ()=>{
    const res = await request(app)
      .get('/item/all?user=1')

      expect(res.statusCode).toEqual(200)
  })
})

/**
 * Test for the add user query
 */
 describe('Post /item/add', ()=>{
  test('Should add an item to the database', async ()=>{
    const res = await request(app)
      .post('/item/add')
      .send({
        user: 1,
        location:"Woolworths",
        date:"09/05/22",
        name:"Orange",
        quantity:1,
        price:"20.00",
        type: "food"
      })

      expect(res.statusCode).toEqual(200)
  })
})

/**
 * Test for the update item query
 */
 describe('Post /updateItem', ()=>{
  test('Should update an item in the database', async ()=>{
    const res = await request(app)
      .post('/updateItem')
      .send({
        user: 1,
        itemid: "item10",
        name:"Oranges",
        quantity:2,
        price:"40.00"
      })

      expect(res.statusCode).toEqual(200)
  })
})

/**
 * Test for the delete item query
 */
 describe('Post /item/delete', ()=>{
  test('Should delete an item in the database', async ()=>{
    const res = await request(app)
      .post('/item/delete')
      .send({
        user: 1,
        item: "item10"
      })

      expect(res.statusCode).toEqual(200)
  })
})

/**
 * Test for the generate report query
 */
 describe('Get /report/generate', ()=>{
  test('Should Generate a report for the user', async ()=>{
    const res = await request(app)
      .get('/report/generate?user=1?period=week')
      
      expect(res.statusCode).toEqual(200)
      expect(res.text).toEqual("\"Report Generated\"")
  })
})