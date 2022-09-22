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