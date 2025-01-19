#!/bin/sh

echo "authenticating with aws"
aws configure

echo "Pre-Build Steps:"
echo "authenticating with AWS ECR"
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 982081060019.dkr.ecr.us-east-1.amazonaws.com

echo "Build Steps:"
echo "Building node project"
npm run build

echo "Building Docker container"
docker build -f Dockerfile -t fikanote/fikanote-backend:latest --platform linux/amd64 .

echo "Syncing S3 with build"
aws s3 --region 'us-east-1' sync ./env 's3://fikanote-env/'
echo "Successfully synced"

echo "Post-Build steps:"
echo "pushing image to AWS ECR"
docker tag fikanote/fikanote-backend:latest 982081060019.dkr.ecr.us-east-1.amazonaws.com/fikanote/fikanote-backend:latest
docker push 982081060019.dkr.ecr.us-east-1.amazonaws.com/fikanote/fikanote-backend:latest

echo "updating AWS ECS service..."
aws ecs update-service --cluster fikanote-cluster --service fikanote-backend-service --force-new-deployment
