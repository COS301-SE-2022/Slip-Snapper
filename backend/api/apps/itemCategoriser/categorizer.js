const { getDataItems } = require("../../apps/src/db")

let items;

async function setItems(){
    items = await getDataItems()
}

setItems()

function categorize( text ){
    for(var item of items.items){
        if (item.item == text){
            return item.itemType
        }
    }

    return "other";
}

module.exports.categorize = categorize;
