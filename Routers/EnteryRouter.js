const express = require("express");
const router = express.Router();

const habitPageR = require("./habitsPageRouter");
const Monthly_Report = require("./Monthly_Report");
router.get("/", (req, res) => {
  return res.render("homePage");
});

router.use("/habitPage", habitPageR);

router.use("/Monthly_Report", Monthly_Report);



module.exports = router;
