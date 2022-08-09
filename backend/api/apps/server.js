const db = require('./src/db')
const parser = require("./textProcessor/text_parser/parser");

const { TokenFunctions } = require('./src/token')
const { S3BucketFunctions } = require("./src/S3Bucket")
const { makeApp } = require('./src/index.js');

const token = new TokenFunctions()
const bucket = new S3BucketFunctions()

const app = makeApp( db, parser, token, bucket);

app.listen(process.env.PORT || 3000, () =>{
    console.log('Server ready');
})
