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
}, {})

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
                .get('/api/item/all?userId='+query)

            expect(getItem.mock.calls.length).toBe(1);
            expect(getItem.mock.calls[0][0]).toBe(query);
        }
        
    })

    test('should return a json object containing the itemid', async ()=>{
        let data = [{
            id: 0,
            itemId: 1,
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
            { userId: 1, location:"location1", date:"date1", total: 0, data: [{ item: "name1", itemQuantities: 1, itemPrices: 1, itemType: "type1", slipId: -1 }]},
            { userId: 2, location:"location2", date:"date2", total: 0, data: [{ item: "name2", itemQuantities: 2, itemPrices: 2, itemType: "type2", slipId: -1 }]},
            { userId: 3, location:"location3", date:"date3", total: 0, data: [{ item: "name3", itemQuantities: 3, itemPrices: 3, itemType: "type3", slipId: -1 }]},
        ]

        for (const body of bodydata){
            addItem.mockReset();
            addItem.mockResolvedValue({
                message:"Item/s has been added",
                numItems: 1,
            });

            const res = await request(app)
                .post('/api/item/add')
                .send(
                    body
                )
            
            expect(addItem.mock.calls.length).toBe(1);
            expect(addItem.mock.calls[0][0]).toBe(body.userId);
            expect(addItem.mock.calls[0][1]).toBe(body.location);
            //expect(addItem.mock.calls[0][2]).toBe(body.date);
            expect(addItem.mock.calls[0][3]).toBe(body.total);
            //expect(addItem.mock.calls[0][4]).toBe(body.data);
        }
    })

    test('should return a json object containing the item id ', async ()=>{
        for (let i = 0; i < 10; i++){
            addItem.mockReset();
            addItem.mockResolvedValue({
                message:"Item/s has been added",
                numItems: 1,
            });

            const res = await request(app)
                .post('/api/item/add')
                .send(
                    { userId: 3, location:"location3", date:"date3", data: [{ item: "name3", itemQuantities: 3, itemPrices: 3, itemType: "type3", slipId: -1 }]}
                )

            expect(res.body.numItems).toEqual(1);
            expect(res.body.message).toEqual("Item/s has been added");
        }
    })

    test('should return a status code of 200', async ()=>{
        addItem.mockResolvedValue({
            message:"Item/s has been added",
            numItems: 1,
        });

        const res = await request(app)
            .post('/api/item/add')
            .send(
                { userId: 3, location:"location3", date:"date3", data: [{ item: "name3", itemQuantities: 3, itemPrices: 3, itemType: "type3", slipId: -1 }]}
            )

        expect(res.statusCode).toEqual(200);
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
            { itemId: 1, itemname: "name1", itemprice: 1, itemquantity: 1, itemtype: "type1" },
            { itemId: 1, itemname: "name2", itemprice: 2, itemquantity: 2, itemtype: "type2" },
            { itemId: 1, itemname: "name3", itemprice: 3, itemquantity: 3, itemtype: "type3" },
        ]

        //let data = { itemname: "name", itemprice: 1, itemquantity: 1, itemtype: "type" }

        for (const body of bodydata){
            updateItem.mockReset();
            updateItem.mockResolvedValue({
                message:"Item has been updated successfully",
                item: {
                    id: 0,
                    itemName: "name",
                    type: "type",
                    quantity: 1,
                    price: 111111,
                }
            });

            const res = await request(app)
                .post('/api/item/update')
                .send(
                    body
                )
            
            expect(updateItem.mock.calls.length).toBe(1);
            expect(updateItem.mock.calls[0][0]).toBe(body.itemId);
            //expect(updateItem.mock.calls[0][1]).toBe(body.data);
        }
    })

    test('should return a json object containing the item id ', async ()=>{
        let data = {
                id: 0,
                itemName: "name",
                type: "type",
                quantity: 1,
                price: 111111,
            }
        for (let i = 0; i < 10; i++){
            updateItem.mockReset();
            updateItem.mockResolvedValue({
                message:"Item has been updated successfully",
                item: {
                    id: 0,
                    itemName: "name",
                    type: "type",
                    quantity: 1,
                    price: 111111,
                }
            });

            const res = await request(app)
                .post('/api/item/update')
                .send(
                    { itemId: 1, data: { itemname: "name3", itemprice: 3, itemquantity: 3, itemtype: "type3" }}
                )

            expect(res.body.item).toEqual(data);
            expect(res.body.message).toEqual("Item has been updated successfully")
        }
    })

    test('should return a status code of 200', async ()=>{
        updateItem.mockResolvedValue({
            message:"Item has been updated successfully",
            item: {
                id: 0,
                itemName: "name",
                type: "type",
                quantity: 1,
                price: 111111,
            }
        });
        
        const res = await request(app)
            .post('/api/item/update')
            .send(
                { itemId: 1, data: { itemname: "name3", itemprice: 3, itemquantity: 3, itemtype: "type3" }}
            )

        expect(res.statusCode).toEqual(200);
        
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
            { itemId: 1 },
            { itemId: 2 },
            { itemId: 3 },
        ]

        for (const body of bodydata){
            deleteItem.mockReset();
            deleteItem.mockResolvedValue({
                message:"Item has been deleted",
                item: {
                    id: 0,
                    itemName: "name",
                    type: "type",
                    quantity: 1,
                    price: 111111,
                }
            });

            const res = await request(app)
                .post('/api/item/delete')
                .send(
                    body
                )
            
            expect(deleteItem.mock.calls.length).toBe(1);
            expect(deleteItem.mock.calls[0][0]).toBe(body.itemId);
        }
    })

    test('should return a json object containing the item id ', async ()=>{
        let data = {
            id: 0,
            itemName: "name",
            type: "type",
            quantity: 1,
            price: 111111,
        }
        
        for (let i = 0; i < 10; i++){
            deleteItem.mockReset();
            deleteItem.mockResolvedValue({
                message:"Item has been deleted",
                item: {
                    id: 0,
                    itemName: "name",
                    type: "type",
                    quantity: 1,
                    price: 111111,
                }
            });

            const res = await request(app)
                .post('/api/item/delete')
                .send(
                    { itemId: 1 }
                )

            expect(res.body.item).toEqual(data);
            expect(res.body.message).toEqual("Item has been deleted");
        }
    })

    test('should return a status code of 200', async ()=>{
        deleteItem.mockResolvedValue({
            message:"Item has been deleted",
            item: {
                id: 0,
                itemName: "name",
                type: "type",
                quantity: 1,
                price: 111111,
            }
        });
        
        const res = await request(app)
            .post('/api/item/delete')
            .send(
                { itemId: 1 }
            )

        expect(res.statusCode).toEqual(200);
        
    })
})
