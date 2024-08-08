# Notes Management Web Application

This project is a continuation of the homework assignment HW1. The goal was to build a backend server using Express.js, replacing the JSON server from HW1. The backend interacts with a MongoDB database hosted on Atlas, handling CRUD operations for notes.

## Project Structure

- **frontend/**: Contains the frontend code from HW1, updated to interact with the new backend.
- **backend/**: Contains the Express.js backend code, which connects to MongoDB Atlas to manage the notes.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB Atlas account (or a local MongoDB server for development)
- Postman (for backend testing)

### Setup

1. **Clone the Repository**

   ```bash
   git clone <your_repo_link>
   cd <cloned_dir>
   
2. **Frontend Setup**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
The frontend will run on http://localhost:3000.
3. **Backend Setup**

  1. **Navigate to the Backend Directory**

     ```bash
     cd backend
  2. **Create a .env File**
     Create a .env file in the backend directory with the following content:
      ```bash
      MONGODB_CONNECTION_URL=<your_mongodb_connection_string>
      ```
  Replace <your_mongodb_connection_string> with your actual MongoDB Atlas connection string.
  
  3. **Install Dependencies**
    Install the necessary npm packages:
      ```bash
      npm install
      ```

  5. **Run the Backend Server**
    Start the backend server:
      ```bash
      node index.js
      ```
The backend will run on http://localhost:3001.

## Backend Routes

The backend supports the following routes for managing notes:

- **GET /notes**: Retrieve all notes or paginated notes (controlled via query parameters).
- **GET /notes/:id**: Retrieve a specific note by its ID.
- **POST /notes**: Create a new note.
- **PUT /notes/:id**: Update an existing note by its ID.
- **DELETE /notes/:id**: Delete a note by its ID.

## Logger Middleware

The backend includes a middleware logger that logs incoming HTTP requests to `backend/log.txt` with the following details:

- **Time of the request**
- **HTTP request method**
- **Request target path**
- **Request body** (if any)

## Frontend Features

- **Note Management**: View, edit, and delete notes.
- **Pagination**: Only 10 notes are displayed per page, with pagination buttons to navigate between pages.
- **Add New Note**: Allows users to create a new note.
- **Edit/Delete Buttons**: Each note has buttons to edit or delete it.
- **Theme Toggle**: A global theme button to switch between dark and light modes.
