const request = require("supertest")
const { makeApp } = require('../../src/index.js');

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

    beforeEach(()=>{
        getItem.mockReset();
    })

    test('should returnall the items from the database for the user', async ()=>{
        const querydata = [
            1,
            2,
            3
        ]
        
        for (const query of querydata){
            getItem.mockReset();
            getItem.mockResolvedValue({
                message:"All associated items retrieved",
                numItems: 1,
                itemList: [{
                    id: 0,
                    itemName: "name",
                    type: "type",
                    quantity: 1,
                    price: 111111,
                    location: "location",
                    date: "date"
                  }]
            });

            const res = await request(app)
                .get('/api/item/all?userId='+query)

            expect(getItem.mock.calls.length).toBe(1);
            expect(getItem.mock.calls[0][0]).toBe(query);
        }
        
    })

    test('should return a json object containing the itemid', async ()=>{
        let data = [{
            id: 0,
            itemName: "name",
            type: "type",
            quantity: 1,
            price: 111111,
            location: "location",
            date: "date"
          }]

        for (let i = 0; i < 10; i++){
            getItem.mockReset();
            getItem.mockResolvedValue({
                message:"All associated items retrieved",
                numItems: 1,
                itemList: [{
                    id: 0,
                    itemName: "name",
                    type: "type",
                    quantity: 1,
                    price: 111111,
                    location: "location",
                    date: "date"
                  }]
            });

            const res = await request(app)
                .get('/api/item/all?userId=1')

            expect(res.body.itemList).toEqual(data);
            expect(res.body.numItems).toEqual(1);
            expect(res.body.message).toEqual("All associated items retrieved");
        }
    })

    test('should return a status code of 200', async ()=>{
        getItem.mockResolvedValue({
            message:"All associated items retrieved",
            numItems: 1,
            itemList: [{
                id: 0,
                itemName: "name",
                type: "type",
                quantity: 1,
                price: 111111,
                location: "location",
                date: "date"
              }]
        });
        
        const res = await request(app)
            .get('/api/item/all?userId=1')

        expect(res.statusCode).toEqual(200);
    })
})

/**
 * Test for the add user query
 */
describe('Post /item/add', ()=>{
    
    beforeEach(()=>{
        addItem.mockReset();
    })

    test('should save the item to the database', async ()=>{
        const bodydata = [
            { userid: 1, location:"location1", date:"date1", name:"name1", quantity:1, price:"price1", type: "type1"},
            { userid: 2, location:"location2", date:"date2", name:"name2", quantity:2, price:"price2", type: "type2"},
            { userid: 3, location:"location3", date:"date3", name:"name3", quantity:3, price:"price3", type: "type3"},
        ]

        for (const body of bodydata){
            addItem.mockReset();

            const res = await request(app)
                .post('/api/item/add')
                .send(
                    body
                )
            
            expect(addItem.mock.calls.length).toBe(1);
            expect(addItem.mock.calls[0][0]).toBe(body.userid);
            expect(addItem.mock.calls[0][1]).toBe(body.name);
            expect(addItem.mock.calls[0][2]).toBe(body.price);
            expect(addItem.mock.calls[0][3]).toBe(body.quantity);
            expect(addItem.mock.calls[0][4]).toBe(body.type);
            expect(addItem.mock.calls[0][5]).toBe(body.location);
            expect(addItem.mock.calls[0][6]).toBe(body.date);
        }
    })

    test('should return a json object containing the item id ', async ()=>{
        for (let i = 0; i < 10; i++){
            addItem.mockReset();
            addItem.mockResolvedValue(i);

            const res = await request(app)
                .post('/api/item/add')
                .send(
                    { userid: 1, location:"location1", date:"date1", name:"name1", quantity:1, price:"price1", type: "type1"}
                )

            expect(res.body.itemId).toEqual(i);
        }
    })

    test('should return a status code of 200', async ()=>{
        const res = await request(app)
            .post('/api/item/add')
            .send(
                { userid: 1, location:"location1", date:"date1", name:"name1", quantity:1, price:"price1", type: "type1"}
            )

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual("Item has been added");
    })
})

/**
 * Test for the update item query
 */
describe('Post /item/update', ()=>{
    
    beforeEach(()=>{
        updateItem.mockReset();
    })

    test('should save the item to the database', async ()=>{
        const bodydata = [
            { userid: 1, location:"location1", date:"date1", name:"name1", quantity:1, price:"price1", type: "type1"},
            { userid: 2, location:"location2", date:"date2", name:"name2", quantity:2, price:"price2", type: "type2"},
            { userid: 3, location:"location3", date:"date3", name:"name3", quantity:3, price:"price3", type: "type3"},
        ]

        for (const body of bodydata){
            updateItem.mockReset();

            const res = await request(app)
                .post('/api/item/update')
                .send(
                    body
                )
            
            expect(updateItem.mock.calls.length).toBe(1);
            expect(updateItem.mock.calls[0][0]).toBe(body.userid);
            expect(updateItem.mock.calls[0][1]).toBe(body.name);
            expect(updateItem.mock.calls[0][2]).toBe(body.price);
            expect(updateItem.mock.calls[0][3]).toBe(body.quantity);
            expect(updateItem.mock.calls[0][4]).toBe(body.type);
            expect(updateItem.mock.calls[0][5]).toBe(body.location);
            expect(updateItem.mock.calls[0][6]).toBe(body.date);
        }
    })

    test('should return a json object containing the item id ', async ()=>{
        for (let i = 0; i < 10; i++){
            updateItem.mockReset();
            updateItem.mockResolvedValue(i);

            const res = await request(app)
                .post('/api/item/update')
                .send(
                    { userid: 1, location:"location1", date:"date1", name:"name1", quantity:1, price:"price1", type: "type1"}
                )

            expect(res.body.itemId).toEqual(i);
        }
    })

    test('should return a status code of 200', async ()=>{
        const res = await request(app)
            .post('/api/item/update')
            .send(
                { userid: 1, location:"location1", date:"date1", name:"name1", quantity:1, price:"price1", type: "type1"}
            )

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual("Item has been updated successfully")
    })
})

/**
 * Test for the delete item query
 */
describe('Post /item/delete', ()=>{

    beforeEach(()=>{
        deleteItem.mockReset();
    })

    test('should delete the item from the database', async ()=>{
        const bodydata = [
            { userid: 1, itemid:"1" },
            { userid: 2, itemid:"2" },
            { userid: 3, itemid:"3" },
        ]

        for (const body of bodydata){
            deleteItem.mockReset();

            const res = await request(app)
                .post('/api/item/delete')
                .send(
                    body
                )
            
            expect(deleteItem.mock.calls.length).toBe(1);
            expect(deleteItem.mock.calls[0][0]).toBe(body.userid);
            expect(deleteItem.mock.calls[0][1]).toBe(body.itemid);
        }
    })

    test('should return a json object containing the item id ', async ()=>{
        for (let i = 0; i < 10; i++){
            deleteItem.mockReset();
            deleteItem.mockResolvedValue(i);

            const res = await request(app)
                .post('/api/item/delete')
                .send(
                    { userid: 1, itemid:"1" }
                )

            expect(res.body.itemId).toEqual(i);
        }
    })

    test('should return a status code of 200', async ()=>{
        const res = await request(app)
            .post('/api/item/delete')
            .send(
                { userid: 1, itemid:"1" }
            )

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual("Item has been deleted");
    })
})
  