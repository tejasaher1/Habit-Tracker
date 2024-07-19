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
  const todayDate = new Date().getDate(); // Current day of the month
  const dailyStatus = [];

  // Generate dailyStatus array from day 1 to todayDate
  for (let day = 1; day <= todayDate; day++) {
    dailyStatus.push({ day: day, status: "Not Started" });
  }

  habit.create({ habitNames: req.body.habit, dailyStatus: dailyStatus })
    .then((result) => {
      console.log("Habit added successfully");
      return res.redirect("back");
    })
    .catch((err) => {
      console.log("Error adding habit", err);
      return res.redirect("back");
    });
};



// module.exports.changeHabitStatus = function (req, res) {
//   console.log(req.body.status);
//   console.log(req.params.id);
//   habit.findByIdAndUpdate(req.params.id, { status: req.body.status },{ new: true })
//     .then((result) => {
//       return res.status(200).json(result);
//     })
//     .catch((err) => {
//       console.log("Error deleting habit", err);
//       return res.status(500).json(err);
//     });
// };


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
      if (status.day === todayDate) {
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


module.exports.deleteHabit = function (req, res) {
  habit
    .findByIdAndDelete(req.params.id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log("Error deleting habit", err);
      return res.status(500).json(err);
    });
};



module.exports.addingNewDate = async (req, res) => {
  try{
    const habitData = await habit.findById(req.body.id);
    if (!habitData) {
      return res.status(404).json({ error: 'Habit not found' });
    } 
    console.log(habitData.dailyStatus[0]);
    habitData.dailyStatus.push({ day: req.body.date, status: "Not Started" })
    const dateAdded = await habitData.save();
    
    return res.redirect('back');

  }catch(err){
    console.log("Error adding new date", err);
    return res.status(500).json(err);
  }
};

