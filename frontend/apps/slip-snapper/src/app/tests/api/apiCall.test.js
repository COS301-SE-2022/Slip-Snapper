import { doProcessing, updateItemA, getItemsA, setBudgetA, getProfileData, loginA, signupA, generateReportA, getStatsA, addItemsA, getAllUserReports, getUserReport, getRecentReports, removeReport, getAllSlips, getThisWeeksReports, updateSlipA, getTodayStats, setGeneralBudget, deleteSlip, getGraphStats, generateSpreadSheet } from '../../../api/apiCall';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/'
describe('doProcessing', () => {
    it('should expose a function', () => {
        expect(doProcessing).toBeDefined();
    });

    it('doProcessing should return expected output', async () => {
        var mock = new MockAdapter(axios);
        const data = { 
            message : "Text has been processed",
            text : "" 
        };
        mock.onPost(baseUrl + 'ocr/process').reply(200, data);

        await doProcessing("").then(response => {
            expect(response.data).toEqual(data);
        });
        
    });
});
describe('updateItemA', () => {
    it('should expose a function', () => {
        expect(updateItemA).toBeDefined();
    });

    it('updateItemA should return expected output', async () => {
        var mock = new MockAdapter(axios);
        const data = { 
            message: "Item has been updated successfully",
            item: {}
        };
        mock.onPost(baseUrl + 'item/update').reply(200, data);

        await updateItemA("1", "burger", "Spar", "1", "55", "Food").then(response => {
            expect(response.data).toEqual(data);
        });
    });
});
describe('getItemsA', () => {
    it('should expose a function', () => {
        expect(getItemsA).toBeDefined();
    });

    it('getItemsA should return expected output', async () => {
        var mock = new MockAdapter(axios);
        const data = { 
            message: "All associated items retrieved",
            numItems: 0,
            itemList: []
        };
        mock.onGet(baseUrl + 'item').reply(200, data);

        await getItemsA().then(response => {
            expect(response.data).toEqual(data);
        });
    });
});

describe('setBudgetA', () => {
    it('should expose a function', () => {
        expect(setBudgetA).toBeDefined();
    });

    it('setBudgetA should return expected output', async () => {
        var mock = new MockAdapter(axios);
        const data = { 
            message: "User budget set",
            weekly: "0",
            monthly: "0"
        };
        mock.onPost(baseUrl + 'stats/budget').reply(200, data);

        await setBudgetA(0,0).then(response => {
            expect(response.data).toEqual(data);
        });
    });
});
describe('getProfileData', () => {
    it('should expose a function', () => {
        expect(getProfileData).toBeDefined();
    });

    it('getProfileData should return expected output', async () => {
        var mock = new MockAdapter(axios);
        const data = { 
            message: "User profile statistics retrieved",
            weeklyTotal: 0,
            weekly: 0,
            monthlyTotal: 0,
            monthly: 0,
            favouriteStore: {
                name: "",
                receipts: "",
            },
            otherBudgets: {},
            user: "",
        };
        mock.onGet(baseUrl + 'stats/profile').reply(200, data);

        await getProfileData().then(response => {
            expect(response.data).toEqual(data);
        });
    });
});
describe('loginA', () => {
    it('should expose a function', () => {
        expect(loginA).toBeDefined();
    });

    it('loginA should return expected output', async () => {
        var mock = new MockAdapter(axios);
        const data = { 
            message: "User logged in successfully",
            userData: {
                username: "testUser",
            },
            token: "",
        };
        mock.onPost(baseUrl + 'user/login').reply(200, data);

        await loginA("testUser", "password1").then(response => {
            expect(response.data).toEqual(data);
        });
    });
});