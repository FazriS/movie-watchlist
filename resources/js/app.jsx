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
import Dashboard from './pages/Dashboard';
import MyProfile from './pages/MyProfile';
import UserList from './pages/UserList';
import GenreList from './pages/GenreList';

import FilmList from './pages/FilmList';
import FilmDetail from './pages/FilmDetail';
import FilmForm from './pages/FilmForm';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>

                    {/* ================= PUBLIC ROUTES ================= */}

                    <Route path="/login" element={<Login />} />

                    <Route path="/register" element={<Register />} />


                    {/* ================= PROTECTED ROUTES ================= */}

                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/me"
                        element={
                            <ProtectedRoute>
                                <MyProfile />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/users"
                        element={
                            <ProtectedRoute>
                                <UserList />
                            </ProtectedRoute>
                        }
                    />

                    {/* Genre: semua role bisa akses halaman */}
                    <Route
                        path="/genres"
                        element={
                            <ProtectedRoute>
                                <GenreList />
                            </ProtectedRoute>
                        }
                    />


                    {/* ================= FILM ROUTES ================= */}

                    {/* Semua user yang login bisa lihat daftar film */}
                    <Route
                        path="/films"
                        element={
                            <ProtectedRoute>
                                <FilmList />
                            </ProtectedRoute>
                        }
                    />

                    {/* Semua user login bisa lihat detail */}
                    <Route
                        path="/films/:id"
                        element={
                            <ProtectedRoute>
                                <FilmDetail />
                            </ProtectedRoute>
                        }
                    />

                    {/* Hanya admin & manager */}
                    <Route
                        path="/films/create"
                        element={
                            <ProtectedRoute allowedRoles={['admin', 'manager']}>
                                <FilmForm />
                            </ProtectedRoute>
                        }
                    />

                    {/* Hanya admin & manager */}
                    <Route
                        path="/films/edit/:id"
                        element={
                            <ProtectedRoute allowedRoles={['admin', 'manager']}>
                                <FilmForm />
                            </ProtectedRoute>
                        }
                    />


                    {/* ================= FALLBACK ================= */}

                    <Route
                        path="*"
                        element={<Navigate to="/login" replace />}
                    />

                </Routes>
            </Router>
        </AuthProvider>
    );
}

const root = ReactDOM.createRoot(document.getElementById('app'));

root.render(<App />);