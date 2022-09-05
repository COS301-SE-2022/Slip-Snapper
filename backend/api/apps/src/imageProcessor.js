const Jimp = require("jimp");

function convertURIToImageData(b64Data, contentType, sliceSize) {
    /*b64Data = b64Data.split(",")[1];
    const byteCharacters = Buffer.from(decodeURI(b64Data), "base64");
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;*/
    return b64Data
}

function processImage(image) {

    
        Jimp.read(image)
            .then(imageProcess => {
                imageProcess.grayscale()
                    .contrast(+1)
                    .normalize()
                    .write("./img-opt.jpg")
            })
            .catch(err => {
                console.error(err);
            });
    

}

module.exports.processImage = processImage