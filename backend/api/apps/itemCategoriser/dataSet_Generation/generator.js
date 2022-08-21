const fs = require('fs')
const csvParser = require('csv-parse')

// Original Data Sets
// https://www.kaggle.com/datasets/lakritidis/product-classification-and-categorization?resource=download
// https://www.kaggle.com/datasets/heeraldedhia/groceries-dataset

let groceriesResults = [];
let priceResults = [];
let shopResults = [];
let skroutzResults = [];
let allResults = []

async function findUniquesGroceries(){
    let count = { total: 0 };

    for( const element of groceriesResults ) {
        
        if( !count[element.itemDescription] ){
            count[element.itemDescription] = 1;
            count.total++;

            const newElement = {
                Date: element.Date,
                Item: element.itemDescription,
                Location: '',
                Quantity: 1,
                Price: 0.0,
                Category: "Food"
            }
            allResults.push(newElement);
            continue;
        }

        count[element.itemDescription] = count[element.itemDescription] + 1;
    }

    return true;
}

async function cleanGroceries(){
    return new Promise((resolve) => {
        fs.createReadStream('./dataSets/Groceries_dataset.csv')
            .pipe(csvParser.parse({ columns:true, relax_quotes:true , delimiter: "," }))
            .on("data", function (row) {
                groceriesResults.push(row)
            })
            .on("error", function (error) {
                console.log(error.message);
            })
            .on("end", async function () {
                let uniques = await findUniquesGroceries();
                console.log("Finished gathering Uniques From Groceries");
                resolve(true);
            });
    })
}

async function findUniquesPrice(){
    let count = { total: 0 };

    for( const element of priceResults ) {
        if(!count[element.Cluster]){
            count[element.Cluster] = 1;
            count.total++;

            const newElement = {
                Date: '',
                Item: element.Cluster,
                Location: '',
                Quantity: 1,
                Price: 0.0,
                Category: element.Category
            }
            allResults.push(newElement);
            continue;
        }

        count[element.Cluster] = count[element.Cluster] + 1
    }

    return true;
}

async function cleanPrice(){
    return new Promise((resolve) => {
        fs.createReadStream('./dataSets/pricerunner_aggregate.csv')
            .pipe(csvParser.parse({ columns:true, relax_quotes:true , delimiter: "," }))
            .on('headers', (headers) => {
                console.log(headers)
            })
            .on("data", function (row) {
                priceResults.push(row)
            })
            .on("error", function (error) {
                console.log(error.message);
            })
            .on("end", async function () {
                let uniques = await findUniquesPrice();
                console.log("Finished gathering Uniques From PriceRunner");
                resolve(true)
            });
    })  
    
}

async function findUniquesShop(){
    let count = { total: 0 };

    for( const element of shopResults ) {
        if(!count[element.ProductTitle]){
            count[element.ProductTitle] = 1;
            count.total++;

            const newElement = {
                Date: '',
                Item: element.ProductTitle,
                Location: '',
                Quantity: 1,
                Price: 0.0,
                Category: element.Category
            }
            allResults.push(newElement);
            continue;
        }

        count[element.ProductTitle] = count[element.ProductTitle] + 1
    }

    return true
}

async function cleanShop(){
    return new Promise((resolve) => {
        fs.createReadStream('./dataSets/shopmania.csv')
            .pipe(csvParser.parse({ columns:true, relax_quotes:true , delimiter: "," }))
            .on('headers', (headers) => {
                console.log(headers)
            })
            .on("data", function (row) {
                shopResults.push(row)
            })
            .on("error", function (error) {
                console.log(error.message);
            })
            .on("end", async function () {
                let uniques = await findUniquesShop();
                console.log("Finished gathering Uniques From ShopMania");
                resolve(true);
            });
    })
    
}

async function findUniquesSkrout(){
    let count = { total: 0 };

    for( const element of skroutzResults ) {
        if(!count[element.Cluster]){
            count[element.Cluster] = 1;
            count.total++;

            const newElement = {
                Date: '',
                Item: element.Cluster,
                Location: '',
                Quantity: 1,
                Price: 0.0,
                Category: element.Category
            }
            allResults.push(newElement);
            continue;
        }

        count[element.Cluster] = count[element.Cluster] + 1
    }

    return true;
}

async function cleanSkroutz(){
    return new Promise((resolve) => {
        fs.createReadStream('./dataSets/skroutz_aggregate.csv')
            .pipe(csvParser.parse({ columns:true, relax_quotes:true , delimiter: "," }))
            .on('headers', (headers) => {
                console.log(headers)
            })
            .on("data", function (row) {
                skroutzResults.push(row)
            })
            .on("error", function (error) {
                console.log(error.message);
            })
            .on("end", async function () {
                let uniques = await findUniquesSkrout();
                console.log("Finished gathering Uniques From Skroutz");
                resolve(true);
            });
    })
    
}

async function createDataSet(){
    console.log("finished");
}

async function main(){
    await cleanGroceries();
    await cleanPrice();
    await cleanShop();
    await cleanSkroutz();

    console.log("Finished Cleaning All sets. Items:", allResults.length)

    
}

main();
