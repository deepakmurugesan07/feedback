Customer Feedback Management System
Overview

The Customer Feedback Management System is a full-stack web application designed to collect and manage customer feedback efficiently.
It allows users to submit feedback along with ratings, comments, and product details, and provides analytical insights such as total feedback count, average ratings, and per-day submissions.

This system helps businesses understand customer satisfaction trends and respond effectively to feedback.

Features

Add new customer feedback with name, rating, comment, product, and response fields.

Filter feedbacks to display only high ratings (≥ 4).

View key statistics such as:

Total feedbacks submitted

Count of high-rated feedbacks

Feedbacks per day

JWT-based authentication and secure user session management.

Fully responsive design with a modern dashboard interface.

Integration between frontend and backend for real-time data updates.

Tech Stack
Layer	Technology
Frontend	React.js, Axios, Bootstrap, Custom CSS
Backend	Node.js, Express.js
Database	MySQL
Authentication	JSON Web Token (JWT)
Tools	Visual Studio Code, Git, npm
Project Structure
feedback-system/
│
├── backend/                  # Node.js + Express Backend
│   ├── server.js
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   └── package.json
│
├── frontend/                 # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── DashboardPage.js
│   ├── public/
│   ├── package.json
│
└── README.md

Installation and Setup
1. Clone the Repository
git clone https://github.com/deepakm-07/feedback-system.git
cd feedback-system

2. Backend Setup
cd backend
npm install
npm start


The backend will start on:
👉 http://localhost:5000

Make sure your MySQL database is running and configured properly in your backend connection file.

3. Frontend Setup
cd ../frontend
npm install
npm start


The frontend will start on:
👉 http://localhost:3000

API Endpoints
Method	Endpoint	Description
GET	/feedbacks	Fetch all feedbacks
POST	/feedbacks	Add a new feedback
POST	/login	Authenticate user
POST	/register	Register a new user
How It Works

User logs in to access the dashboard.

User submits feedback (customer name, rating, comment, product, and optional response).

The backend validates the data and stores it in MySQL.

The dashboard displays all feedbacks with filtering and sorting options.

Statistics are automatically updated in real-time when new feedbacks are added.

Future Enhancements

Edit and delete feedback functionalities.

Data visualization with charts for better insights.

Export feedback data to Excel or PDF.

Email or SMS notifications for new feedback.

Multi-role system (Admin/User).

Author

Deepak M
Full Stack Developer (MERN Stack)
SDLC Namakkal Graduate
GitHub: https://github.com/deepakm-07