export default () => ({
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  buckets: {
    videos: process.env.AWS_S3_VIDEO_UPLOAD_DESTINATION_BUCKET_NAME,
    thumbnails: process.env.AWS_S3_THUMBNAIL_UPLOAD_DESTINATION_BUCKET_NAME,
  },
});
