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
        headers:  headers,
        method: 'post',
        url: baseUrl + 'ocr/process',
        data: JSON.stringify({image: ocr})
    })
}

/**
 * Update an item in the database
 * @param {*} item the item id
 * @param {*} name the name of the item
 * @param {*} location the location of the item
 * @param {*} quantity the quantity of the item
 * @param {*} price the price of the item
 * @param {*} type the type of the item
 * @returns response from server
 */
export async function updateItemA( item, name, location, quantity, price, type){
    return axios({
        headers: headers,
        method: 'post',
        url: baseUrl + 'item/update',
        data: JSON.stringify({
            itemid: item,
            name : name,
            location : location,
            quantity : quantity,
            price : price,
            type : type
        })
    })
}

/**
 * Get all the items from the server
 * @returns the reposnse from the server
 */
export async function getItemsA(){
    return axios({
        headers: headers,
        method: 'get',
        url: baseUrl + 'item'
    })
}

export async function setBudgetA( weekly, monthly){
    return axios({
        headers: headers,
        method: 'post',
        url: baseUrl + 'report/budget',
        data: JSON.stringify({
            weekly: weekly,
            monthly: monthly
        })
    })
}

export async function getProfileData( ){
    return axios({
        headers: headers,
        method: 'get',
        url: baseUrl + 'report/profile',
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
 * @param {*} email the users email
 * @param {*} password the users password
 * @returns response from the server
 */
export async function signupA( userName, email, password){
    return axios({
        headers: headers,
        method: 'post',
        url: baseUrl + 'user/signup',
        data: JSON.stringify({
          email: email,
          username: userName,
          password: password,
        })
    })
}

export async function generateReportA( userName, period,newReportNumber ){
    return axios({
        headers: headers,
        method: 'post',
        url: baseUrl + 'report/pdf',
        data: {
            userName: userName,
            period: period,
            newReportNumber: newReportNumber
        }
    })
}

export async function getStatsA(  ){
    return axios({
        headers: headers,
        method: 'get',
        url: baseUrl + 'report/statistics',
      })
}

/**
 * To add an item
 * @param {*} data the data of the item
 * @param {*} text the slip data of the item
 * @returns the response from the server
 */
export async function addItemsA( data, text){
    return axios({
        headers: headers,
        method: 'post',
        url: baseUrl + 'item',
        data: JSON.stringify({
          location: data.text[1],
          date: data.text[0],
          total: data.text[4],
          data: text
        })
    })
}

export async function getAllUserReports(){
    return axios({
        headers: headers,
        method: 'get',
        url: baseUrl + 'report/user' ,
      })
}

export async function getUserReport(userName, fileName){
    return axios({
        headers: headers,
        method: 'get',
        url: baseUrl + 'report/pdf?userName=' + userName + '&fileName=' + fileName,
    })
}

export async function getRecentReports(){
    return axios({
        headers: headers,
        method: 'get',
        url: baseUrl + 'report/recent',
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

/**
 * To get all the slips for a user
 * @returns response from the server
 */
export async function getAllSlips() {
    return axios({
        headers: headers,
        method: 'get',
        url: baseUrl + 'item/slip' ,
    })
}

export async function getThisWeeksReports() {
    return axios({
        headers: headers,
        method: 'get',
        url: baseUrl + 'report/thisweek',
    })
}

/**
 * To update a slip and its related items
 * @param {*} updateSlip slip contents to update
 * @param {*} insertItems the items to be added
 * @param {*} updateItems the items to be updated
 * @param {*} removeItems the items to be removed
 * @returns the response from the server
 */
export async function updateSlipA(  updateSlip, insertItems,updateItems, removeItems){
    return axios({
        headers: headers,
        method: 'patch',
        url: baseUrl + 'item/slip',
        data: JSON.stringify({
            updateSlip: updateSlip,
            insertItems: insertItems,
            updateItems: updateItems, 
            removeItems: removeItems
        })
    })
}

export async function getTodayStats() {
    return axios({
        headers: headers,
        method: 'get',
        url: baseUrl + 'report/today',
    })
}

export async function setGeneralBudget( budgets){
    return axios({
        headers: headers,
        method: 'post',
        url: baseUrl + 'report/otherBudgets',
        data: JSON.stringify({
            budgets: budgets,
        })
    })
}

/**
 * To delete a slip from the db
 * @param {*} slipId the slipId
 * @returns the response from the server
 */
export async function deleteSlip( slipId ){
    return axios({
        headers: headers,
        method: 'delete',
        url: baseUrl + 'item/slip',
        data: JSON.stringify({
          slipId: slipId,
        })
    })
}

/**
 * To retrieve data for graphs
 * @param {*} slipId the slipId
 * @returns the response from the server
 */

export async function getGraphStats() {
    return axios({
        headers: headers,
        method: 'get',
        url: baseUrl + 'item/graph',
    })
}