import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ResumeBuilderAdvanced from './pages/ResumeBuilderAdvanced'; // ✅ Advanced builder import
import ATSAnalyzer from './pages/ATSAnalyzer';
import { useContext } from 'react';

function PrivateRoute({ children }) {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          {/* /builder route ab Advanced Resume Builder show karega */}
          <Route
            path="/builder"
            element={
              <PrivateRoute>
                <ResumeBuilderAdvanced />
              </PrivateRoute>
            }
          />
          <Route
            path="/ats"
            element={
              <PrivateRoute>
                <ATSAnalyzer />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
