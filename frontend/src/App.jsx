import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./pages/admin/Dashboard";
import TeacherDashboard from "./pages/teacher/Dashboard";
import EditExam from "./pages/teacher/EditExam";
import CreateExam from "./pages/teacher/CreateExam";
import Exams from "./pages/student/Exams";
import TakeExam from "./pages/student/TakenExam";
import Result from "./pages/student/Result";
import Profile from "./pages/Profile";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher"
          element={
            <ProtectedRoute role="teacher">
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-exam/:id"
          element={
            <ProtectedRoute role="teacher">
              <EditExam />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-exam"
          element={
            <ProtectedRoute role="teacher">
              <CreateExam />
            </ProtectedRoute>
          }
        />

        <Route
          path="/exams"
          element={
            <ProtectedRoute role="student">
              <Exams />
            </ProtectedRoute>
          }
        />

        <Route
          path="/exam/:id"
          element={
            <ProtectedRoute role="student">
              <TakeExam />
            </ProtectedRoute>
          }
        />

        <Route
          path="/result"
          element={
            <ProtectedRoute role="student">
              <Result />
            </ProtectedRoute>
          }
        />

        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
