const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
})
const S3_BUCKET = process.env.AWS_S3_BUCKET
const REGION = process.env.AWS_REGION

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION
})

class S3BucketFunctions {

    async uploadFile (path, dir){
        const params = {
            Bucket: S3_BUCKET,
            Body: dir,
            Key: path,          //needs to be in the form of user/name.pdf
            contentType: 'application/pdf'
        };
        myBucket.putObject(params, function (err, response) {
            if (err) {
                return {
                    message: "Could not upload Report."
                }
            } else {
                return {
                    message: "Successfully uploaded Report!"
                }
            }
        });
    }

    async getFile(path) {

        const params = {
            Bucket: S3_BUCKET,
            Key: path
        };
        try {
            const value = await myBucket.getObject(params).promise();
            return {
                message: "Report retrieved Succesfully",
                data: value.Body
            }
        }
        catch (err) {
            return {
                message: err,
                data: []
            }
        }
    }

    async deleteFile(path) {
        const myBucket = new AWS.S3({
            params: { Bucket: S3_BUCKET },
            region: REGION,
        });

        const params = {
            Bucket: S3_BUCKET,
            Key: path,
        };

        myBucket.deleteObject(params, function (err, data) {
            if (err) {
                return{
                    message: err
                };
            }
            else {
                return{
                    message:"File has been deleted successfully"
                };
            }
        });
    }

}

module.exports = {
    S3BucketFunctions
}
