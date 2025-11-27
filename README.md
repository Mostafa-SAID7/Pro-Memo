# Pro Memo

Pro Memo is a full-stack application designed to help users manage memos effectively. It features a modern web interface, a robust backend API, and machine learning capabilities.

## Project Structure

The project is organized into three main components:

-   **backend/**: Node.js and Express-based API server.
-   **frontend/**: Next.js 16 application with React 19 and Tailwind CSS 4.
-   **ml/**: Python scripts for machine learning tasks.

## Technology Stack

### Backend
-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Database**: MongoDB (via Mongoose)
-   **Authentication**: JWT (JSON Web Tokens)
-   **Documentation**: Swagger UI
-   **Validation**: express-validator

### Frontend
-   **Framework**: Next.js 16
-   **Library**: React 19
-   **Styling**: Tailwind CSS 4
-   **Language**: TypeScript
-   **Icons**: Hugeicons React
-   **Internationalization**: next-intl
-   **Theming**: next-themes

### Machine Learning
-   **Language**: Python

## Getting Started

### Prerequisites
-   Node.js (v20 or later recommended)
-   npm or yarn
-   Python (for ML components)
-   MongoDB instance (local or cloud)

### Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file based on `.env.example` and configure your environment variables.
4.  Start the development server:
    ```bash
    npm run dev
    ```

### Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## License

This project is licensed under the ISC License.
