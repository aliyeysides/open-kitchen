export default () => ({
  awsS3: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    destinationBucketName: process.env.AWS_S3_DESTINATION_BUCKET_NAME,
  },
});
