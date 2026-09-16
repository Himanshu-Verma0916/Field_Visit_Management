const express = require('express');
const summaryRouter = express.Router();
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

const { getSummary } = require('../controllers/summaryController');

summaryRouter.get('/', auth, role('HQ_APPROVER', 'ADMIN'), getSummary);

module.exports= summaryRouter;