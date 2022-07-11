const { categorize } = require("../text_categoriser/categorizer");

/**
 * 
 * @param {*} text array of slip text
 * @returns array of slip date, location, total amount and items
 */
function parse(text) {
    let correctedText = textCorrection(text)
    let dateOfPurchase = dateParser(correctedText);
    let locationOfSlip = locationParser(correctedText);
    let totalSlip = totalParser(correctedText);
    let slipItems = itemsParser(correctedText);

    let numItems = slipItems.length

    const slip = [
        dateOfPurchase,
        locationOfSlip,
        slipItems,
        numItems,
        totalSlip,
    ]

    return slip;
}


/**
 * 
 * @param {*} text array of ocr scanned text 
 * @returns array of text with some correction to aid in parsing
 */
function textCorrection(text) {
    var correctedText = []

    for (let i = 0; i < text.length; i++) {

        var str = text[i].toLowerCase();

        if (text[i] != " " && text[i] != '') {
            correctedText.push(
                str.replaceAll(",", ".")
                    .replaceAll("(", " ")
                    .replaceAll(")", " ")
                    .replaceAll("=", " ")
            )
        }

    }

    return correctedText;
}


/**
 * 
 * @param {*} text array of slip text
 * @returns first string - location, will change 
 */
function locationParser(text) {
    const regexp = new RegExp("[a-z0-9\s]*", "igm")
    var result = text[0].match(regexp);
    var locationString = "";
    if (result != null) {
        for (let i = 0; i < result.length; i++) {
            if (result[i] != '') {
                locationString += result[i] + " ";
            }
        }
        locationString = locationString.slice(0, -1);
    } else {
        locationString = "N/A";
    }

    return locationString;
}

/**
 * 
 * @param ocr text
 * @returns date of receipt
 */

function dateParser(text) {
    var day, month, year;
    string = ""

    for (let i = 0; i < text.length; i++) {
        string += text[i] + " "
    }

    result = string.match("[0-9]{2}([\-/\.])[0-9]{2}[\-/\.][0-9]{4}");
    if (null != result) {
        dateSplitted = result[0].split(result[1]);
        day = dateSplitted[0];
        month = dateSplitted[1];
        year = dateSplitted[2];
    } else {
        result = string.match("[0-9]{4}([\-/\.])[0-9]{2}[\-/\.][0-9]{2}");
        if (null != result) {
            dateSplitted = result[0].split(result[1]);
            day = dateSplitted[2];
            month = dateSplitted[1];
            year = dateSplitted[0];
        } else {
            result = string.match("[0-9]{2}([\-/\.])[0-9]{2}[\-/\.][0-9]{2}");
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

/**
 * 
 * @param ocr text
 * @returns total of slip (largest value at the moment)
 */

function totalParser(text) {
    const regexp = new RegExp("[0-9]+([.])[0-9]{2}", "g")
    var result = []
    for (let i = 0; i < text.length; i++) {
        if (text[i].match(regexp) != null)
            result.push(text[i].match(regexp))
    }

    var total = 0.0

    if (result != null) {
        for (let i = 0; i < result.length; i++) {
            for (let n = 0; n < result[i].length; n++) {
                if (total < parseFloat(result[i][n])) {
                    total = parseFloat(result[i][n]);
                }
            }
        }
        return total;
    } else {
        return "N/A";
    }
}

/**
 * 
 * @param {*} text array of line text from ocr
 * @returns array of arrays of items
 */
function itemsParser(text) {
    const receiptRegex = /^\s*(\d*)\s*(.*\S)\s+(\(?)([0-9]+[.][0-9]{2})\)*/gm
    let items = [];

    for (let i = 0; i < text.length; i++) {
        if (text[i].match(receiptRegex) != null) {
            const matches = text[i].matchAll(receiptRegex)

            for (const matchedGroup of matches) {
                var [
                    fullString,
                    quantity,
                    item,
                    space,
                    price
                ] = matchedGroup;

                if (!fullString.includes("total") && !fullString.includes("change") && !fullString.includes("cash")
                    && !fullString.includes("vat ") && !fullString.includes("items") && !fullString.includes("amount") && !fullString.includes("%")) {

                    if (quantity == "") {
                        quantity = '1';
                    }

                    const type = categorize(item);
                    items.push({
                        quantity,
                        item,
                        price,
                        type,
                    }
                    );
                }
            }
        }
    }

    if (items.length == 0) {
        let quantity = "";
        let item = "";
        let price = "";
        let type = "";

        item = {
            quantity,
            item,
            price,
            type,
        }
        return [item]
    }

    return items;
}

module.exports.parse = parse;
