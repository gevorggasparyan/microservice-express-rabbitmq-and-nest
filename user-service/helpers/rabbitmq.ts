import amqp from 'amqplib';


async function createChannel() {
    const connection = await amqp.connect(process.env.RABBITMQ_URL as string);
    return await connection.createChannel();
}

async function sendMessage<T>(queue: string, message: T) {
    const channel = await createChannel();
    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    console.log(`Message sent to ${queue}`);
    setTimeout(() => {
        channel.close();
    }, 500);
}

async function consumeMessage<T>(queue: string, callback: (msg: T) => void) {
    const channel = await createChannel();
    await channel.assertQueue(queue, { durable: false });
    channel.consume(queue, (msg) => {
        if (msg !== null) {
            const content = JSON.parse(msg.content.toString()) as T;
            callback(content);
            channel.ack(msg);
        }
    }, { noAck: false });
}

export { sendMessage, consumeMessage };
