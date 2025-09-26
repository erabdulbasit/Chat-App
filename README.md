# Chat App

A real-time chat application built with React and Node.js.

## Project Structure
chat-app/
├── public/          # React frontend
├── server/          # Node.js backend
├── README.md
└── .gitignore

## Installation

### Prerequisites
- Node.js installed
- MongoDB running

### Backend Setup
```bash
cd server
npm install
# Create .env file with MONGODO_URL and PORT
npm start

Frontend Setup
cd public
npm install  
npm start

Environment Variables
Create .env file in server directory:MONGODO_URL=your_mongodb_connection_string
PORT=5000
