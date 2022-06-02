const request = require("supertest")
const {app} = require('../src/index.js');

/**
 * Tests for all user routes
 */
describe('User Routes',()=>{

  /**
   * Test for the add user query
   */
  describe('Post /user/signup', ()=>{
    test('Should add a user to the database', async ()=>{
      const res = await request(app)
        .post('/api/user/signup')
        .send({
          name: "jeff",
          age: "18"
        })
  
        expect(res.statusCode).toEqual(200)
    })
  })
  
  /**
   * Test for logging a user in
   */
   describe('Post /user/login', ()=>{
    test('Should log a user in', async ()=>{
      const res = await request(app)
        .post('/api/user/login')
        .send({
          name: "John Doe"
        })
  
        expect(res.statusCode).toEqual(200)
        expect(res.text).toEqual("\"User logged in successfully\"")
    })
    
  })
  
  /**
   * Test for the update user query
   */
   describe('Post /user/update', ()=>{
    test('Should update a user in the database', async ()=>{
      const res = await request(app)
        .post('/api/user/update')
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
        .post('/api/user/delete')
        .send({
          userid: "user6"
        })
  
        expect(res.statusCode).toEqual(200)
    })
  })

})

/**
 * Tests for all item routes
 */
 describe('Item Routes',()=>{
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
  
})

/**
 * Tests for all report routes
 */
describe('Report Routes',()=>{
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
        
        expect(res.statusCode).toEqual(200)
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
        
        expect(res.statusCode).toEqual(200)
    })
  })
})

/**
 * Tests for all ocr routes
 */
describe('OCR Routes',()=>{
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
        
        let resp = JSON.parse(res.text);
        expect(res.statusCode).toEqual(200)
        expect(resp.message).toEqual("Text has been processed")
    })

    /**
     * TODO
     * Add unit test to check it classifies
     * Add unit tests to check varying branches
     */
  })
})