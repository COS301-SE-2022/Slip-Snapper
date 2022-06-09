import { doProcessing, generateReportA } from '../../api/apiCall';
import fetch, { Response } from 'node-fetch';

jest.mock('node-fetch');
test('fetch test for doProcessing', async () => {
  
    fetch.mockReturnValue(Promise.resolve(new Response({})));

    const text = await doProcessing("slip \n 2022/01/11\n 1 Chicken Burger");

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://localhost:55555/api/ocr/process', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: "{\"text\":\"slip \\n 2022/01/11\\n 1 Chicken Burger\"}"
    });
    expect(text).toEqual({})

    jest.clearAllMocks();
});

jest.mock('node-fetch');
test('fetch test for generateReportA', async () => {
    
    fetch.mockReturnValue(Promise.resolve(new Response({})));

    const report = await generateReportA("http://localhost:55555/api/report/generate?userId=1&period=");

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://localhost:55555/api/report/generate?userId=1&period=', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
          },
    });
    expect(report).toEqual({})

    jest.clearAllMocks();
});