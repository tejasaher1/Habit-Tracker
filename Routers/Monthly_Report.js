const express = require("express");
const router = express.Router();

const MonthlyReportController = require('../Controllers/MonthlyReportController');

router.get('/', MonthlyReportController.MonthlyReport);

router.post("/changeHabitStatus/:id", MonthlyReportController.changeHabitStatus);


module.exports = router;
