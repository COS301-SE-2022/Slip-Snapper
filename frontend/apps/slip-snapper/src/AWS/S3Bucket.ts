import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: '',
    secretAccessKey: ''
})
const S3_BUCKET = '';
const REGION = '';

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
})

export default class S3BucketFunctions {
    uploadFile = (path:string) => {
        const params = {
            Body: "",
            Bucket: S3_BUCKET,
            Key: path
        };
        // myBucket.putObject(params)
        //     .send((err) => {
        //         if (err) console.log(err)
        //     })
    }

     getFile(path:string) {
         const params = {
             Bucket: S3_BUCKET,
             Key: path
         };
        try {
            myBucket.getObject(params, (err, data) => {
                if (err) {
                    console.log(err, err.stack);
                } else {
                    if(data.Body!==undefined)
                    console.log(data.Body.toString());
                }
            });
        }
        catch (err) {
            console.log(err)
        }
    }
    // deleteFile = (path:string) =>{
    //     const params = { Bucket: S3_BUCKET, Key: path };
    //     console.log("TESTS")
    //     myBucket.deleteObject(params, function (err, data) {
    //         if (err) console.log(err, err.stack);  // error
    //         else console.log();                 // deleted
    //     });
    // }
}