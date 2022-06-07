const request = require("supertest")
const { makeApp } = require('../../src/index.js');

const parse = jest.fn()

const app = makeApp({}, {
    parse
})

/**
 * Test for the ocr query
 */
describe('POST /ocr', ()=>{

    beforeEach(()=>{
        parse.mockReset();
    })

    test('Should Generate a report for the user', async ()=>{
        parse.mockResolvedValue({
            date : "date",
            total : 1,
            location: "location",
            items : []
        });
        
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
