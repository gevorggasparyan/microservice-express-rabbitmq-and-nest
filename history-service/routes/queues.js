const {consumeMessage} = require("../helpers/rabbitmq");
const {createHistory} = require('../controllers')
const {CREATE_USER_QUEUE, UPDATE_USER_QUEUE} = require("../utils/constants");

const queues = async () => {
  await consumeMessage(CREATE_USER_QUEUE, async (msg) => {
    const message = JSON.parse(msg);
    console.log(`Received request in history service: ${message}`);

    await createHistory(message, 'create_user_queue')
  });

  await consumeMessage(UPDATE_USER_QUEUE, async (msg) => {
    const message = JSON.parse(msg);
    console.log(`Received request in history service: ${message}`);

    await createHistory(message, 'update_user_queue')
  });
}

module.exports = queues;