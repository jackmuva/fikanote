#!/bin/sh

echo "authenticating with aws"
aws configure

echo "Build prod optimized code:"
npm run build

echo "Syncing S3 with build"
aws s3 --region 'us-east-1' sync ./dist 's3://justfrands-frontend/'
echo "Successfully synced"

echo "Invalidating cloudfront cache"
aws cloudfront create-invalidation --distribution-id E33IAF9NS319XK --paths '/*'

echo "Successfully invalidated cloudfront cache"
