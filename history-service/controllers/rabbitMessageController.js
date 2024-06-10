const HistoryService = require('../services');

const createHistory = async (message, action) => {
    try {
        await HistoryService.createHistory({
            userId: message.userId,
            action,
            description: JSON.stringify(message.newData)
        });
    } catch (err) {
        console.warn(err.message);
    }
};

module.exports = {
    createHistory
};