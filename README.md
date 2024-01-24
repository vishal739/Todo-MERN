# TODO Application

## Overview
This repository contains the source code for a TODO application built with the MERN (MongoDB, Express.js, React, Node.js) stack. The application provides features for user authentication using JSON Web Tokens (JWT) and supports CRUD (Create, Read, Update, Delete) operations for tasks.

## Tech Stack
- **Frontend:**
  - React
  - JavaScript (ES6+)
  - HTML
  - SCSS (for styling)

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (Atlas for cloud-based database storage)
  - JWT for user authentication
  - Bcrypt for password hashing

## Features
1. **User Authentication:**
   - Secure user registration and login using JWT.
   - Token-based authentication for secure API requests.

2. **Task Management:**
   - Create new tasks with a title, status, and optional due date.
   - View a list of tasks with their details.
   - Update task details using PUT and PATCH requests.
   - Delete tasks with a DELETE request.

3. **Database:**
   - MongoDB used as the backend database.
   - User data and task data stored on the cloud (MongoDB Atlas).

## Setup Instructions
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/todo-mern.git
