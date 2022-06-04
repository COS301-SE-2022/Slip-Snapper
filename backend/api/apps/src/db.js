const { Pool } = require('pg')

const connection = new Pool({
    user: "",
    database: "",
    password: "",
    host: "",
    port: 0
})

function getUser(username){
    //get user from db
}

function addUser(username){
    //add user to db
}

function deleteUser(username){
    //delete user from db
}

module.exports = {
    getUser,
    addUser,
    deleteUser
}
