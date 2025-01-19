#!/bin/sh
echo "Pre-Build Steps:"
echo "authenticating with AWS ECR"
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 982081060019.dkr.ecr.us-east-1.amazonaws.com

echo "Build Steps:"
echo "Building node project"
npm run build

echo "Building Docker container"
docker build -f Dockerfile -t fikanote/fikanote-backend:latest .

echo "Post-Build steps:"
echo "pushing image to AWS ECR"
docker tag fikanote/fikanote-backend:latest 982081060019.dkr.ecr.us-east-1.amazonaws.com/fikanote/fikanote-backend:latest
docker push 982081060019.dkr.ecr.us-east-1.amazonaws.com/fikanote/fikanote-backend:latest

echo "updating AWS ECS service..."
#aws ecs update-service --cluster rag-cluster --service paratodemo-service --force-new-deployment
