// script.js
console.log(habitsData);

document.addEventListener("DOMContentLoaded", () => {
  const daysElement = document.getElementById("days");
  // const monthElement = document.getElementById('monthName');

  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();



  // monthElement.textContent = monthNames[month];

  // const firstDayOfMonth = new Date(year, month, 1).getDay();
  let daysInMonth = new Date(year, month + 1, 0).getDate();

  // Fill in the days
  // for (let i = 0; i < firstDayOfMonth; i++) {
  //   const emptyDay = document.createElement('div');
  //   emptyDay.classList.add('empty');
  //   daysElement.appendChild(emptyDay);
  // }


  // Adding all days in month list table
  for (let i = 1; i <= daysInMonth; i++) {
    const day = document.createElement("th");
    day.textContent = i;
    daysElement.appendChild(day);
  }


  habitsData.forEach((habit) => {
    const habitTableRow = document.getElementById(habit._id);
    const todaysDate = date.getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      if (i == todaysDate) {
        // Check for today's date and create a new cell and append it to the table.
        const day = document.createElement("td");
        day.style.cursor = "pointer";
        // We are doing todaysDate-1 because in array index statrt with zero.
        let status = habit.dailyStatus[todaysDate-1].status;
        console.log("The status is " + status);
        let habitStatus = status === "done" ? "done" : status === "Not Done" ? "Not Done" : "Not Started";
        day.addEventListener("click",function(e) {
           if(habitStatus === "done"){
            //  console.log(habit._id);
            habitStatus = status === "done" ? "done" : status === "Not Done" ? "Not Done" : "Not Started";
            // If user want to change status then send ajax request to change status.
              $.ajax({
                  url: `/Monthly_Report/changeHabitStatus/${habit._id}`,
                  method: "post",
                  data: { id: habit._id, status: "Not Done" , date: i},
                  success: function(response) {
                    // If the response was successful then update the status accordingly in DOM.
                    console.log("Habit status changed successfully", response);
                    day.innerHTML = "";
                    day.style.backgroundColor = "red";
                    day.innerHTML = `
                            <i class="fa-solid fa-xmark"></i>
                        `;
                    habitStatus = "Not Done";
                  },
                  error: function(error) {
                    console.log("Error changing habit status", error);
                  }
                 
              })
           }else if(habitStatus === "Not Done"){
            habitStatus = status === "done" ? "done" : status === "Not Done" ? "Not Done" : "Not Started";
            // If user want to change status then send ajax request to change status.
            $.ajax({
                url: `/Monthly_Report/changeHabitStatus/${habit._id}`,
                method: "post",
                data: { id: habit._id, status: "Not Started" , date: i},
                success: function(response) {
                  // If the response was successful then update the status accordingly in DOM.
                  console.log("Habit status changed successfully", response);
                  day.innerHTML = "";
                  day.style.backgroundColor = "grey";
                  habitStatus = "Not Started";
                },
                error: function(error) {
                  console.log("Error changing habit status", error);
                },  
            })
           }else if(habitStatus === "Not Started"){
              habitStatus = status === "done" ? "done" : status === "Not Done" ? "Not Done" : "Not Started";
              $.ajax({
                url: `/Monthly_Report/changeHabitStatus/${habit._id}`,
                method: "post",
                data: { id: habit._id, status: "done" , date: i},
                success: function(response) {
                  // If the response was successful then update the status accordingly in DOM.
                  console.log("Habit status changed successfully", response);
                  day.innerHTML = "";
                  day.style.backgroundColor = "green";
                  day.innerHTML = `
                            <i class="fa-solid fa-check">  </i>
                        `;
                  habitStatus = "done";
                },
                error: function(error) {
                  console.log("Error changing habit status", error);
                },  
            })
           }
        });

        // Add the efects and status to the table according to the status in DB
        if (habitStatus === "done") {
          day.style.backgroundColor = "green";
          day.innerHTML = `
                     <i class="fa-solid fa-check">  </i>
                `;
        } else if (habitStatus === "Not Done") {
          day.style.backgroundColor = "red";
          day.innerHTML = `
                     <i class="fa-solid fa-xmark"></i>
                `;
        } else {
          day.style.backgroundColor = "grey";
        }
        habitTableRow.appendChild(day);
      } 
      
      else {
        // If the day is not today then create a new cell and append it to the table.
        if(i < todaysDate){
          const day = document.createElement("td");
          day.style.cursor = "pointer";
          // Check the status of the habit date. 
          let status = habit.dailyStatus[i-1].status;
          console.log("The status is " + status);
          let habitStatus = status === "done" ? "done" : status === "Not Done" ? "Not Done" : "Not Started";
          day.addEventListener("click",function(e) {
             if(habitStatus === "done"){
              //  console.log(habit._id);
              habitStatus = status === "done" ? "done" : status === "Not Done" ? "Not Done" : "Not Started";
              // If user want to change status then send ajax request to change status.
                $.ajax({
                    url: `/Monthly_Report/changeHabitStatus/${habit._id}`,
                    method: "post",
                    data: { id: habit._id, status: "Not Done" , date: i},
                    success: function(response) {
                      console.log("Habit status changed successfully", response);
                      day.innerHTML = "";
                      day.style.backgroundColor = "red";
                      day.innerHTML = `
                              <i class="fa-solid fa-xmark"></i>
                          `;
                      habitStatus = "Not Done";
                    },
                    error: function(error) {
                      console.log("Error changing habit status", error);
                    }
                   
                })
             }else if(habitStatus === "Not Done"){
              habitStatus = status === "done" ? "done" : status === "Not Done" ? "Not Done" : "Not Started";
              $.ajax({
                  url: `/Monthly_Report/changeHabitStatus/${habit._id}`,
                  method: "post",
                  data: { id: habit._id, status: "Not Started", date: i },
                  success: function(response) {
                    // If the response was successful then update the status accordingly in DOM.
                    console.log("Habit status changed successfully", response);
                    day.innerHTML = "";
                    day.style.backgroundColor = "grey";
                    habitStatus = "Not Started";
                  },
                  error: function(error) {
                    console.log("Error changing habit status", error);
                  },  
              })
             }else if(habitStatus === "Not Started"){
                habitStatus = status === "done" ? "done" : status === "Not Done" ? "Not Done" : "Not Started";
                $.ajax({
                  url: `/Monthly_Report/changeHabitStatus/${habit._id}`,
                  method: "post",
                  data: { id: habit._id, status: "done", date: i },
                  success: function(response) {
                    // If the response was successful then update the status accordingly in DOM.
                    console.log("Habit status changed successfully", response);
                    day.innerHTML = "";
                    day.style.backgroundColor = "green";
                    day.innerHTML = `
                              <i class="fa-solid fa-check">  </i>
                          `;
                    habitStatus = "done";
                  },
                  error: function(error) {
                    console.log("Error changing habit status", error);
                  },  
              })
             }
          });
  
  
          if (habitStatus === "done") {
            day.style.backgroundColor = "green";
            day.innerHTML = `
                       <i class="fa-solid fa-check">  </i>
                  `;
          } else if (habitStatus === "Not Done") {
            day.style.backgroundColor = "red";
            day.innerHTML = `
                       <i class="fa-solid fa-xmark"></i>
                  `;
          } else {
            day.style.backgroundColor = "grey";
          }
          habitTableRow.appendChild(day);
        }
        else{
          // Remaining days which are not from 1 to todays date will add in table rows without any effect and listeners.
          const day = document.createElement("td");
          habitTableRow.appendChild(day);
        }
        }
    }
  });
});
