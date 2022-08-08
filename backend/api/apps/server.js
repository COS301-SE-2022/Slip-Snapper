const db = require('./src/db')
const parser = require("./textProcessor/text_parser/parser");

const { TokenFunctions } = require('./src/token')

const { makeApp } = require('./src/index.js');

const token = new TokenFunctions()

const app = makeApp( db, parser, token);

app.listen(process.env.PORT || 3000, () =>{
    console.log('Server ready');
})
