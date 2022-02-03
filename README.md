## Installation

After cloning the repo for the first time, you will need to install Lerna, the monorepo management tool. This will install all dependencies in the root `package.json`:

```
cd foyir-mono/
npm run i
```

Once you have lerna, you can install the dependencies for all apps that live in the `packages` directory **(server & client)**:

```
lerna boostrap
```

## Environment Variables

You will need to create a `.env` file in the root directory with the following values provided:

```.env
PORT=8080
NODE_ENV=development
AWS_ACCESS_KEY_ID=XXX
AWS_SECRET_ACCESS_KEY=XXX
AWS_S3_VIDEO_UPLOAD_DESTINATION_BUCKET_NAME=foyir-videos
AWS_S3_THUMBNAIL_UPLOAD_DESTINATION_BUCKET_NAME=foyir-thumbnails
FDC_API_KEY=XXX
FDC_API_URL=https://api.nal.usda.gov/fdc
```

## Local Development

Run the local dev server. This command serves both the GraphQL server and React client:

```
npm run start:dev
```
