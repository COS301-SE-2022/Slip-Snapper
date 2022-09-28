const fs = require('fs')
const csvParser = require('csv-parse');
const csvWriter = require('csv-stringify');

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
                Item: element.itemDescription,
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
                Item: element.Cluster,
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
                Item: element.ProductTitle,
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
                Item: element.Cluster,
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

async function checkCategories(){
    return new Promise((resolve)=>{
        let count = { total: 0 };
        for( const element of allResults ) {
            if( !count[element.Category] ){
                count[element.Category] = 1;
                count.total++;
                continue;
            }
    
            count[element.Category] = count[element.Category] + 1;
        }
        
        console.table(count)
        resolve(true)
    })
}

async function updateCategories(){
    return new Promise(async (resolve)=>{
        let food = [
            'Food', 'Feeding', 'Alcoholic Drinks', 'Non-alcoholic drinks', 'Sweets & Chocolate'
        ];
        let electronis = [ 
            'Mobile Phones', 'CPUs', 'Digital Cameras', 'Audio / Video Equipment', 'GPS Accessories', 'GPS Receivers', 'Cell Phones Accessories', 'Phones & Faxes',
            'Smartwatches', 'Cables & Adapters', 'Notebook Accessories', 'PDA Accessories', 'Printer Accessories', 'System Accessories', 'Tablet Accessories',
            'Card Readers', 'Cases and Power Supplies', 'Cooling Fans', 'Network Adapters', 'UPS', 'Desktops', 'Servers', 'Consumables', 'IT services', 'All-In-Ones',
            'Gaming Accessories', 'Keyboards & Mice', 'Office software', 'Operating systems', 'Other software', 'Security', 'External Memory', 'SSD', 'Hubs',
            'Network Accessories', 'Routers', 'Wireless Networking', '3D Multimedia Equipment', 'Audio Systems', 'CD Players', 'DVD & Blu-Ray Players', 'Speakers',
            'Digital Camera and Camcorder Accessories', 'Audio / DJ Equipment', 'Barcode readers & Accessories', 'Batteries', 'Headphones', 'Microphones', 
            'Projector Accessories', 'Remote controllers', 'Optical Tools', 'MP3 and MP4 Player Accessories', 'Supports', 'Electrical & Electronic components',
            'DSLR Cameras', 'Compact Cameras', 'Mirrorless Cameras', 'Analog Cameras'
        ];
        let fashion = [ 
            'Belts', 'Bags & Backpacks', 'Handbags & Wallets', 'Hats and gloves', 'Jewelry', 'Other Accessories', 'Scarves and wraps', 'Sunglasses', 'Watches',
            'Baby & Children Apparel', 'Men Footwear', 'Men Lingerie', 'Men\'s Clothing', 'Maternity Apparel', 'Women Footwear', 'Women\'s Clothing', 
            'Women\'s Lingerie', 'Homewear', 'Safety Gear', 'Wedding and Bridal Articles', 'Women\'s Watches', 'Men\'s Watches'
        ];
        let household = [ 
            'TVs', 'Microwaves', 'Dishwashers', 'Washing Machines', 'Freezers', 'Fridge Freezers', 'Fridges', 'Home Decor', 'Toys', 'DVDs', 'Games', 'Music', 
            'Home Cinema', 'Projectors', 'Home Entertainment', 'Radios', 'Calculators', 'Digital Picture Frames', 'Christmas Items & Decorations', 'Fragrance',
            'Air Compressors & Accessories', 'Measuring & Layout Tools', 'Plumbing Accessories', 'Plumbing Supplies', 'Power Tools', 'Tools', 'Building supplies',
            'Furniture', 'Garden & Outdoors', 'Home Improvement', 'Kitchen & Dining', 'Pet Supply', 'Pets', 'Rugs  Tapestry & Linens', 'Solar Panels & Accessories', 
            'Air Conditioners', 'Air Purifiers', 'Dehumidifiers', 'Fan Heaters', 'Fans', 'Heaters', 'Humidifiers', 'Stoves & Fireplaces', 'Chest Freezers', 
            'Grills & Ovens', 'Refrigerators', 'Vacuum Cleaners', 'Lighting', 'Bread Makers', 'Coffee Makers & Grinders', 'Food Grinders & Mills', 'Food Steamers',
            'Ice Cream Makers', 'Juicers', 'Mixers & blenders', 'Other Kitchen Appliances', 'Toasters & Sandwich Makers', 'Irons', 'Other Small Appliances',
            'Party Supplies', 'Office Equipment', 'Office Supplies', 'Televisions', 'Cookers & Ovens', 'Home Air Conditioners - Inverters'
        ];
        let hobby = [ 
            'Collectibles', 'Crafts', 'Esoteric and Occult Products', 'Books', 'Flowers', 'Body Art', 'Fitness', 'Sewing Machines', 'Board Games', 'Make-up & Costumes',
            'Adult', 'Gadget', 'Industrial Gear', 'Magazines', 'Musical Instruments', 'Baseball & Softball', 'Basketball', 'Bikes & Accessories', 'Boats & Accessories',
            'Boxing & Martial Arts', 'Camping', 'Climbing', 'Darts', 'Fishing', 'Football', 'Golf', 'Hockey & Ice Skating', 'Hunting', 'Other Sports', 
            'Paintball & Airsoft', 'Skateboarding & Skating', 'Snowboarding & Ski', 'Soccer', 'Table tennis', 'Tennis', 'Volleyball', 'Water Sports'
        ]
        let vehicle = [
            'Auto Accessories', 'Car Kits', 'Moto Accessories', 'Motorcycle', 'Wheels', 'Car & Boat Batteries'
        ]
        let healthCare = [
            'Health & Safety', 'Bath & Body', 'Medicine', 'Men Cosmetics', 'Optical Supplies & Eyeglasses', 'Personal Care', 'Various Natural Products',
            'Vitamins & Supplements', 'Women Cosmetics', 'Cleaning Supplies', 'Hair Care', 'Medical Supplies'
        ]
        let other = [
            'Baby gear', 'Other gifts', 'Supplies'
        ]

        console.log('Updating Categories')
        for( let i = 0; i < allResults.length; i++ ) {
            if( food.includes(allResults[i].Category) ){
                allResults[i].Category = 'Food'
                continue;
            }

            if( household.includes(allResults[i].Category) ){
                allResults[i].Category = 'Household'
                continue;
            }
            
            if( electronis.includes(allResults[i].Category) ){
                allResults[i].Category = 'Electronics'
                continue;
            }

            if( other.includes(allResults[i].Category) ){
                allResults[i].Category = 'Other'
                continue;
            }

            if( vehicle.includes(allResults[i].Category) ){
                allResults[i].Category = 'Vehicle'
                continue;
            }

            if( healthCare.includes(allResults[i].Category) ){
                allResults[i].Category = 'Healthcare'
                continue;
            }

            if( fashion.includes(allResults[i].Category) ){
                allResults[i].Category = 'Fashion'
                continue;
            }

            if( hobby.includes(allResults[i].Category) ){
                allResults[i].Category = 'Hobby'
                continue;
            }
        }
        await checkCategories();
        resolve(true)
    })
}

