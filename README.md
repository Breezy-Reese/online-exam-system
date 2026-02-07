# Online Exam System

An online examination platform that allows teachers to create and manage exams, students to take exams, and administrators to oversee the system. The platform supports timed exams, multiple-choice questions, and role-based access control.

## Features

### User Management
- User registration and authentication with JWT tokens
- Role-based access control (Student, Teacher, Admin)
- Secure password hashing with bcrypt

### Teacher Features
- Create new exams with title, description, duration, and scheduled times
- Add multiple-choice questions to exams
- Edit existing exams and questions
- View exam submissions and results

### Student Features
- Browse available exams
- Take timed exams with automatic submission on time expiry
- View exam results and scores

### Admin Features
- Oversee all users, exams, and submissions
- Manage system-wide settings

### General Features
- Real-time timer for exams
- Secure API endpoints with authentication middleware
- Responsive UI built with React and Tailwind CSS

## Tech Stack

### Backend
- **Node.js** with **Express.js** for server-side logic
- **MongoDB** with **Mongoose** for database management
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests
- **dotenv** for environment variable management

### Frontend
- **React** with **Vite** for fast development and building
- **React Router** for client-side routing
- **Axios** for API communication
- **Tailwind CSS** for styling
- **Context API** for state management

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance like MongoDB Atlas)
- npm or yarn

### Backend Setup
1. Navigate to the `backend` directory:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=8000
   ```
4. Start the backend server:
   ```
   npm run dev
   ```
   The server will run on `http://localhost:8000`.

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` (default Vite port).

## Usage

1. **Registration/Login**: Users can register as students, teachers, or admins, then log in to access their respective dashboards.
2. **Teachers**: Create exams by adding questions, setting duration and times. Edit exams as needed.
3. **Students**: View available exams, take them within the allotted time, and view results afterward.
4. **Admins**: Monitor the system from the admin dashboard.

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

#### Exams
- `GET /api/exams` - Get all exams (filtered by role)
- `POST /api/exams` - Create a new exam (Teacher only)
- `PUT /api/exams/:id` - Update an exam (Teacher only)
- `DELETE /api/exams/:id` - Delete an exam (Teacher only)

#### Questions
- `GET /api/questions/:examId` - Get questions for an exam
- `POST /api/questions` - Add a question to an exam (Teacher only)
- `PUT /api/questions/:id` - Update a question (Teacher only)
- `DELETE /api/questions/:id` - Delete a question (Teacher only)

#### Submissions
- `GET /api/submissions/:examId` - Get submissions for an exam (Teacher/Admin)
- `POST /api/submissions` - Submit an exam (Student)
- `GET /api/submissions/student/:studentId` - Get student's submissions

## Project Structure

```
online-exam-system/
├── backend/
│   ├── controllers/          # Business logic for routes
│   ├── middleware/           # Authentication middleware
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API route definitions
│   ├── server.js             # Main server file
│   └── package.json
├── frontend/
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── api/              # Axios configuration
│   │   ├── auth/             # Authentication components
│   │   ├── components/       # Reusable UI components
│   │   ├── context/          # React context for auth
│   │   ├── hooks/            # Custom React hooks
│   │   ├── pages/            # Page components by role
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # Entry point
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License.
