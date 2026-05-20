import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Global State & Satpam Proteksi Rute
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Import Seluruh Halaman Aplikasi (Pages)
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard'; // SEKARANG DI-IMPORT DARI PAGES
import MyProfile from './pages/MyProfile';
import UserList from './pages/UserList';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* ================= PUBLIC ROUTES ================= */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* ================= PROTECTED ROUTES ================= */}
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } />

                    <Route path="/me" element={
                        <ProtectedRoute>
                            <MyProfile />
                        </ProtectedRoute>
                    } />

                    <Route path="/users" element={
                        <ProtectedRoute>
                            <UserList />
                        </ProtectedRoute>
                    } />

                    {/* ================= FALLBACK ================= */}
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);