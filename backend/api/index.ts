const express = require('express');
const fs = require('fs');

const app = express();

// const bodyParser = require('body-parser');
// app.use(bodyParser.json());

app.listen(1234, () =>{
    console.log('Server ready');
})

app.get('/example',async(req,res)=>{
    console.log(req.body);

    fs.readFile( __dirname + "/" + "database.json", 'utf8', function (err, data) {
        res.status(200).end(data);
    });
})