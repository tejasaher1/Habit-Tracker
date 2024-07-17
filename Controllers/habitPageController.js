const habit = require("../Model/habitModel");

module.exports.habitPage = (req, res) => {
  habit.find()
  .then((result) => {
    return res.render("habitPage", {
      habits: result,
    });
  })
  .catch((err) => {
    console.log("Error fetching habit", err);
  });
};

module.exports.addHabit = (req, res) => {
  console.log(new Date().getDate().toString());
  habit.create({ habitNames: req.body.habit, status: "Not Started" })
  .then((result) => {
    console.log("Habit added successfully");
    return res.redirect("back");
  })
  .catch((err) => {
    console.log("Error adding habit", err);
    return res.redirect("back");
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

module.exports.deleteHabit = function (req, res) {
  habit.findByIdAndDelete(req.params.id)
  .then((result) => {
    return res.status(200).json(result);
  })
  .catch((err) => {
    console.log("Error deleting habit", err);
    return res.status(500).json(err);
  }) 
};
