import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Navigation from './components/Navigation/Navigation';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './pages/Home/Home';
import Track from './pages/Track/Track';
import Auth from './pages/Auth/Auth';
import SignUp from './pages/SignUp/SignUp';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navigation />
          <div className="main-layout">
            <Sidebar />
            <main className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/track" element={
                  <ProtectedRoute>
                    <Track />
                  </ProtectedRoute>
                } />
                <Route path="/about" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/signup" element={<SignUp />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;