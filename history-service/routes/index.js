const express = require('express');
const {getUserHistoryById} = require('../controllers');

const router = express.Router();

router.get('/history/:userId', getUserHistoryById );

module.exports = router;
