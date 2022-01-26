export default () => ({
  fdc: {
    apiKey: process.env.FDC_API_KEY,
  },
  node_env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT) || 8080,
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  buckets: {
    videos: process.env.AWS_S3_VIDEO_UPLOAD_DESTINATION_BUCKET_NAME,
    thumbnails: process.env.AWS_S3_THUMBNAIL_UPLOAD_DESTINATION_BUCKET_NAME,
  },
});
