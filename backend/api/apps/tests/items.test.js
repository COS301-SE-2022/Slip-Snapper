const request = require("supertest")
const { makeApp } = require('../src/index.js');

const getItem = jest.fn();
const addItem = jest.fn();
const deleteItem = jest.fn();
const updateItem = jest.fn();

const app = makeApp({
  getItem,
  addItem,
  deleteItem,
  updateItem
})

/**
 * Test for the get items for user query
 */
describe('Get /item/all', ()=>{
test('Should return a json array of items', async ()=>{
        const res = await request(app)
            .get('/api/item/all?user=1')

        expect(res.statusCode).toEqual(200)
    })
})

/**
 * Test for the add user query
 */
describe('Post /item/add', ()=>{
    test('Should add an item to the database', async ()=>{
        const res = await request(app)
            .post('/api/item/add')
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
describe('Post /item/update', ()=>{
    test('Should update an item in the database', async ()=>{
        const res = await request(app)
            .post('/api/item/update')
            .send({
                user: 1,
                itemid: "item10",
                name:"Oranges",
                quantity:2,
                price:"40.00"
            })

        expect(res.statusCode).toEqual(200)
        expect(res.text).toEqual("Item updated successfully")
    })

    test('Should fail to update an item in the database', async ()=>{
        const res = await request(app)
            .post('/api/item/update')
            .send({
                user: 1,
                itemid: "item100",
                name:"Oranges",
                quantity:2,
                price:"40.00"
            })

        expect(res.statusCode).toEqual(404)
        expect(res.text).toEqual("Item was not found")
    })
})

/**
 * Test for the delete item query
 */
describe('Post /item/delete', ()=>{
    test('Should delete an item in the database', async ()=>{
        const res = await request(app)
            .post('/api/item/delete')
            .send({
                user: 1,
                item: "item10"
            })

        expect(res.statusCode).toEqual(200)
    })
})
  