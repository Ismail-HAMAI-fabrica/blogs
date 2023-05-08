//This file contains all of the other route files and is just a way to organize the project

const express = require('express');
const router = express.Router();

module.exports = router;

router.use('/auth', require('./auth.routes'));



