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

describe('signupA', () => {
    it('should expose a function', () => {
        expect(signupA).toBeDefined();
    });

    it('signupA should return expected output', async () => {
        var mock = new MockAdapter(axios);
        const data = { 
            message: "User added successfully",
            userData: {
                username: "testUser",
            },
            token: "",
        };
        mock.onPost(baseUrl + 'user/signup').reply(200, data);

        await signupA("test", "user", "testUser", "password1", "testUser@gmail.com").then(response => {
            expect(response.data).toEqual(data);
        });
    });
});
describe('generateReportA', () => {
    it('should expose a function', () => {
        expect(generateReportA).toBeDefined();
    });

    it('generateReportA should return expected output', async () => {
        var mock = new MockAdapter(axios);
        const data = { 
            message: "Report Generated and uploaded",
                title: "31-01-2022Weekly#3.pdf",
                reportTotal: 0
        };
        mock.onPost(baseUrl + 'report/pdf').reply(200, data);

        await generateReportA("testUser", "weekly","1").then(response => {
            expect(response.data).toEqual(data);
        });
    });
});
describe('getStatsA', () => {
    it('should expose a function', () => {
        expect(getStatsA).toBeDefined();
    });

    it('getStatsA should return expected output', async () => {
        var mock = new MockAdapter(axios);
        const data = { 
            message : "User statistics retrieved",
            category: {
                amount: 0,
                name: "Other"
            },
            mostExpensive: {
                amount: 500,
                name: "burger"
            },
            lastWeek:{
                previous: 0,
                current: 500

            },
            lastMonth:{
                previous: 0,
                 current: 500,
            }
        };
        mock.onGet(baseUrl + 'stats').reply(200, data);

        await getStatsA().then(response => {
            expect(response.data).toEqual(data);
        });
    });
});

describe('addItemsA', () => {
    it('should expose a function', () => {
        expect(addItemsA).toBeDefined();
    });

    it('addItemsA should return expected output', async () => {
        var mock = new MockAdapter(axios);
        const data = { 
            message: "Item/s could not be added",
            numItems: 0,
        };
        mock.onPost(baseUrl + 'item').reply(200, data);

        await addItemsA({text: ["Spar", "2022/01/31", "0", {}, "0"]}, []).then(response => {
            expect(response.data).toEqual(data);
        });
    });
});
describe('getAllUserReports', () => {
    it('should expose a function', () => {
        expect(getAllUserReports).toBeDefined();
    });

    it('getAllUserReports should return expected output', async () => {
        var mock = new MockAdapter(axios);
        const data = { 
            message: "All user reports Retrieved",
            numReports: 0,
            reports: []
        };
        mock.onGet(baseUrl + 'report/user').reply(200, data);

        await getAllUserReports().then(response => {
            expect(response.data).toEqual(data);
        });
    });
});
describe('getUserReport', () => {
    it('should expose a function', () => {
        expect(getUserReport).toBeDefined();
    });

    it('getUserReport should return expected output', async () => {
        var mock = new MockAdapter(axios);
        var userName = "testUser";
        var fileName = "31-01-2022Weekly#3.pdf";
        const data = { 
            message: "Report retrieved Succesfully",
            report: {},
        };
        mock.onGet( baseUrl + 'report/pdf?userName=' + userName + '&fileName=' + fileName).reply(200, data);

        await getUserReport("testUser", "31-01-2022Weekly#3.pdf").then(response => {
            expect(response.data).toEqual(data);
        });
    });
});
describe('getRecentReports', () => {
    it('should expose a function', () => {
        expect(getRecentReports).toBeDefined();
    });

    it('getRecentReports should return expected output', async () => {
        var mock = new MockAdapter(axios);
        const data = { 
            message: "Recent Reports retrieved",
            reportsList: []
        };
        mock.onGet( baseUrl + 'report/recent').reply(200, data);

        await getRecentReports().then(response => {
            expect(response.data).toEqual(data);
        });
    });
});

