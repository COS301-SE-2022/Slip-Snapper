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

export async function getBudgetA( userid, weekly, monthly){
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
