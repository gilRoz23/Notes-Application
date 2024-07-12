# Notes App

This project is a simple notes application built using React for the frontend and Express with MongoDB for the backend.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB Atlas account (or local MongoDB setup)
- `.env` file with MongoDB connection URI (see `.env.example`)

### Installation

```bash
# Install frontend and backend dependencies
cd client && npm install
cd ../server && npm install

# Running the Application

## Frontend (React)

```bash
cd client && npm start

# Getting Started

### Frontend (React)

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Backend (Express with MongoDB)

Ensure MongoDB is running and update the MongoDB URI in `.env` file.

```bash
cd server && npm start


# Backend Server

The backend server for this application runs on [http://localhost:3001](http://localhost:3001).

## Features

- Fetches notes from MongoDB and displays them paginated on the frontend.
- Supports CRUD operations (Create, Read, Update, Delete) for notes.
- Dynamic pagination component adjusts based on total note count.


## Backend API Endpoints

- `GET /notes`: Fetch all notes with pagination.
- `GET /notes/:id`: Fetch a single note by ID.
- `POST /notes`: Create a new note.
- `DELETE /notes/:id`: Delete a note by ID.

## Technologies Used

- **Frontend**: React, Axios
- **Backend**: Express, MongoDB (Mongoose)
- **Deployment**: Localhost