describe('removeReport', () => {
    it('should expose a function', () => {
        expect(removeReport).toBeDefined();
    });

    it('removeReport should return expected output', async () => {
        var mock = new MockAdapter(axios);
        const data = { 
            message: "Report deleted Succesfully",
        };
        mock.onDelete( baseUrl + 'report/pdf').reply(200, data);

        await removeReport("testUser", "31-01-2022Weekly#3.pdf" , "3").then(response => {
            expect(response.data).toEqual(data);
        });
    });
});
describe('getAllSlips', () => {
    it('should expose a function', () => {
        expect(getAllSlips).toBeDefined();
    });

    it('getAllSlips should return expected output', async () => {
        var mock = new MockAdapter(axios);
        const data = { 
            message: "All slips retrieved",
            slips: []
        };
        mock.onGet( baseUrl + 'item/slip').reply(200, data);

        await getAllSlips().then(response => {
            expect(response.data).toEqual(data);
        });
    });
});
describe('getThisWeeksReports', () => {
    it('should expose a function', () => {
        expect(getThisWeeksReports).toBeDefined();
    });

    it('getThisWeeksReports should return expected output', async () => {
        var mock = new MockAdapter(axios);
        const data = { 
            message: undefined,
            monthlyReportsList: []
        };
        mock.onGet( baseUrl + 'report/thisweek').reply(200, data);

        await getThisWeeksReports().then(response => {
            expect(response.data).toEqual(data);
        });
    });
});
describe('updateSlipA', () => {
    it('should expose a function', () => {
        expect(updateSlipA).toBeDefined();
    });

    it('updateSlipA should return expected output', async () => {
        var mock = new MockAdapter(axios);
        const data = { 
            message: "Error updating the slip",
        };
        mock.onPatch( baseUrl + 'item/slip').reply(200, data);

        await updateSlipA([], [], [], []).then(response => {
            expect(response.data).toEqual(data);
        });
    });
});
describe('getTodayStats', () => {
    it('should expose a function', () => {
        expect(getTodayStats).toBeDefined();
    });

    it('getTodayStats should return expected output', async () => {
        var mock = new MockAdapter(axios);
        const data = { 
            message: "Today's Stats retrieved",
            totalItems: 0,
            totalSpent: 0
        };
        mock.onGet( baseUrl + 'stats/today').reply(200, data);

        await getTodayStats().then(response => {
            expect(response.data).toEqual(data);
        });
    });
});
describe('setGeneralBudget', () => {
    it('should expose a function', () => {
        expect(setGeneralBudget).toBeDefined();
    });

    it('setGeneralBudget should return expected output', async () => {
        var mock = new MockAdapter(axios);
        const data = { 
            message: "User budget/s set",
            budgets: undefined,
        };
        mock.onPost( baseUrl + 'stats/categoryBudgets').reply(200, data);

        await setGeneralBudget().then(response => {
            expect(response.data).toEqual(data);
        });
    });
});

describe('deleteSlip', () => {
    it('should expose a function', () => {
        expect(deleteSlip).toBeDefined();
    });

    it('deleteSlip should return expected output', async () => {
        var mock = new MockAdapter(axios);
        const data = { 
            message: "Slip has been deleted",
        };
        mock.onDelete( baseUrl + 'item/slip').reply(200, data);

        await deleteSlip("1").then(response => {
            expect(response.data).toEqual(data);
        });
    });
});
describe('getGraphStats', () => {
    it('should expose a function', () => {
        expect(getGraphStats).toBeDefined();
    });

    it('getGraphStats should return expected output', async () => {
        var mock = new MockAdapter(axios);
        const data = { 
           data: []
        };
        mock.onGet( baseUrl + 'item/graph').reply(200, data);

        await getGraphStats().then(response => {
            expect(response.data).toEqual(data);
        });
    });
});
describe('generateSpreadSheet', () => {
    it('should expose a function', () => {
        expect(generateSpreadSheet).toBeDefined();
    });

    it('generateSpreadSheet should return expected output', async () => {
        var mock = new MockAdapter(axios);
        const data = { 
           message: "SpreadSheet generated."
        };
        mock.onPost( baseUrl + 'report/spreadsheet').reply(200, data);

        await generateSpreadSheet("Daily").then(response => {
            expect(response.data).toEqual(data);
        });
    });
});