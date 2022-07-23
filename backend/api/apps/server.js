const db = require('./src/db')
const { makeApp } = require('./src/index.js');
const parser = require("./textProcessor/text_parser/parser");

const app = makeApp( db, parser);

app.listen(process.env.PORT || 55555, () =>{
    console.log('Server ready');
})
