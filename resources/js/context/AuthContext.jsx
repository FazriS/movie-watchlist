import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('jwt_token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            try {
                // Poin g: Melakukan decode token JWT (mengambil id, name, email, dan role)
                const decoded = jwtDecode(token);
                
                // Cek apakah token sudah kadaluwarsa (expired) secara waktu
                if (decoded.exp * 1000 < Date.now()) {
                    logout();
                } else {
                    setUser(decoded); // Set data user global termasuk role
                }
            } catch (error) {
                logout();
            }
        }
        setLoading(false);
    }, [token]);

    // Tugas Global: Fungsi untuk menyimpan JWT Token setelah login berhasil
    const login = (jwtToken) => {
        localStorage.setItem('jwt_token', jwtToken);
        setToken(jwtToken);
        const decoded = jwtDecode(jwtToken);
        setUser(decoded);
    };

    // Fungsi global untuk membersihkan sesi (Logout)
    const logout = () => {
        localStorage.removeItem('jwt_token');
        setToken(null);
        setUser(null);
        window.location.href = '/login';
    };

    // Poin f: Global Auth Check helper
    const isAuthenticated = () => {
        return !!token;
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Custom hook agar Fatih, Archie, dan Ibra tinggal panggiluseAuth() di komponen mereka
export const useAuth = () => useContext(AuthContext);