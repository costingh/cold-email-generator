#!/bin/bash

# Define variables for the RabbitMQ container
CONTAINER_NAME="dev-rabbit"
RABBITMQ_IMAGE="rabbitmq:management"
RABBITMQ_PORT="5672"
MANAGEMENT_PORT="15672"
RABBITMQ_USERNAME="guest"
RABBITMQ_PASSWORD="guest"

# Pull the RabbitMQ image
echo "Pulling RabbitMQ image..."
docker pull $RABBITMQ_IMAGE

# Run the RabbitMQ container
echo "Starting RabbitMQ container..."
docker run -d --name $CONTAINER_NAME --hostname rabbitmq-dev \
    -p $MANAGEMENT_PORT:15672 -p $RABBITMQ_PORT:5672 \
    -e RABBITMQ_DEFAULT_USER=$RABBITMQ_USERNAME \
    -e RABBITMQ_DEFAULT_PASS=$RABBITMQ_PASSWORD \
    $RABBITMQ_IMAGE

# Check if RabbitMQ container is running
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    echo "RabbitMQ container '$CONTAINER_NAME' is now running on ports $RABBITMQ_PORT and $MANAGEMENT_PORT."
else
    echo "Failed to start RabbitMQ container. Check Docker logs for details."
fi

# Display container logs
echo "Container logs:"
docker logs -f $CONTAINER_NAME

echo "To access RabbitMQ management, open http://localhost:$MANAGEMENT_PORT in your web browser and log in using the credentials:"
echo "Username: $RABBITMQ_USERNAME"
echo "Password: $RABBITMQ_PASSWORD"
