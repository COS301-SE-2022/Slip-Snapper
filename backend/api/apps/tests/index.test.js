const request = require("supertest")
const {app} = require('../src/index.js');

jest.mock('../src/items.json', ()=>({
  foo: 'bar'
}), {
  virtual: true
})

jest.mock('../src/users.json', ()=>({
  foo: 'bar'
}), {
  virtual: true
})

const users = {
  "user1": {
    "name": "Jane Doe",
    "age": "22"
  },
  "user2": {
    "name": "John Doe",
    "age": "31"
  },
  "user4": {
    "name": "jefferey",
    "age": "25"
  },
  "user5": {
    "name": "peter de",
    "age": "22"
  }
}

const items = {
  "item1": {
    "id":1,
    "user": 1,
    "location": "Woolworths",
    "date": "09/05/22",
    "item_name": "Orange",
    "quantity": 3,
    "price": "12,99",
    "type": "food"
  },
  "item2": {
    "id":2,
    "user": 1,
    "location": "Woolworths",
    "date": "09/05/22",
    "item_name": "Milk",
    "quantity": 1,
    "price": "22,99",
    "type": "food"
  },
  "item3": {
    "id":3,
    "user": 1,
    "location": "Woolworths",
    "date": "09/05/22",
    "item_name": "Jelly Tots",
    "quantity": 2,
    "price": "16,99",
    "type": "food"
  },
  "item5": {
    "id":5,
    "user": 1,
    "location": "Woolworths",
    "date": "09/05/22",
    "item_name": "Bread",
    "quantity": 1,
    "price": "19,99",
    "type": "food"
  },
  "item6": {
    "id":6,
    "user": 1,
    "location": "Woolworths",
    "date": "09/05/22",
    "item_name": "Sunlight liquid",
    "quantity": 1,
    "price": "35,99",
    "type": "cleaning"
  },
  "item7": {
    "id":7,
    "user": 1,
    "location": "Woolworths",
    "date": "09/05/22",
    "item_name": "sponge",
    "quantity": 1,
    "price": "10,00",
    "type": "cleaning"
  },
  "item8": {
    "id":8,
    "user": 1,
    "location": "Woolworths",
    "date": "09/05/22",
    "item_name": "Handy Andy",
    "quantity": 1,
    "price": "40,00",
    "type": "cleaning"
  },
  "item9": {
    "id":9,
    "user": 1,
    "location": "Woolworths",
    "date": "09/05/22",
    "item_name": "frootloops",
    "quantity": 1,
    "price": "40.00",
    "type": "food"
  }
}

/**
 * Test for the get users query
 */
describe('Get /users?user=1', ()=>{
  test('Should return a json array of users', async ()=>{
    const res = await request(app)
      .get('/users?user=1')

      expect(res.statusCode).toEqual(200)
      expect(JSON.parse(res.text)).toEqual(users)
  })
})

/**
 * Test for the add user query
 */
 describe('Post /addUser', ()=>{
  test('Should add a user to the database', async ()=>{
    const res = await request(app)
      .post('/addUser')
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
 describe('Post /updateUser', ()=>{
  test('Should update a user in the database', async ()=>{
    const res = await request(app)
      .post('/updateUser')
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
 describe('Post /deleteUser', ()=>{
  test('Should delete a user in the database', async ()=>{
    const res = await request(app)
      .post('/deleteUser')
      .send({
        userid: "user6"
      })

      expect(res.statusCode).toEqual(200)
  })
})