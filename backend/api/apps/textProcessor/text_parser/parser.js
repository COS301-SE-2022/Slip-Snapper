const categorize = require("../text_categoriser/categorizer").categotize;

function parse( parser ){
    let dateOfPurchase = dateParser(text);
    let totalSlip = totalParser(text);
    let slipItems = itemsParser(text);

    return {
        date : dateOfPurchase,
        total : totalSlip,
        items : slipItems
    };
}

function dateParser ( text ){
    let result = "a";

    //Check for all dates in the text, rturn earliest

    return result;
}

function totalParser ( text ){
    let result = "a";

    //Check for total amount on slip

    return result;
}

function itemsParser ( text ){
    let result = [];

    //get all items on slip

    for (var i = 0; i < 10; i++){
        var itemName = itemNameParser(text);
        var itemType = categorize(itemName);
        var itemQuantity = itemQuantityParser(text);
        var itemPrice = itemPriceParser(text);
        var item = {
            name  : itemName,
            qunatity  : itemQuantity,
            price : itemPrice,
            type : itemType
        }

        result.push(item)
    }

    return result;
}

function itemNameParser ( text ){
    let result = "a";

    //Check for item name on slip

    return result;
}

function itemQuantityParser ( text ){
    let result = "a";

    //Check for item quantity on slip

    return result;
}

function itemPriceParser ( text ){
    let result = "a";

    //Check for item price on slip

    return result;
}

module.exports.parse = parse;
