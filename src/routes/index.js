const express = require('express');
const router = express.Router();
const usersRouter = require('./users');
const chatroomsRouter = require('./chatrooms');

router.use('/users', usersRouter);
router.use('/chatrooms', chatroomsRouter);

module.exports = router;
