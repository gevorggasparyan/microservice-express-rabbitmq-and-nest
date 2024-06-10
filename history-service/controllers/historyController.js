const HistoryService = require("../services");
const getUserHistoryById = async (req,res,next) => {
    try {
        const { userId } = req.params;
        const { limit = 10, page = 1 } = req.query;
        const offset = (page - 1) * limit;

        const histories = await HistoryService.getHistoryByUserId(userId, parseInt(limit), parseInt(offset));

        return res.json({data: histories});
    } catch (err) {
        console.warn(err)
        next(err);
    }
};

module.exports = {
    getUserHistoryById
};