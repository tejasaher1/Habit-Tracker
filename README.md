Habit Tracker - 
    
      A simple web application to help you track and manage your daily habits. You can add multiple habits, track each habit daily with statuses, and view your progress over a month. 
    This project provides a basic but functional habit tracker with an intuitive UI.
    
    
    * Key Features of a Habit Tracker :
      1] Add Multiple Habits: Track various habits like reading a book, going to the gym, etc.
      2] Daily Tracking: Mark each habit daily with one of the three statuses:
          Done: The habit is completed for the day.
          Not Done: The habit is not completed for the day.
          None: No action taken on the habit for the day.
      3] View Current Habits: A page to show all current habits with an add button to introduce new habits.
      4] 30-Day View: Display each habit's status for the past 7 days, including today.
      5] Status Toggle: Change the status of any habit for today or any of the previous 6 days.
      6] Default User: A default user is created with habits attached (no authentication required).
      7] Data Storage: All data is stored in a database.
      8] Bonus Feature: Track the longest streak and the number of days the user has completed the habit since creation.
    
    
    
    * Project Structure - 
    
      CSV-Upload/
    	|
    	├── Assets/
    	│   ├── css/
    	│        ├── footer.css
            │	 └── habitPage.css
            |        └── header.css
            |        └── homePage.css
            |        └── viewReportCSS.css
    	│   └── image/
            |        └── Image-1.jpg
    	│   └── JavaScript/
    	│        └── habitPage.js
            |        └── viewReport.js
    	│ 
    	├── Config/
    	│   ├── mongoose.js
    	│
    	├── controllers/
    	│   ├── habitPageController.js
    	│   └── MonthlyReportController.js
    	│
    	├── models/
    	│   └── habitModel.js
    	│
    	├── Routers/
    	│   ├── EnterRouter.js
            |   └── habitsPageRouter.js
            |   └── Monthly_Report.js
    	│   
    	│
    	├── views/
    	│   ├── footer.ejs
        	│   └── habitPage.ejs
            |   └── header.ejs
            |   └── homePage.ejs
            |   └── reportView.ejs    
            |
    	│
    	├── .env
    	├── .gitignore
    	├── package-lock.json
    	├── package.json
    	├── README.md
    	└── server.js
    
    
    
    * Prerequisites - 
      1- Node.js
      2- npm (Node Package Manager)
      3- MongoDB
    
    
    * Setup - 
      1- Clone the repository:
         git clone https://github.com/tejasaher1/Habit-Tracker
         cd habit tracker
      2- Install dependencies:
         npm install
      3- Set up MongoDB:
         Make sure MongoDB is running on your local machine. You can use MongoDB Atlas for cloud MongoDB or any other MongoDB instance.
      4- Create a .env file:
         PORT=8080
         MONGODB_URI=your_mongodb_connection_string
      5- Run the project:
         npm start
      6- Access the project:
         Open your browser and navigate to http://localhost:3000
    
     * Usage
       1- Add Habit:
          a - Click the "Add Habit" button on the main page.
          b - Enter the name of the habit you want to track and click "Add".
       2- Track Habits:
          a - On the main page, you will see a list of all habits.
          b - Click on a habit to view the 30-day tracking view.
          c - For each day, click on the status to toggle between "Done", "Not Done", and "None".
       3- View and Edit Habit Status:
          a - The 30-day view allows you to see and change the status of each habit for today and the previous days.
    
    
      * Dependencies-
         Express
         Mongoose
         EJS
         Path
         dotenv
         nodemon
         body-parser
