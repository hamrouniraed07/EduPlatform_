import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import Profile from './pages/Profile';

// 👉 Nouveaux imports
import CourseAnalysis from './pages/CourseAnalysis';
import GenerateDescription from './pages/GenerateDescription';

function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />

        {/* Route protégée : Analyse IA du cours */}
        <Route
          path="/courses/:id/analysis"
          element={
            <ProtectedRoute>
              <CourseAnalysis />
            </ProtectedRoute>
          }
        />

        {/* Route protégée : Génération automatique de description */}
        <Route
          path="/generate-description"
          element={
            <ProtectedRoute>
              <GenerateDescription />
            </ProtectedRoute>
          }
        />

        {/* Route protégée : Profil */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
