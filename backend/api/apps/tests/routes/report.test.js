const request = require("supertest")
const { makeApp } = require('../../src/index.js');

const getItemsReport = jest.fn();
const getAllReports = jest.fn();
const getRecentReports = jest.fn();
const getUserProfile = jest.fn();
const verifyToken = jest.fn()

const app = makeApp({
  getItemsReport,
  getAllReports,
  getRecentReports,
  getUserProfile,
},{},{
    verifyToken,
})

/**
 * TODO Test for the generate report query
 */
// describe('Get /report/generate', ()=>{

//     beforeEach(()=>{
//         getItemsReport.mockReset();
//     })

//     //TODO Expand

//     test('Should Generate a report for the user', async ()=>{
//         getItemsReport.mockResolvedValue({
//             message:"All associated items retrieved",
//             numItems: 1,
//             itemList: [{
//                 id: 0,
//                 itemId: 1,
//                 itemName: "name",
//                 type: "type",
//                 quantity: 1,
//                 price: 111111,
//                 location: "location",
//                 date: "date"
//             }]
//         });
        
//         const res = await request(app)
//             .get('/api/report/generate?user=1?period=week&userId=1')
            
//         expect(res.statusCode).toEqual(200);
//         expect(res.body.message).toEqual("Report Generated");
//     })
// })

/**
 * Test for determine period start function
 */
describe('determinePeriodStart', ()=>{
    //TODO expand
})

/**
 * Test for sort item categories function
 */
describe('sortItemsIntoCategories', ()=>{
    //TODO expand
})

/**
 * Test createPDF function
 */
describe('createPDF', ()=>{
    //TODO expand
})

/**
 * Test for the get user reports query
 */
describe('GET /report/user', ()=>{
    const token = ""

    beforeEach(()=>{
        getAllReports.mockReset();
        verifyToken.mockReset();
    })

    //TODO expand
    test('Should Get all the reports for a particular user', async ()=>{
        const userId = [
            1,
            2,
            3
        ]
        
        for (const id of userId){
            getAllReports.mockReset();
            getAllReports.mockResolvedValue({
                message: "All user reports Retrieved",
                reports: []
            });

            verifyToken.mockReset();
            verifyToken.mockResolvedValue({
                user: {
                    id: id
                }
            });

            const res = await request(app)
                .get('/api/report/user')
                .set({ "Authorization": "Bearer " + token })
            
            expect(getAllReports.mock.calls.length).toBe(1);
            expect(getAllReports.mock.calls[0][0]).toBe(id);
        }
        
        
    })

    test('Should return a json object with the message', async ()=>{
        getAllReports.mockResolvedValue({
            message: "All user reports Retrieved",
            reports: []
        });

        verifyToken.mockResolvedValue({
            user: {
                id: 1
            }
        });

        const res = await request(app)
            .get('/api/report/user')
            .set({ "Authorization": "Bearer " + token })
        
        expect(res.body.message).toEqual("All user reports Retrieved");
    })

    test('Should return a status code of 200', async ()=>{
        getAllReports.mockResolvedValue({
            message: "All user reports Retrieved",
            reports: []
        });

        verifyToken.mockResolvedValue({
            user: {
                id: 1
            }
        });

        const res = await request(app)
            .get('/api/report/user?userId=1')
            .set({ "Authorization": "Bearer " + token })
        
        expect(res.statusCode).toEqual(200);
    })
})

/**
 * Test for the get recent reports query
 */
 describe('GET /report/recent', ()=>{
    const token = ""

    beforeEach(()=>{
        getRecentReports.mockReset();
        verifyToken.mockReset();
    })

    //TODO expand
    test('Should Get all the recent reports for a particular user', async ()=>{
        const userId = [
            1,
            2,
            3
        ]
        
        for (const id of userId){
            getRecentReports.mockReset();
            getRecentReports.mockResolvedValue({
                message: "Recent Reports retrieved.",
                reports: []
            });

            verifyToken.mockReset();
            verifyToken.mockResolvedValue({
                user: {
                    id: id
                }
            });

            const res = await request(app)
                .get('/api/report/recent')
                .set({ "Authorization": "Bearer " + token })
            
            expect(getRecentReports.mock.calls.length).toBe(1);
            expect(getRecentReports.mock.calls[0][0]).toBe(id);
        }
        
        
    })

    test('Should return a json object with the message', async ()=>{
        getRecentReports.mockResolvedValue({
            message: "Recent Reports retrieved.",
            reports: []
        });

        verifyToken.mockResolvedValue({
            user: {
                id: 1
            }
        });

        const res = await request(app)
            .get('/api/report/recent')
            .set({ "Authorization": "Bearer " + token })
        
        expect(res.body.message).toEqual("Recent Reports retrieved.");
    })

    test('Should return a status code of 200', async ()=>{
        getRecentReports.mockResolvedValue({
            message: "Recent Reports retrieved.",
            reports: []
        });

        verifyToken.mockResolvedValue({
            user: {
                id: 1
            }
        });

        const res = await request(app)
            .get('/api/report/recent')
            .set({ "Authorization": "Bearer " + token })
        
        expect(res.statusCode).toEqual(200);
    })
})

/** 
 * TODO TEST for delete from S3 bucket folder
*/
// describe('Delete /report/pdf', ()=>{

//     beforeEach(()=>{
//         getItemsReport.mockReset();
//     })

//     //TODO Expand

//     test('Should Generate a report for the user', async ()=>{
//         getItemsReport.mockResolvedValue({
//             message:"All associated items retrieved",
//             numItems: 1,
//             itemList: [{
//                 id: 0,
//                 itemId: 1,
//                 itemName: "name",
//                 type: "type",
//                 quantity: 1,
//                 price: 111111,
//                 location: "location",
//                 date: "date"
//             }]
//         });
        
//         const res = await request(app)
//             .delete('/api/report/generate?user=1?period=week&userId=1')
            
//         expect(res.statusCode).toEqual(200);
//         expect(res.body.message).toEqual("Report Generated");
//     })
// })
