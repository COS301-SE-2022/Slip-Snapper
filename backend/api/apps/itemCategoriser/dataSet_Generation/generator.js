const fs = require('fs')
const csvParser = require('csv-parse')

// Original Data Sets
// https://www.kaggle.com/datasets/lakritidis/product-classification-and-categorization?resource=download
// https://www.kaggle.com/datasets/heeraldedhia/groceries-dataset

const groceriesResults = [];
const priceResults = [];
const shopResults = [];
const skroutzResults = []


async function findUniquesGroceries(){
    let uniques = { total : 0}

    for( const element of groceriesResults ) {
        element["category"] = "Food";
        if(!uniques[element.itemDescription]){
            uniques[element.itemDescription] = {count: 1, element: element};
            uniques.total++;
            continue;
        }

        uniques[element.itemDescription].count = uniques[element.itemDescription].count + 1
        uniques[element.itemDescription].element = element;
    }

    return uniques
}

async function cleanGroceries(){
    const groceries = fs.createReadStream('./dataSets/Groceries_dataset.csv')

    groceries.pipe(csvParser.parse({ columns:true, relax_quotes:true , delimiter: "," }))
        .on("data", function (row) {
            groceriesResults.push(row)
        })
        .on("error", function (error) {
            console.log(error.message);
        })
        .on("end", async function () {
            console.log("finished");
            let uniques = await findUniquesGroceries();
            console.log(uniques);
        });
}

async function findUniquesPrice(){
    let uniques = { total : 0}

    for( const element of priceResults ) {
        if(!uniques[element.Cluster]){
            uniques[element.Cluster] = {count: 1, element: element};
            uniques.total++;
            continue;
        }

        uniques[element.Cluster].count = uniques[element.Cluster].count + 1
        uniques[element.Cluster].element = element;
    }

    return uniques
}

async function cleanPrice(){
    const price = fs.createReadStream('./dataSets/pricerunner_aggregate.csv')

    price.pipe(csvParser.parse({ columns:true, relax_quotes:true , delimiter: "," }))
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
            console.log("finished");
            let uniques = await findUniquesPrice();
            console.log(uniques);
        });
}

async function cleanShop(){
    const shop = fs.createReadStream('./dataSets/shopmania.csv')
    
    shop.pipe(csvParser.parse({ columns:true, relax_quotes:true , delimiter: "," }))
        .on('headers', (headers) => {
            console.log(headers)
        })
        .on("data", function (row) {
            shopResults.push(row)
        })
        .on("error", function (error) {
            console.log(error.message);
        })
        .on("end", function () {
            console.log("finished");
            console.log(shopResults[0])
            let uniques = await findUniquesPrice();
            //console.table(uniques)
        });
}

async function cleanSkroutz(){
    const skroutz = fs.createReadStream('./dataSets/skroutz_aggregate.csv')
    
    skroutz.pipe(csvParser.parse({ columns:true, relax_quotes:true , delimiter: "," }))
    .on('headers', (headers) => {
        console.log(headers)
    })
    .on("data", function (row) {
        skroutzResults.push(row)
    })
    .on("error", function (error) {
        console.log(error.message);
    })
    .on("end", function () {
        console.log("finished");
        console.table(skroutzResults)
    });
}

async function createDataSet(){
    console.log("finished");
}

async function main(){
    // await cleanGroceries();
    await cleanPrice();
}

main();
