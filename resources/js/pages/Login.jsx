import React, {
    useState,
    useEffect,
} from 'react';

import {
    useNavigate,
    Link,
} from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import api from '../api';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const {
        login,
        isAuthenticated,
    } = useAuth();


    // Redirect jika sudah login
    useEffect(() => {

        if (isAuthenticated()) {
            navigate('/dashboard');
        }

    }, [isAuthenticated, navigate]);


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError('');
        setLoading(true);

        try {

            const response = await api.post(
                '/login',
                {
                    email,
                    password,
                }
            );

            login(response.data.access_token);

            navigate('/dashboard');

        } catch (err) {

            if (
                err.response &&
                err.response.data
            ) {
                setError(
                    err.response.data.error ||
                    'Email atau password salah!'
                );
            } else {
                setError(
                    'Server sedang bermasalah.'
                );
            }

        } finally {

            setLoading(false);

        }
    };


    return (

        <div style={styles.container}>

            {/* Overlay Blur */}

            <div style={styles.overlay}></div>


            {/* Login Card */}

            <div style={styles.card}>

                {/* Logo */}

                <h1 style={styles.logo}>
                    Movie<span style={styles.logoAccent}>In</span>
                </h1>

                <p style={styles.subtitle}>
                    Your personal movie universe 🍿
                </p>


                {/* Error */}

                {
                    error &&
                    <div style={styles.alert}>
                        {error}
                    </div>
                }


                {/* Form */}

                <form onSubmit={handleSubmit}>

                    <div style={styles.formGroup}>

                        <label style={styles.label}>
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="you@example.com"
                            style={styles.input}
                            required
                        />

                    </div>


                    <div style={styles.formGroup}>

                        <label style={styles.label}>
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="••••••••"
                            style={styles.input}
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        style={styles.button}
                        disabled={loading}
                    >

                        {
                            loading
                                ? 'Loading...'
                                : 'Sign In'
                        }

                    </button>

                </form>


                {/* Footer */}

                <p style={styles.footerText}>

                    New here?{' '}

                    <Link
                        to="/register"
                        style={styles.link}
                    >
                        Create account
                    </Link>

                </p>

            </div>

        </div>
    );
};


const styles = {

    container: {
        position: 'relative',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        minHeight: '100vh',

        background:
            'linear-gradient(to bottom right, #000000, #1a0000)',

        overflow: 'hidden',

        fontFamily:
            'Inter, sans-serif',
    },


    overlay: {
        position: 'absolute',

        width: '100%',
        height: '100%',

        background:
            'radial-gradient(circle at top, rgba(229,9,20,0.25), transparent 40%)',
    },


    card: {
        position: 'relative',
        zIndex: 2,

        width: '100%',
        maxWidth: '420px',

        padding: '40px',

        borderRadius: '24px',

        background:
            'rgba(15, 15, 15, 0.88)',

        border:
            '1px solid rgba(255,255,255,0.08)',

        backdropFilter: 'blur(10px)',

        boxShadow:
            '0 10px 40px rgba(0,0,0,0.5)',
    },


    logo: {
        textAlign: 'center',

        fontSize: '42px',
        fontWeight: '900',

        color: '#ffffff',

        marginBottom: '5px',

        letterSpacing: '-1px',
    },


    logoAccent: {
        color: '#E50914',
    },


    subtitle: {
        textAlign: 'center',

        color: '#999',

        marginBottom: '35px',

        fontSize: '14px',
    },


    alert: {
        padding: '12px',

        marginBottom: '18px',

        borderRadius: '10px',

        background:
            'rgba(229,9,20,0.15)',

        border:
            '1px solid rgba(229,9,20,0.4)',

        color: '#ff8a8a',

        fontSize: '14px',
    },


    formGroup: {
        marginBottom: '18px',
    },


    label: {
        display: 'block',

        marginBottom: '8px',

        color: '#ddd',

        fontSize: '14px',

        fontWeight: '500',
    },


    input: {
        width: '100%',

        padding: '14px',

        borderRadius: '12px',

        border:
            '1px solid rgba(255,255,255,0.08)',

        background:
            'rgba(255,255,255,0.05)',

        color: '#fff',

        fontSize: '15px',

        outline: 'none',

        boxSizing: 'border-box',
    },


    button: {
        width: '100%',

        padding: '14px',

        marginTop: '10px',

        border: 'none',

        borderRadius: '12px',

        background:
            'linear-gradient(to right, #E50914, #ff2d37)',

        color: '#fff',

        fontWeight: '700',

        fontSize: '15px',

        cursor: 'pointer',

        transition: '0.3s ease',

        boxShadow:
            '0 4px 15px rgba(229,9,20,0.35)',
    },


    footerText: {
        marginTop: '28px',

        textAlign: 'center',

        color: '#999',

        fontSize: '14px',
    },


    link: {
        color: '#E50914',

        textDecoration: 'none',

        fontWeight: '600',
    },

};


export default Login;