const express = require("express");
const router = express.Router();

const habitPageController = require("../Controllers/habitPageController");

router.get("/", habitPageController.habitPage);

router.post("/addHabit", habitPageController.addHabit);

router.post("/changeHabitStatus/:id", habitPageController.changeHabitStatus);

router.post("/deleteHabit/:id", habitPageController.deleteHabit);

router.post("/addingNewDate", habitPageController.addingNewDate);

module.exports = router;
