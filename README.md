# 📱 WhatsApp Clone

A real-time chat application that mimics the core functionality of WhatsApp, built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and styled using Material UI.

## 🚀 Features

- Real-time messaging (with WebSockets / Pusher)
- User-friendly interface inspired by WhatsApp
- Chat list with active conversations
- Dynamic chat screen with auto-scroll
- Backend API to handle messages and chats
- MongoDB database integration

## 🛠️ Tech Stack

**Frontend**:
- React.js
- Material UI
- Axios (for HTTP requests)

**Backend**:
- Node.js
- Express.js
- MongoDB (with Mongoose)
- Pusher / Socket.IO (for real-time messaging)

 🔧 Installation
1. Clone the repository
git clone https://github.com/ankurmishra48/WhatsApp-Clone.git
cd whatsapp-clone
2. Setup the server

cd server
npm install
npm start
Make sure to set up your .env file with:
MONGO_URI=your_mongodb_connection_string
PORT=your_server_port
3. Setup the client
cd ../client
npm install
npm start
🌐 Deployment
To deploy this project:

Host the backend on platforms like Heroku, Render, or Railway

Deploy frontend on Vercel or Netlify

Use environment variables for production
