import amqp from 'amqplib';

export async function connectToRabbitMQ(prefetch: number) {
    const connection = await amqp.connect('amqp://guest:guest@localhost:5672');
    const channel = await connection.createChannel();
    channel.prefetch(prefetch || 1);
    process.once('SIGINT', connection.close.bind(connection));
    return channel;
}


export async function publishContact(contactDetails: any) {
    const queueName = 'contacts'; // Name of the queue
    const parallel_msg_count = 5;
    const rabbitChannel = await connectToRabbitMQ(parallel_msg_count);

    await rabbitChannel.assertQueue(queueName, { durable: true });
    rabbitChannel.sendToQueue(queueName, Buffer.from(JSON.stringify(contactDetails)));
}