async function createDataSet(){
    return new Promise(async (resolve) => {
        await updateCategories();
        
        const fileName = 'fullDataSet.csv';
        const file = fs.createWriteStream( fileName );
        const columns = ['Item', 'Category'];
        const stringy = csvWriter.stringify( { header: true, columns: columns } );
        
        let num = 0;
        for(const item of allResults){
            const ran = Math.random();

            if( (item.Category == 'Other' || item.Category == 'Vehicle' || item.Category == 'Food') && ran < 0.5){
                stringy.write(item);
                num++;
            }

            if(( item.Category == 'Electronics' || item.Category == 'Healthcare' ) && ran < 0.025){
                stringy.write(item);
                num++;
            }

            if(( item.Category == 'Hobby') && ran < 0.02){
                stringy.write(item);
                num++;
            }

            if(( item.Category == 'Household') && ran < 0.01){
                stringy.write(item);
                num++;
            }

            if((item.Category == 'Fashion' ) && ran < 0.008){
                stringy.write(item);
                num++;
            }
        }
        stringy.pipe(file)
        console.log("Finished Creating Data Set. Items: ", num);

        resolve();
    })
}

async function main(){
    await cleanGroceries();
    await cleanPrice();
    await cleanShop();
    await cleanSkroutz();
    console.log("Finished Cleaning All sets. Items:", allResults.length); 

    await createDataSet();
    console.log("Dataset has been created and is saved")
}

main();
