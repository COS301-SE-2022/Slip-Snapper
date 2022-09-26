const Jimp = require("jimp");
const jo = require('jpeg-autorotate');

/**
 * method to process the image for tesseract
 * @param {*} image data url of image
 */
async function processImage(image) {
    const b64Data = image.split(",")[1];
    var returnImage = ""; 
    var bufferOfImg = Buffer.from(b64Data, 'base64')

    await jo.rotate(Buffer.from(b64Data, 'base64'), {quality: 100}) 
    .then(({buffer ,orientation, dimensions, quality}) => {
        console.log(`Orientation was ${orientation}`)
        console.log(`Dimensions after rotation: ${dimensions.width}x${dimensions.height}`)
        console.log(`Quality: ${quality}`)
        bufferOfImg = buffer;
    })
    .catch((error) => { 
        if (error.code === jo.errors.correct_orientation) {
            console.log("orientation is correct")
        }
        if (error.code === jo.errors.read_exif) {
            console.log('no exif')
        }
        if (error.code === jo.errors.no_orientation) {
            console.log('no orientation')
        }


    })

    await Jimp.read(bufferOfImg)
        .then(imageProcess => {
            imageProcess.greyscale()
                .normalize()
                .contrast(0.7)
                .quality(90)
                .getBase64(Jimp.AUTO, async (err, img) => {
                if (err) {
                    returnImage = "Error processing image";
                }
               
                returnImage = img;
            });
        })
        .catch(err => {
            console.error(err);
            returnImage = "Error processing image";
        });



    return returnImage;
}

module.exports = {
    processImage
}