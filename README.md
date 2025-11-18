# AI Meeting — Live AI Conversation App

An experimental Next.js app that enables real-time voice meetings with an AI assistant. Users can sign up, sign in, and have live conversations with an AI during meetings. This repository contains the frontend (Next.js App Router) and server-side API endpoints for authentication and data access.

Key idea: capture user audio in the browser, stream to a backend relay or WebSocket, and forward audio (or transcribed text) to an AI service for live responses.


 Features
- Live voice conversation with an AI (architecture scaffolding — add your preferred streaming provider).
- Email/password signup + login (JWT-based authentication helpers included).
- Simple dashboard and pages scaffolded under src/app.
- Pluggable database support (project includes Neon/MySQL-related dependencies).

Technology stack
- Next.js 16 (App Router)
- React 19
- Tailwind CSS (present in devDependencies)
- JWT auth using jsonwebtoken and bcryptjs
- Database: Neon (`@neondatabase/serverless`) 
