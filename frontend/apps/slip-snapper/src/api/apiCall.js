const axios = require('axios');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
}

//const baseUrl = 'https://slipsnapper.herokuapp.com/api/'
const baseUrl = 'http://localhost:3000/api/'

/**
 * To process the text extracted by OCR
 * @param {*} ocr the extracted text
 * @returns the response as a promise
 */
export async function doProcessing(ocr){
    return axios({
        headers: headers,
        method: 'post',
        url: baseUrl + 'ocr/process',
        data: JSON.stringify({
            text: ocr,
        })
    })
}

/**
 * Update an item in the database
 * @param {*} item the item id
 * @param {*} userId the user id
 * @param {*} name the name of the item
 * @param {*} location the location of the item
 * @param {*} quantity the quantity of the item
 * @param {*} price the price of the item
 * @param {*} type the type of the item
 * @returns response from server
 */
export async function updateItemA( item, userId, name, location, quantity, price, type){
    return axios({
        headers: headers,
        method: 'post',
        url: baseUrl + 'item/update',
        data: JSON.stringify({
            itemid: item,
            user: userId,
            name : name,
            location : location,
            quantity : quantity,
            price : price,
            type : type
        })
    })
}

export async function getItemsA(userId){
    return axios({
        headers: headers,
        method: 'get',
        url: baseUrl + 'item/all?userId=' + userId
    })
}

export async function setBudgetA( userId, weekly, monthly){
    return axios({
        headers: headers,
        method: 'post',
        url: baseUrl + 'report/budget',
        data: JSON.stringify({
            userId: userId,
            weekly: weekly,
            monthly: monthly
        })
    })
}

export async function getProfileData( userId ){
    return axios({
        headers: headers,
        method: 'get',
        url: baseUrl + 'report/profile?userId='+userId,
    })
}

/**
 * To log a user in to the system
 * @param {*} userName the users username
 * @param {*} password the users password
 * @returns response ffrom the server
 */
export async function loginA( userName, password){
    return axios({
        headers: headers,
        method: 'post',
        url: baseUrl + 'user/login',
        data: JSON.stringify({
            username: userName,
            password: password
        })
    })
}

/**
 * To sign a user up
 * @param {*} userName the users username
 * @param {*} first the users first name
 * @param {*} last the user last name
 * @param {*} password the users password
 * @returns response from the server
 */
export async function signupA( userName, first, last, password){
    return axios({
        headers: headers,
        method: 'post',
        url: baseUrl + 'user/signup',
        data: JSON.stringify({
          firstname: first,
          lastname: last,
          username: userName,
          password: password,
        })
    })
}

export async function generateReportA( userName, userId, period ){
    return axios({
        headers: headers,
        method: 'post',
        url: baseUrl + 'report/pdf',
        data: {
            userName: userName,
            userId: userId,
            period: period
        }
    })
}

export async function getStatsA( userId ){
    return axios({
        headers: headers,
        method: 'get',
        url: baseUrl + 'report/statistics?userId='+userId,
      })
}

export async function addItemsA( userId, data, text){
    return axios({
        headers: headers,
        method: 'post',
        url: baseUrl + 'item/add',
        data: JSON.stringify({
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
        headers: headers,
        method: 'get',
        url: baseUrl + 'report/user?userId='+ userId,
      })
}

export async function getUserReport(userName, fileName){
    return axios({
        headers: headers,
        method: 'get',
        url: baseUrl + 'report/pdf?userName=' + userName + '&fileName=' + fileName,
    })
}

export async function getRecentReports(userId){
    return axios({
        headers: headers,
        method: 'get',
        url: baseUrl + 'report/recent?userId='+ userId,
      })
}

export async function removeReport( userName, fileName , reportId){
    return axios({
        headers: headers,
        method: 'delete',
        url: baseUrl + 'report/pdf',
        data: JSON.stringify({
          userName: userName,
          fileName: fileName,
          reportID: reportId
        })
    })
}

export async function getAllSlips(userId) {
    return axios({
        headers: headers,
        method: 'get',
        url: baseUrl + 'item/slip?userId=' + userId,
    })
}

export async function getThisWeeksReports(userId) {
    return axios({
        headers: headers,
        method: 'get',
        url: baseUrl + 'report/thisweek?userId=' + userId,
    })
}

export async function updateSlipA( userId, updateSlip, insertItems,updateItems, removeItems){
    return axios({
        headers: headers,
        method: 'post',
        url: baseUrl + 'item/slip',
        data: JSON.stringify({
            userId: userId,
            updateSlip: updateSlip,
            insertItems: insertItems,
            updateItems: updateItems, 
            removeItems: removeItems
        })
    })
}

export async function getTodayStats(userId) {
    return axios({
        headers: headers,
        method: 'get',
        url: baseUrl + 'report/today?userId=' + userId,
    })
}

export async function setGeneralBudget( userId, budgets){
    return axios({
        headers: headers,
        method: 'post',
        url: baseUrl + 'report/otherBudgets',
        data: JSON.stringify({
            userId: userId,
            budgets: budgets,
        })
    })
}
