const fetch = require('node-fetch');

export async function doProcessing(ocr){
    return fetch("http://localhost:55555/api/ocr/process", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: ocr,
        })
    })
}

export async function updateItemA(_item,userid,_name,_location,_quantity,_price,_type){
    return fetch("http://localhost:55555/api/item/update", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
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
    return fetch("http://localhost:55555/api/item/all?userId="+userid, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export async function setBudgetA( userid, weekly, monthly){
    return fetch("http://localhost:55555/api/report/budget", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userid,
            weekly: weekly,
            monthly: monthly
        })
    })
}

export async function getBudgetA( userid ){
    return fetch("http://localhost:55555/api/report/budget?userId=1", {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export async function loginA( username, password){
    return fetch("http://localhost:55555/api/user/login", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
}

export async function signupA( username, first, last, password){
    return fetch('http://localhost:55555/api/user/signup', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: first,
          lastname: last,
          username: username,
          password: password,
          isBusiness: false,
          email: ""
        })
    })
}

export async function generateReportA( url ){
    return fetch(url, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      })
}

export async function getStatsA( userId ){
    return fetch('http://localhost:55555/api/report/statistics?userId=1', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      })
}

export async function addItemsA( userId, data, text){
    return fetch('http://localhost:55555/api/item/add', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
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
    return fetch('http://localhost:55555/api/report/user?userId=1', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      })
}

export async function getUserReport(userName, fileName){
    const url = 'http://localhost:55555/api/report/pdf?userName=' + userName + '&fileName=' + fileName
    return fetch(url, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export async function getRecentReports(userID){
    return fetch('http://localhost:55555/api/report/recent?userId=1', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      })
}

//Temporary
export async function removeReport( userName, fileName , reportID){
    return fetch('http://localhost:55555/api/report/pdf', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: userName,
          fileName: fileName,
          reportID: reportID
        })
    })
}
