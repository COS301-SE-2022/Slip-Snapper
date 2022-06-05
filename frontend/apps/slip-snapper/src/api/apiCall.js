const fetch = require('node-fetch');

export async function doProcessing(ocr){
    return fetch("http://localhost:55555/api/ocr/process", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: ocr,
        })
    })
}

export async function updateItemA(_item,userid,_name,_location,_quantity,_price,_type){
    return fetch("http://localhost:55555/api/item/update", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            itemid: _item,
            user: userid,
            name : _name,
            location : _location,
            quantity : _quantity,
            price : _price,
            type : _type
        })
    })
}

export async function getItemsA(userid){
    return fetch("http://localhost:55555/api/item/all?user="+userid, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
