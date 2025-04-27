import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import AuthPage from './Pages/AuthPage';
import DashboardPage from './Pages/DashboardPage';
import ProfilePage from './Pages/ProfilePage';
import LearnMorePage from './Pages/LearnMorePage';
import { useState, useEffect } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is authenticated (can be improved with localStorage or session)
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Auth Page - User needs to login first */}
        <Route path="/auth" element={!isAuthenticated ? <AuthPage setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />} />

        {/* Landing Page - User will be redirected here after login */}
        <Route 
          path="/" 
          element={isAuthenticated ? <LandingPage /> : <Navigate to="/auth" />} 
        />

        {/* Protected Route: Dashboard */}
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <DashboardPage /> : <Navigate to="/auth" />} 
        />

        {/* Profile Page */}
        <Route 
          path="/profile" 
          element={isAuthenticated ? <ProfilePage /> : <Navigate to="/auth" />} 
        />

        {/* Learn More Page */}
        <Route path="/learn-more" element={<LearnMorePage />} />

        {/* Fallback Route: Redirect to landing page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
