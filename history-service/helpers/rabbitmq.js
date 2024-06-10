const amqp = require('amqplib');

async function connect() {
    const connection = await amqp.connect('amqp://rabbitmq:5672');
    return await connection.createChannel();
}

async function consumeMessage(queue, callback) {
    const channel = await connect();
    await channel.assertQueue(queue, { durable: false });
    channel.consume(queue, (msg) => {
        if (msg !== null) {
            callback(msg.content.toString());
            channel.ack(msg);
        }
    }, { noAck: false });
}

module.exports = {
    consumeMessage
};
