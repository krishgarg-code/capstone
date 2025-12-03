# Viora - Premium Event Management Platform

Viora is a modern, high-end event management application designed to provide a seamless experience for discovering, booking, and managing events. Built with a focus on aesthetics and user experience, it features a dark-themed, glassmorphic UI with smooth animations.

## 🚀 Features

*   **Event Discovery**: Browse events with advanced filtering (Date, Location, Category).
*   **Event Management**: Create, edit, and delete your own events.
*   **Ticket Booking**: Seamless ticket purchasing flow with QR code generation.
*   **User Dashboard**: Centralized hub for managing tickets, events, and profile.
*   **Authentication**: Secure Login and Signup with JWT-based sessions.
*   **Profile Management**: Edit profile details and manage account settings (including account deletion).
*   **Responsive Design**: Fully optimized for mobile and desktop devices.
*   **Premium UI**: Custom animations, glassmorphism effects, and a sophisticated dark mode.

## 🛠️ Tech Stack

### Frontend
*   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **Icons**: [Lucide React](https://lucide.dev/)

### Backend
*   **Runtime**: [Node.js](https://nodejs.org/)
*   **Framework**: [Express.js](https://expressjs.com/)
*   **Database**: [PostgreSQL](https://www.postgresql.org/)
*   **Image Storage**: [Cloudinary](https://cloudinary.com/)

## 🏗️ Architecture

The application follows a client-server architecture:
*   **Frontend**: A Next.js application handling the UI, routing, and user interactions. It communicates with the backend via RESTful APIs.
*   **Backend**: An Express.js server that manages business logic, authentication, and database interactions.
*   **Database**: A PostgreSQL database storing users, events, and tickets.

\

## 🚀 Getting Started

1.  **Clone the repository**
2.  **Install dependencies**:
    ```bash
    npm install
    cd backend && npm install
    ```
3.  **Setup Environment Variables**: Configure `.env` files in both root and backend directories.
4.  **Run the application**:
    ```bash
    # Root directory (Frontend)
    npm run dev

    # Backend directory
    npm run dev
    ```
