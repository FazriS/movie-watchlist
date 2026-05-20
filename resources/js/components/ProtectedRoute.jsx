import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, isAuthenticated } = useAuth();

    // Poin f: Jika token tidak ada / belum login, otomatis tendang ke halaman login
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    // Poin g: Otorisasi Berdasarkan Role Frontend
    // Jika halaman butuh role tertentu (misal admin) tapi user yang login tidak memenuhi syarat
    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        return <Navigate to="/dashboard" replace />; // Lempar ke dashboard aman
    }

    return children;
};

export default ProtectedRoute;