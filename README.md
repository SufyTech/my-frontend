# CodeMind AI 🧠

> AI-Powered Code Review Platform — Built from Scratch

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blueviolet)](https://codemind-ai-eight.vercel.app/)
[![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20TypeScript-blue)](https://github.com/SufyTech/my-frontend)
[![Backend](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-green)](https://github.com/SufyTech/my-backend)

## 🔗 Live Site
**[codemind-ai-eight.vercel.app](https://codemind-ai-eight.vercel.app/)**

---

## 📌 What is CodeMind AI?

CodeMind AI is a full-stack web application that uses Google Gemini AI to automatically review your code — detecting bugs, security vulnerabilities, performance issues, and suggesting improvements in real time.

Built completely from scratch — frontend, backend, AI integration, authentication, and deployment — all independently.

---

## ✨ Features

- 🤖 **AI Code Review** — Paste any code and get instant AI-powered analysis
- 🛡️ **Security Insights** — Detects SQL injection, XSS, unsafe functions
- ⚡ **Performance Optimization** — Flags slow code and high-complexity blocks
- 📊 **AI Quality Score** — Rates your code 0–100 on readability, complexity, maintainability, and security
- 🔁 **Review History** — Track all past analyses (completed, in-progress, failed)
- 🎯 **Multiple Review Types** — Bug Fix, Optimization, Readability, Clean Code, Security, Performance
- 🔐 **Google Login** — Secure authentication via Google OAuth
- 🌐 **Live Demo Mode** — Try it instantly without logging in

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, TypeScript, Tailwind CSS, Vite |
| Backend | Node.js, Express.js |
| AI | Google Gemini API |
| Auth | Google OAuth 2.0 (Passport.js) |
| Deployment | Vercel (Frontend) |
| Version Control | Git, GitHub |

---

## 🚀 Run Locally

### Prerequisites
- Node.js installed
- Gemini API Key ([Get one free here](https://aistudio.google.com/))
- Google OAuth credentials ([Google Cloud Console](https://console.cloud.google.com/))

### Frontend Setup
```bash
git clone https://github.com/SufyTech/my-frontend
cd my-frontend
npm install
```

Create a `.env.local` file:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

Run the app:
```bash
npm run dev
```

### Backend Setup
```bash
git clone https://github.com/SufyTech/my-backend
cd my-backend
npm install
```

Create a `.env` file:
```
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SESSION_SECRET=your_session_secret
FRONTEND_URL=http://localhost:5173
```

Run the server:
```bash
node server.js
```

---

## 🧠 How the AI Works

1. User pastes code into the editor
2. Selects a review type (Bug Fix / Security / Optimization etc.)
3. Frontend sends request to Express backend
4. Backend calls Google Gemini API with an engineered prompt
5. Gemini returns structured analysis
6. Frontend parses and displays bugs, suggestions, quality score, and insights in real time

---

## 📁 Project Structure
```
my-frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── services/       # API service calls
│   └── App.tsx         # Main app with routing
├── public/
├── tailwind.config.js
├── vite.config.ts
└── index.html
```

---

## 🔑 Key Technical Challenges Solved

- **Google OAuth CORS in production** — Fixed Passport.js session persistence and configured explicit CORS headers for Vercel ↔ Express communication
- **Gemini API prompt engineering** — Designed structured prompts for 6 different review types to get consistent, parseable AI responses
- **Environment-based config** — Managed API keys securely across local and production environments

---

## 👨‍💻 Built By

**Sufiyan Khan** — B.Tech CS 2025
- 📧 suzkhan135@gmail.com
- 🐙 [github.com/SufyTech](https://github.com/SufyTech)
- 🌐 [codemind-ai-eight.vercel.app](https://codemind-ai-eight.vercel.app/)

---

⭐ If you found this useful, consider starring the repo!
