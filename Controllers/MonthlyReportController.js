const habit = require("../Model/habitModel");


module.exports.MonthlyReport = function (req, res) {
    habit.find()
    .then((result) => {
        return res.render("reportView", {
            habits: result,
        });
        })
    .catch((err) => {
        console.log("Error fetching habit", err);
    });
};



module.exports.changeHabitStatus = function (req, res) {
    console.log(req.body.status);
    console.log(req.params.id);
    habit.findByIdAndUpdate(req.params.id,{ status: req.body.status },{ new: true })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log("Error deleting habit", err);
      return res.status(500).json(err);
    }) 
  };
