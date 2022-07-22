const axios = require('axios');

/**
 * To process the text extracted by OCR
 * @param {*} ocr the extracted text
 * @returns the response as a promise
 */
export async function doProcessing(ocr){
    return axios({
        method: 'post',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        url:'http://localhost:55555/api/ocr/process',
        // data: {
        //   text: ocr,
        // }
        data: JSON.stringify({
            text: ocr,
        })
    })
}

export async function updateItemA(_item,userid,_name,_location,_quantity,_price,_type){
    return axios({
        method: 'post',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        url:'http://localhost:55555/api/item/update',
        data: JSON.stringify({
            itemid: _item,
            user: userid,
            name : _name,
            location : _location,
            quantity : _quantity,
            price : _price,
            type : _type
        })
    })
}

export async function getItemsA(userid){
    return axios({
        method: 'get',
        // headers: {
        //     'Content-Type': 'application/json'
        // }
        url:'http://localhost:55555/api/item/all?userId='+userid
    })
}

export async function setBudgetA( userid, weekly, monthly){
    return axios({
        method: 'post',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        url: 'http://localhost:55555/api/report/budget',
        // data: JSON.stringify({
        //     userId: userid,
        //     weekly: weekly,
        //     monthly: monthly
        // })
        data: {
            userId: userid,
            weekly: weekly,
            monthly: monthly
        }
    })
}

export async function getBudgetA( userid ){
    return axios({
        method: 'get',
        // headers: {
        //     'Content-Type': 'application/json'
        // }
        url: 'http://localhost:55555/api/report/budget?userId=1',
    })
}

export async function loginA( username, password){
    return axios({
        method: 'post',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        url: 'http://localhost:55555/api/user/login',
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
}

export async function signupA( username, first, last, password){
    return axios({
        method: 'post',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        url: 'http://localhost:55555/api/user/signup',
        body: JSON.stringify({
          firstname: first,
          lastname: last,
          username: username,
          password: password,
        })
    })
}

export async function generateReportA( url ){
    return axios({
        method: 'get',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        url: url,
      })
}

export async function getStatsA( userId ){
    return axios({
        method: 'get',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        url: 'http://localhost:55555/api/report/statistics?userId=1',
      })
}

export async function addItemsA( userId, data, text){
    return axios({
        method: 'post',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        url: 'http://localhost:55555/api/item/add',
        body: JSON.stringify({
          userId: userId,
          location: data.text[1],
          date: data.text[0],
          total: data.text[4],
          data: text
        })
    })
}

export async function getAllUserReports(userId){
    return axios({
        method: 'get',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        url: 'http://localhost:55555/api/report/user?userId=1',
      })
}

export async function getUserReport(userName, fileName){
    const url = 'http://localhost:55555/api/report/pdf?userName=' + userName + '&fileName=' + fileName
    return axios({
        method: 'get',
        // headers: {
        //     'Content-Type': 'application/json',
        // },
        url: url,
    })
}

export async function getRecentReports(userID){
    return axios({
        method: 'get',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        url: 'http://localhost:55555/api/report/recent?userId=1',
      })
}

//Temporary
export async function removeReport( userName, fileName , reportID){
    return axios({
        method: 'delete',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        url: 'http://localhost:55555/api/report/pdf',
        body: JSON.stringify({
          userName: userName,
          fileName: fileName,
          reportID: reportID
        })
    })
}
