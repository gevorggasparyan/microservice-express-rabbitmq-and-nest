const {getUserHistoryById} = require('./historyController');
const {createHistory} = require('./rabbitMessageController');

module.exports = {
    getUserHistoryById,
    createHistory
};