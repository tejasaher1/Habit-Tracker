
let color1;
let color2;
let color3;
const todayDate = new Date().getDate();

habitsData.forEach((habit) => {

  // habit.dailyStatus[todayDate - 1] === undefined ;
  // Check is today date is present in array of habit dailyStatus.

  if(habit.dailyStatus[todayDate - 1] !== undefined && habit.dailyStatus[todayDate - 1].day === todayDate){
    const id = habit._id;
    color1 = document.getElementById(`color-1-${id}`);
    color2 = document.getElementById(`color-2-${id}`);
    color3 = document.getElementById(`color-3-${id}`);

    const radioInputContainer = color1.closest(".radio-input");

    if (habit.dailyStatus[todayDate - 1].status === "done") {
      color1.checked = true;
      radioInputContainer.style.backgroundColor = "#04de04";
    } else if (habit.dailyStatus[todayDate - 1].status === "Not Done") {
      color2.checked = true;
      radioInputContainer.style.backgroundColor = "#d50000";
    } else if (habit.dailyStatus[todayDate - 1].status === "Not Started") {
      color3.checked = true;
      radioInputContainer.style.backgroundColor = "grey";
    }
  }else {
    // If today's date is not present in habit's daily status, then we need to add today's date in array.
    console.log("date is - ",todayDate);
    $.ajax({
      url:  "/habitPage/addingNewDate",
      method: "post",
      data: { id: habit._id, date: todayDate, status: "Not Started" },
      success: (habit) => {
        console.log("Success");
      },
      error: (error) => {
        console.log("Error", error);
      }
    })
  }

});

document.addEventListener("DOMContentLoaded", function () {
  const radioInputs = document.querySelectorAll(".radio-input label");
  radioInputs.forEach((radio) => {
    radio.addEventListener("click", function () {
      
      // Update habit status using AJAX request
      $.ajax({
        url: `/habitPage/changeHabitStatus/${radio.id}`,
        method: "post",
        data: { id: radio.id, status: radio.dataset.comment },
        success: (habit) => {
          const todayDate = new Date().getDate();
          let status = habit.dailyStatus[todayDate-1].status;
          console.log("Habit updated successfully",habit.dailyStatus[todayDate-1].status);
          const id = radio.id;
          color1 = document.getElementById(`color-1-${id}`);
          color2 = document.getElementById(`color-2-${id}`);
          color3 = document.getElementById(`color-3-${id}`);

          const radioInputContainer = color1.closest(".radio-input");

          if (status === "done") {
            color1.checked = true;
            radioInputContainer.style.backgroundColor = "#04de04";
          } else if (status === "Not Done") {
            color2.checked = true;
            radioInputContainer.style.backgroundColor = "#d50000";
          } else if (status === "Not Started") {
            color3.checked = true;
            radioInputContainer.style.backgroundColor = "grey";
          }
        },
        error: (error) => {
          console.log("Error updating habit", error);
        },
      });
    });
  });
});




document.addEventListener("DOMContentLoaded", function () {
  const deleteButtons = document.querySelectorAll(".button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Delete habit using AJAX request
      
      $.ajax({
        url: `/habitPage/deleteHabit/${button.id}`,
        method: "post",
        success: (response) => {
          console.log("Habit deleted successfully", response);
          button.closest("#habits").remove();
        },
        error: (error) => {
          console.log("Error deleting habit", error);
        },
      });
    });
  });
});