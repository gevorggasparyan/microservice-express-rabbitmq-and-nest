const {History} = require('../models');

module.exports = class HistoryService {
    static createHistory(data) {
        const { userId, action, description } = data;
        return History.create({
            userId,
            action,
            description,
            createdAt: new Date(),
        });
    }

    static getHistoryByUserId(userId, limit, offset) {
        return History.findAll({
            where: {userId},
            limit: limit,
            offset: offset,
        })
    }
};
