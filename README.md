[![CircleCI](https://circleci.com/gh/aliyeysides/foyir-mono/tree/master.svg?style=svg&circle-token=c58371ac247a3add31bac2fffb1f597469e2f30c)](https://circleci.com/gh/aliyeysides/foyir-mono/tree/master)

## Prerequisites

You need to have Node verion 14.16.1 installed. The easiet way to install this version is to use `nvm` tool. [nvm installation instruction](https://github.com/nvm-sh/nvm) . There is also an alternative for Windows [installation and usage](https://github.com/coreybutler/nvm-windows)

When you have `nvm` run `nvm install 14.16.1` to install the right version of the node. The command will set your default version of node as well.

Install `lerna` as a global package: `sudo npm install --g lerna`

Make sure you have a `mongodb` instance running locally. Using docker: `docker run -d -p 27017:27017 --name local-db mongo` or using CLI: [instructions](https://zellwk.com/blog/local-mongodb/)

## Installation

After cloning the repo for the first time, you will need to install Lerna, the monorepo management tool. This will install all dependencies in the root `package.json`:

```
cd foyir-mono/
npm i
```

Once you have lerna, you can install the dependencies for all apps that live in the `packages` directory **(server & client)**:

```
lerna bootstrap
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

Frontend: `http://localhost:3000/`
GraphQL: `http://localhost:8080/graphql`

Note: Video uploads won't work unless you provide a proper API key, even for local development.
