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

    async createFolder(path) {

        const params = {
            Bucket: S3_BUCKET,
            Key: path, 
        };
        myBucket.putObject(params, function (err, response) {
            if (err) {
                return {
                    message: "Could not create User ."
                }
            } else {
                return {
                    message: "Successfully created User folder!"
                }
            }
        });
    }

    async uploadFile (path, file){

        const params = {
            Bucket: S3_BUCKET,
            Body: file,
            Key: path,
            ContentType: "application/pdf"  
        };
        
        myBucket.upload(params, function (err, response) {
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

        
        try {
            const deleteObject = await myBucket.deleteObject(params).promise()
            return {
                message: "Report deleted Succesfully",
            }
        }
        catch (err) {
            return {
                message: err,
            }
        }
    }

}

module.exports = {
    S3BucketFunctions
}
