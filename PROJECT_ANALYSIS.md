# Project Analysis: Hon. Sualihu Dandaawa - MP Impact & Development Tracker

## Project Overview
This project is a **Full-Stack Web Application** designed to track and showcase the development initiatives, impact metrics, and community projects of **Hon. Sualihu Dandaawa**, MP for Karaga. It serves as a transparency tool for constituents and a management platform for the MP's team.

## Technical Architecture

### 1. Backend (Node.js & Express)
*   **Server**: `server.js` acts as the core application server.
*   **Database**: **SQLite** (`mp_tracker.db`) is used for persistent data storage.
*   **Authentication**:
    *   **JWT (JSON Web Tokens)** for session management.
    *   **Bcrypt** for password hashing.
    *   **Role-Based Access Control (RBAC)**: Supports roles like `super_admin`, `regional_admin`, `analyst`, `editor`, and `public_viewer`.
*   **Security**:
    *   **Rate Limiting**: Protected login/register endpoints.
    *   **Middleware**: Custom middleware for role verification (`verifySuperAdmin`, `verifyEditor`, etc.).
    *   **Audit Logging**: Tracks all critical actions (Login, Create, Delete) in the `audit_logs` table.
*   **File Handling**: **Multer** manages image uploads to `./uploads` and in-memory processing for Excel bulk uploads.

### 2. Frontend (Vanilla Web Technologies)
*   **HTML5/CSS3**: Semantic markup and custom `style.css` (Glassmorphism design).
*   **JavaScript (ES6+)**: `main.js` handles DOM manipulation, data fetching from the API, and dynamic UI updates.
*   **No Frameworks**: The frontend is built without React/Vue, ensuring a lightweight and fast-loading user experience while communicating with the backend APIs.

## Data Model (SQLite Schema)

*   **Projects**: Stores development projects.
    *   Fields: `name`, `sector`, `status`, `location`, `image_url`, `project_cost`, `funding_source`, `contractor`, `beneficiaries`.
*   **Users**: Manages admin and staff access.
    *   Roles: `super_admin`, `regional_admin`, `analyst`, `editor`, `public_viewer`.
*   **Impact Metrics**: Stores high-level counters (e.g., Total Investment, Scholarships).
*   **Scholarships**: Tracks individual beneficiary data.
*   **Audit Logs**: Security and activity tracking.

## API Structure

### Public Endpoints
*   `GET /api/projects`: Fetch filtered project lists (supports pagination, search, sector filters).
*   `GET /api/metrics`: Retrieve dashboard statistics.

### Protected Endpoints (Auth Required)
*   `POST /api/projects`: Create new project.
*   `PUT /api/projects/:id`: Update existing project.
*   `DELETE /api/projects/:id`: Archive project.
*   `POST /api/projects/bulk-upload`: Excel bulk import.
*   `GET /api/users`: Manage system users (Super Admin only).

## Deployment & Production
*   **Process Manager**: `ecosystem.config.js` is configured for **PM2** process management.
*   **Backups**: Automated daily cron job backups the SQLite database to `./backups`.
*   **Environment**: Uses `.env` for sensitive keys (`JWT_SECRET`, `PORT`).
