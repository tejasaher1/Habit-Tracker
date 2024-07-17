
let color1;
let color2;
let color3;
habitsData.forEach((habit) => {
  const id = habit._id;
  color1 = document.getElementById(`color-1-${id}`);
  color2 = document.getElementById(`color-2-${id}`);
  color3 = document.getElementById(`color-3-${id}`);

  const radioInputContainer = color1.closest(".radio-input");

  if (habit.status === "done") {
    color1.checked = true;
    radioInputContainer.style.backgroundColor = "#04de04";
  } else if (habit.status === "Not Done") {
    color2.checked = true;
    radioInputContainer.style.backgroundColor = "#d50000";
  } else if (habit.status === "Not Started") {
    color3.checked = true;
    radioInputContainer.style.backgroundColor = "grey";
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
          console.log("Habit updated successfully", habit);
          const id = radio.id;
          color1 = document.getElementById(`color-1-${id}`);
          color2 = document.getElementById(`color-2-${id}`);
          color3 = document.getElementById(`color-3-${id}`);

          const radioInputContainer = color1.closest(".radio-input");

          if (habit.status === "done") {
            color1.checked = true;
            radioInputContainer.style.backgroundColor = "#04de04";
          } else if (habit.status === "Not Done") {
            color2.checked = true;
            radioInputContainer.style.backgroundColor = "#d50000";
          } else if (habit.status === "Not Started") {
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