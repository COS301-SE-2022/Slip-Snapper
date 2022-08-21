const request = require("supertest")
const { makeApp } = require('../../src/index.js');

const parse = jest.fn()
const verifyToken = jest.fn()

const app = makeApp({}, {
    parse
},{
    verifyToken
})

/**
 * Test for the ocr query
 */
describe('POST /ocr', ()=>{
    const token = ""

    beforeEach(()=>{
        parse.mockReset();
        verifyToken.mockReset();
    })

    test('Should Generate a report for the user', async ()=>{
        parse.mockResolvedValue({
            date : "date",
            total : 1,
            location: "location",
            items : []
        });

        verifyToken.mockResolvedValue({
            user: {
                id: 1
            }
        });
        
        const res = await request(app)
            .post('/api/ocr/process')
            .send({
                image: __dirname + '/assets/IMG_5593.jpg',
            })
            .set({ "Authorization": "Bearer " + token })
        
        expect(res.statusCode).toEqual(200)
        expect(res.body.message).toEqual("Text has been processed")
    })

    /**
     * TODO
     * Add unit test to check it classifies
     * Add unit tests to check varying branches
     */
})
