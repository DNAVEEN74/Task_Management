
# Task Management Application

A simple, intuitive Task Management application built with React, TypeScript, and Recoil for state management. The backend is developed using Node.js and Express, providing an efficient way to manage and track tasks across various states. The application supports drag-and-drop functionality, priority setting, and a calendar view to keep tasks organized.

## Features

- **Add, Edit, and Delete Tasks**: Create tasks with details like title, description, deadline, and priority. Edit and delete tasks directly from the UI.
- **Task States**: Tasks are categorized into "To Do," "On Progress," and "Completed" states.
- **Drag-and-Drop**: Move tasks between states by dragging and dropping them into different columns.
- **Priority Levels**: Set task priorities to "Low," "Medium," or "High" for better organization.
- **Custom Calendar View**: Use a calendar to set and view deadlines, customized using `react-calendar`.
- **Responsive UI**: The interface is responsive and built with Tailwind CSS.

## Technologies Used

### Frontend
- **React** and **TypeScript** for building a component-based UI.
- **Recoil** for state management.
- **Axios** for making HTTP requests to the backend.
- **Tailwind CSS** for styling.

### Backend
- **Node.js** and **Express** for handling API requests.
- **MongoDB** for data storage (tasks and states).
- **REST API** endpoints for CRUD operations on tasks.

## Project Structure

### Frontend Components

1. **TasksBoard**: Manages the display of tasks by state (To Do, On Progress, Completed). It includes the drag-and-drop functionality and dynamically updates lists when tasks are moved.
2. **TodoCard**: Displays individual tasks, allowing dragging, priority indication, and deletion.
3. **AddTaskCard**: A form for creating new tasks with fields for title, description, deadline, and priority.
4. **AnalyticBox**: Shows analytics on tasks based on their state.
5. **Calendar**: Provides a calendar interface to view and select task deadlines.

### Backend Routes

1. `GET /get` - Fetches all tasks from the database.
2. `PUT /update` - Updates a task’s state and other details based on `tile and state`.
3. `POST /create` - Adds a new task to the database.
4. `DELETE /delete` - Removes a task based on `title`.

## State Management (Recoil)

| Atom             | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| `addTaskState`   | Manages the visibility of the Add Task modal.                              |
| `newTaskAtom`    | Stores data for the newly created task, with fields like title, description, deadline, priority, and state. |
| `backendUrlAtom` | Stores the backend URL, defaulted to `http://localhost:3000`.              |
| `todoListAtom`   | Holds an array of all tasks fetched from the backend.                      |
| `todosAtom`      | Stores tasks in the "To Do" state.                                         |
| `onProgressAtom` | Stores tasks in the "On Progress" state.                                   |
| `completedAtom`  | Stores tasks in the "Completed" state.                                     |

## Installation and Setup

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/DNAVEEN74/Task_Management
   cd ./backend 
   ```
  2. install dependencies:
  ```bash
  npm install
  ```
  3. Set up the MongoDB database and update the database configuration in `.env`
  4. Compile Typescript Code:
  ```bash
  npx tsc
  ```
  5. Run the Application:
  ```bash
  node dist/index.js
  ```
  The backend server should now be running on `http://localhost:3000`.
  
### Frontend Setup
1. Navigate to the frontend directory:
    ```bash
    `cd ./frontend` 
    ```
2.  Install dependencies:
```bash
npm install 
```
3. Start the frontend server:
    ```bash
    npm run dev
    ```
    The frontend should now be accessible at `http://localhost:5173`.
    
## Usage

1.  **Adding Tasks**: Click the **Add Task** button, fill in task details, select a priority, and set a deadline using the calendar.
2.  **Dragging Tasks**: Drag tasks between the "To Do," "On Progress," and "Completed" columns.
3.  **Setting Priorities**: Use the dropdown in the Add Task form to assign a priority level.
4.  **Deleting Tasks**: Use the delete (Trash2) icon on each task to remove it.
## Contributing

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Commit your changes.
4.  Open a pull request with a description of your changes.
