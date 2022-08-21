const fs = require('fs')
const csvParser = require('csv-parse')

// Original Data Sets
// https://www.kaggle.com/datasets/lakritidis/product-classification-and-categorization?resource=download
// https://www.kaggle.com/datasets/heeraldedhia/groceries-dataset

const groceriesResults = [];
const priceResults = [];
const shopResults = [];
const skroutzResults = [];

async function findUniquesGroceries(){
    let uniques = [];
    let count = { total: 0 };
    
    for( const element of groceriesResults ) {
        
        if( !count[element.itemDescription] ){
            count[element.itemDescription] = 1;
            count.total++;
            let pos = Math.floor(Math.random() * stores.length);

            const newElement = {
                Date: element.Date,
                Item: element.itemDescription,
                Location: stores[pos],
                Quantity: 1,
                Price: 0.0,
                Category: "Food"
            }
            uniques.push(newElement);
            continue;
        }

        count[element.itemDescription] = count[element.itemDescription] + 1;
    }

    // console.log(count.total);
    return uniques;
}

async function cleanGroceries(){
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
            //console.table(uniques);
            console.log("Finished gathering Uniques From Groceries");
        });
}

async function findUniquesPrice(){
    let uniques = [];
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
            uniques.push(newElement);
            continue;
        }

        count[element.Cluster] = count[element.Cluster] + 1
    }

    return uniques
}

async function cleanPrice(){
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
            //console.table(uniques);
            console.log("Finished gathering Uniques From PriceRunner");
        });
}

async function findUniquesShop(){
    let uniques = [];
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
            uniques.push(newElement);
            continue;
        }

        count[element.ProductTitle] = count[element.ProductTitle] + 1
    }

    return uniques
}

async function cleanShop(){
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
            //console.table(uniques)
            console.log("Finished gathering Uniques From ShopMania");
        });
}

async function findUniquesSkrout(){
    let uniques = [];
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
            uniques.push(newElement);
            continue;
        }

        count[element.Cluster] = count[element.Cluster] + 1
    }

    return uniques
}

async function cleanSkroutz(){
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
            console.table(uniques)
            console.log("Finished gathering Uniques From Skroutz");
        });
}

async function createDataSet(){
    console.log("finished");
}

async function main(){
    // await cleanGroceries();
    // await cleanPrice();
    // await cleanShop();
    await cleanSkroutz();
    console.log("Finished Cleaning All")
}

main();
