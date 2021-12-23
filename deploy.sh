#!/bin/bash

nvm use v14.17.3
rm -rf dist
npm run-script build
aws s3 sync src/assets/ s3://xflipper.io/src/assets/
cd dist
aws s3 sync . s3://xflipper.io/
aws cloudfront create-invalidation --distribution-id E1PK09PLW9LD7D --paths "/*"
cd ..