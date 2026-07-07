# Social Scheduler

> 🔒 **Private Repository**: This project is proprietary and not intended for public sharing or open-source distribution.

Social Scheduler is an AI-powered social media automation platform that helps you generate, manage, and schedule posts across multiple social networks. Built with the MERN stack, it leverages advanced AI models for content generation and the Zernio API for seamless social media integration.

## 🚀 Key Features

*   **AI Content Generation**: Automatically generate engaging text content using Google Gemini API.
*   **AI Image Generation**: Create stunning images for your posts using Hugging Face models (or Pollinations AI as a fallback).
*   **Automated Scheduling**: Schedule posts in advance with a robust built-in node-cron scheduler.
*   **Social Media OAuth**: Securely connect and manage your social accounts (Twitter, LinkedIn, etc.) using Zernio API OAuth flow.
*   **Cloud Media Management**: Upload, store, and manage images effortlessly via Cloudinary integration.
*   **Modern UI**: A responsive, beautiful user interface built with React 19, Tailwind CSS 4, and Vite.
*   **Secure Authentication**: JWT-based user authentication and bcrypt password hashing.

## 🛠️ Tech Stack

**Frontend:**
*   React 19
*   Vite
*   Tailwind CSS v4
*   React Router DOM
*   Axios
*   Lucide React (Icons)

**Backend:**
*   Node.js & Express (v5)
*   TypeScript
*   MongoDB & Mongoose
*   Zernio Node SDK (Social automation)
*   Google GenAI SDK (Text generation)
*   Hugging Face API (Image generation)
*   Cloudinary (Media storage)
*   Node-Cron (Task scheduling)
*   JWT & Bcrypt (Security)

## 🧠 Core Integrations

This project heavily relies on three core third-party integrations to function:

### 1. Google Gemini (`@google/genai`)
**Role:** AI Content Generation (Text & Prompts)
When a user requests an AI-generated post, the prompt and desired tone are sent to the **Gemini 2.5 Flash** model. Gemini is instructed to not only write the social media post content (including hashtags) but also generate an `imagePrompt`—a highly detailed visual description that perfectly matches the text. This `imagePrompt` is subsequently passed to the image generator (Hugging Face or Pollinations) ensuring the image aligns with the text context.

### 2. Cloudinary (`cloudinary`)
**Role:** Media Storage and Hosting
Social networks require images to be hosted on the web so they can fetch them via a URL. Cloudinary serves as the media bucket.
*   **AI Images:** When the AI generates an image (returning raw binary data), the server directly streams this buffer to Cloudinary via `cloudinary.uploader.upload_stream`. Cloudinary saves it and returns a `secure_url`.
*   **User Uploads:** If a user manually uploads a media file to schedule a post, that file is uploaded to Cloudinary.
This Cloudinary URL is saved in the database and eventually sent to the social networks.

### 3. Zernio (`@zernio/node`)
**Role:** Social Media Authentication & Publishing Engine
Zernio acts as the bridge between the application and the actual social networks (Twitter, LinkedIn, etc.).
*   **OAuth & Connection:** Instead of building individual OAuth integrations for every platform, the app uses `zernio.connect.getConnectUrl()`. This provides a secure link for users to log in to their social accounts. Once connected, Zernio returns a `zernioAccountId` which is saved in MongoDB.
*   **Publishing:** A background job (`node-cron`) checks for posts that are due. When it's time to publish, the server gathers the post text, the Cloudinary media URL, maps them to the user's connected `zernioAccountId`s, and calls `zernio.posts.createPost()`. Zernio handles the formatting and final delivery of that post to the respective social networks.

## 📁 Project Structure

```text
social-scheduler/
├── client/           # React frontend application
│   ├── src/          # Source code (components, pages, api, etc.)
│   ├── public/       # Static assets
│   └── package.json
└── server/           # Express backend application
    ├── config/       # Database and other configurations
    ├── controllers/  # Route logic
    ├── middlewares/  # Custom Express middlewares
    ├── models/       # Mongoose schemas
    ├── routes/       # API endpoints
    ├── services/     # Core business logic (Scheduler, etc.)
    ├── server.ts     # Server entry point
    └── package.json
```

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v18 or higher recommended)
*   [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas)

## 💻 Installation & Setup

**Install dependencies for both client and server:**
    ```bash
    # Install server dependencies
    cd server
    npm install

    # Install client dependencies
    cd ../client
    npm install
    ```

## 🔐 Environment Variables

You need to set up environment variables for both the backend and frontend.

### Server (`server/.env`)
Create a `.env` file in the `server` directory and add the following:
```env
# Database
MONGODB_URI="mongodb://localhost:27017/scheduler" # Or your MongoDB Atlas URI

# Authentication
JWT_SECRET="your_jwt_secret_key_here"

# APIs
ZERNIO_API_KEY="your_zernio_api_key"
GEMINI_API_KEY="your_gemini_api_key"
HUGGINGFACE_API_KEY="your_huggingface_api_key"

# Cloudinary (Image Hosting)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Server Config
PORT=3000
```

### Client (`client/.env`)
Create a `.env` file in the `client` directory:
```env
VITE_API_BASE_URL="http://localhost:3000"
```

## 🚀 Running the Application

**Start the Backend Server (Development Mode):**
```bash
cd server
npm run server
```
The server will run on `http://localhost:3000` (or your defined PORT).

**Start the Frontend Development Server:**
```bash
cd client
npm run dev
```
The client will be available at `http://localhost:5173`.

## 🌐 API Endpoints Summary

*   `/api/auth`: User registration, login, and profile management.
*   `/api/oauth`: Social media account connections via Zernio.
*   `/api/accounts`: Fetch and manage connected social profiles.
*   `/api/posts`: Create, schedule, and generate AI posts.
*   `/api/activity`: Track recent scheduled actions and system activities.

## 📝 License

This project is private and proprietary. Unauthorized copying, distribution, or modification is strictly prohibited.
