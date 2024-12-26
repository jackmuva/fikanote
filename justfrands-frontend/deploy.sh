#!/bin/sh

echo "Build prod optimized code:"
npm run build

echo "Syncing S3 with build"
aws s3 --region 'us-east-1' sync ./dist 's3://justfrands-frontend/'
echo "Successfully synced"

# echo "Invalidating cloudfront cache"
# aws cloudfront create-invalidation --distribution-id E2HK6Q1FA7SBK2 --paths '/*'
# echo "Successfully invalidated cloudfront cache"
