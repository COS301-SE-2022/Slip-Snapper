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
    uploadFile = () => {
        const params = {
            Body: "",
            Bucket: S3_BUCKET,
            Key: "Regan/"
        };
        myBucket.putObject(params)
            .send((err) => {
                if (err) console.log(err)
            })
    }


}