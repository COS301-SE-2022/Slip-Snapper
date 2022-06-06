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
    var day, month, year;

    result = text.match("[0-9]{2}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{4}");
    if (null != result) {
        dateSplitted = result[0].split(result[1]);
        day = dateSplitted[0];
        month = dateSplitted[1];
        year = dateSplitted[2];
    } else {
        result = text.match("[0-9]{4}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{2}");
        if (null != result) {
            console.log(true)
            dateSplitted = result[0].split(result[1]);
            day = dateSplitted[2];
            month = dateSplitted[1];
            year = dateSplitted[0];
        } else {
            result = text.match("[0-9]{2}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{2}");
            if (null != result) {

                dateSplitted = result[0].split(result[1]);
                day = dateSplitted[0];
                month = dateSplitted[1];
                year = "20" + dateSplitted[2];
            }
        }
    }
    if (month > 12) {
        aux = day;
        day = month;
        month = aux;
    }
    if (result == null) {
        var today = new Date();
        var day = String(today.getDate()).padStart(2, '0');
        var month = String(today.getMonth() + 1).padStart(2, '0');
        var year = today.getFullYear();

        return year + "/" + month + "/" + day;
    }

    return year + "/" + month + "/" + day;
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
