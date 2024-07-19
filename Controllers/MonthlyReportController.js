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



// module.exports.changeHabitStatus = function (req, res) {
//     console.log(req.body.status);
//     console.log(req.params.id);
//     habit.findByIdAndUpdate(req.params.id,{ status: req.body.status },{ new: true })
//     .then((result) => {
//       return res.status(200).json(result);
//     })
//     .catch((err) => {
//       console.log("Error deleting habit", err);
//       return res.status(500).json(err);
//     }) 
//   };




  module.exports.changeHabitStatus = async function (req, res) {
    const todayDate = new Date().getDate();
    try {
      // Find the habit and check if dailyStatus for today already exists
      const habitData = await habit.findById(req.params.id);
      if (!habitData) {
        return res.status(404).json({ error: 'Habit not found' });
      }
  
      // Check if the status for today exists
      let statusUpdated = false;
      habitData.dailyStatus.forEach((status) => {
        // console.log(typeof(status.day), typeof(req.body.date));
        if (status.day == req.body.date) {
          status.status = req.body.status;
          statusUpdated = true;
        }
      });
  
      // If not found, add a new status entry for today
  
      // Save the updated habit
      const updatedHabit = await habitData.save();
  
      return res.status(200).json(updatedHabit);
  
    } catch (err) {
      console.log("Error updating habit status", err);
      return res.status(500).json(err);
    }
  };