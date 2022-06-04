const db = require('./src/db')
const { makeApp } = require('./src/index.js');

const app = makeApp(db);

app.listen(55555, () =>{
    console.log('Server ready');
})
