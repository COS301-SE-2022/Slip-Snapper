const request = require("supertest")
const { makeApp } = require('../../src/index.js');

const parse = jest.fn()
const verifyToken = jest.fn()
jest.setTimeout(40000)

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
                image: "data:image/jpeg;base64,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"
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
