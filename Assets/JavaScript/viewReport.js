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
        const day = document.createElement("td");
        day.style.cursor = "pointer";
        let status = habit.dailyStatus[todaysDate-1].status;
        console.log("The status is " + status);
        let habitStatus = status === "done" ? "done" : status === "Not Done" ? "Not Done" : "Not Started";
        day.addEventListener("click",function(e) {
           if(habitStatus === "done"){
            //  console.log(habit._id);
            habitStatus = status === "done" ? "done" : status === "Not Done" ? "Not Done" : "Not Started";
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
                data: { id: habit._id, status: "Not Started" , date: i},
                success: function(response) {
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
      
      else {
        if(i < todaysDate){
          const day = document.createElement("td");
          day.style.cursor = "pointer";
          let status = habit.dailyStatus[i-1].status;
          console.log("The status is " + status);
          let habitStatus = status === "done" ? "done" : status === "Not Done" ? "Not Done" : "Not Started";
          day.addEventListener("click",function(e) {
             if(habitStatus === "done"){
              //  console.log(habit._id);
              habitStatus = status === "done" ? "done" : status === "Not Done" ? "Not Done" : "Not Started";
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
          const day = document.createElement("td");
          habitTableRow.appendChild(day);
        }
        }
    }
  });
});
