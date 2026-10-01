# TaskFlow

TaskFlow is a lightweight full-stack task management app designed to help people organize work in a simple, visual way. It gives users a clean interface for creating tasks, assigning ownership, tracking progress, prioritizing work, and managing deadlines. Instead of juggling scattered notes or spreadsheets, users can manage everything in one place through a single dashboard.

At a high level, TaskFlow helps teams and individuals:

- keep track of what needs to get done
- see which tasks are pending, in progress, or complete
- assign work to specific people
- sort tasks by urgency or due date
- maintain a clear workflow without needing a heavy enterprise tool

## Overview

This project demonstrates a complete CRUD workflow for task management using a modern frontend and backend stack:

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB with Mongoose
- API: RESTful endpoints for task operations
- UX: task creation, filtering, sorting, status tracking, and deletion

TaskFlow is a practical example of how a small production-style web application is structured: the frontend communicates with a backend API, the API interacts with a database, and users can manipulate real stored records through the interface.

## What the App Does

TaskFlow acts like a mini project or personal workflow manager. Users can:

- add a new task with a title and optional description
- assign the task to a teammate or individual
- choose a task priority (low, medium, or high)
- set a due date
- mark the task as To Do, In Progress, or Done
- filter the list to focus on specific work
- sort tasks based on urgency, newest additions, or due dates
- delete tasks that are no longer needed

This makes it useful for simple team workflows, personal to-do lists, study planning, sprint planning, or project tracking in a small organization.

## Key Features

- Create new tasks with a title, description, priority, assignee, and due date
- View all tasks in a single task dashboard
- Filter the board by task status
- Sort tasks by newest, oldest, priority, or due date
- Update a task status in place without leaving the list
- Delete completed or outdated tasks
- Persist task data to MongoDB so information remains available between sessions
- Validate required fields such as the task title and assignee before creating tasks

## Project Structure

```text
taskflow/
├── client/                  # React frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── server/                  # Express API server
│   ├── models/
│   ├── routes/
│   ├── package.json
│   ├── server.js
│   └── .env.example (if added locally)
├── README.md
└── package.json (not currently present at root)
```

## Tech Stack

### Frontend

- React 19
- Vite
- Axios
- CSS

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- CORS
- dotenv

## Prerequisites

Before running the app, make sure you have:

- Node.js installed (v18+ recommended)
- npm or pnpm
- MongoDB running locally or a MongoDB Atlas connection string

## Installation

1. Clone the repository.
2. Install frontend dependencies:

```bash
cd client
npm install
```

3. Install backend dependencies:

```bash
cd ../server
npm install
```

## Environment Configuration

Create a `.env` file in the `server` directory with the following values:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskflow
```

If you are using MongoDB Atlas, replace the `MONGO_URI` value with your Atlas connection string.

Example:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskflow
```

## Running the Application

### Start the backend

```bash
cd server
npm run dev
```

This starts the Express server with nodemon, which automatically restarts when server files change.

### Start the frontend

In a new terminal:

```bash
cd client
npm run dev
```

The Vite app should start in development mode and provide a local URL such as:

```text
http://localhost:5173
```

The frontend calls the backend at:

```text
http://localhost:5000/api/tasks
```

## API Endpoints

The backend server exposes the following REST endpoints under `/api/tasks`:

### Create a task

```http
POST /api/tasks
```

Request body example:

```json
{
  "title": "Prepare sprint review",
  "description": "Share status and blockers with the team",
  "priority": "high",
  "assignedTo": "Alice",
  "dueDate": "2026-10-10"
}
```

### Get all tasks

```http
GET /api/tasks
```

### Update a task

```http
PUT /api/tasks/:id
```

Example:

```json
{
  "status": "done"
}
```

### Delete a task

```http
DELETE /api/tasks/:id
```

## Task Model

Each task is stored in MongoDB with the following fields:

```js
{
  title: String,
  description: String,
  status: "todo" | "in-progress" | "done",
  priority: "low" | "medium" | "high",
  assignedTo: String,
  dueDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Usage

1. Open the frontend in the browser.
2. Add a task using the form on the left side of the app.
3. Assign a title, priority, assignee, and optional due date.
4. View tasks in the list below.
5. Filter by status and sort by priority or due date.
6. Change a task's status or delete it when completed.

## Development Notes

- The backend uses Express middleware for JSON parsing and CORS.
- Mongoose connects to MongoDB at startup.
- The frontend uses `axios` to communicate with the backend API.
- The backend is intentionally simple and ideal for learning full-stack CRUD patterns.

## Production Considerations

For a production-ready deployment, consider:

- using environment-based configuration for both frontend and backend
- securing MongoDB credentials
- adding authentication and authorization
- handling validation and error states more robustly
- containerizing the app with Docker
- deploying the frontend and backend on separate hosting platforms

## License

This project is currently provided as an educational or personal project without a specified license.

## Summary

TaskFlow is a lightweight full-stack task tracking app that highlights the core patterns of modern web development: React for the user interface, Express for API services, and MongoDB for persistent storage. It is a practical example of a small business or productivity tool that helps users stay organized, manage work efficiently, and track task progress over time.

In short, TaskFlow is a simple but complete task management system designed for planning, tracking, and prioritizing work in a clean and easy-to-use interface.
