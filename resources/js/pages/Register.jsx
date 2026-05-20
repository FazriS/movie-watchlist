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


const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [
        passwordConfirmation,
        setPasswordConfirmation,
    ] = useState('');

    const [role, setRole] = useState('user');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const { isAuthenticated } = useAuth();


    // Redirect jika user sudah login
    useEffect(() => {

        if (isAuthenticated()) {
            navigate('/dashboard');
        }

    }, [isAuthenticated, navigate]);


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError('');
        setSuccess('');


        // Validasi password
        if (password !== passwordConfirmation) {

            return setError(
                'Konfirmasi password tidak cocok!'
            );

        }

        setLoading(true);


        const payload = {
            name,
            email,
            password,
            password_confirmation:
                passwordConfirmation,
            role,
        };


        try {

            await api.post(
                '/register',
                payload
            );

            setSuccess(
                'Akun berhasil dibuat 🎉'
            );

            setTimeout(() => {

                navigate('/login');

            }, 2000);

        } catch (err) {

            if (
                err.response &&
                err.response.data
            ) {

                const backendErrors =
                    err.response.data.errors;

                const message =
                    backendErrors
                        ? Object
                            .values(backendErrors)
                            .flat()
                            .join(', ')
                        : err.response.data.message;

                setError(
                    message ||
                    'Gagal mendaftarkan akun.'
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

            {/* Overlay */}

            <div style={styles.overlay}></div>


            {/* Card */}

            <div style={styles.card}>


                {/* Logo */}

                <h1 style={styles.logo}>
                    Movie
                    <span style={styles.logoAccent}>
                        In
                    </span>
                </h1>

                <p style={styles.subtitle}>
                    Create your movie universe 🎬
                </p>


                {/* Error */}

                {
                    error &&
                    <div style={styles.alertDanger}>
                        {error}
                    </div>
                }


                {/* Success */}

                {
                    success &&
                    <div style={styles.alertSuccess}>
                        {success}
                    </div>
                }


                {/* Form */}

                <form onSubmit={handleSubmit}>


                    {/* Name */}

                    <div style={styles.formGroup}>

                        <label style={styles.label}>
                            Full Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="Your name"
                            style={styles.input}
                            required
                        />

                    </div>


                    {/* Email */}

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


                    {/* Password */}

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


                    {/* Password Confirmation */}

                    <div style={styles.formGroup}>

                        <label style={styles.label}>
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            value={passwordConfirmation}
                            onChange={(e) =>
                                setPasswordConfirmation(
                                    e.target.value
                                )
                            }
                            placeholder="••••••••"
                            style={styles.input}
                            required
                        />

                    </div>


                    {/* Role */}

                    <div style={styles.formGroup}>

                        <label style={styles.label}>
                            Select Role
                        </label>

                        <select
                            value={role}
                            onChange={(e) =>
                                setRole(e.target.value)
                            }
                            style={styles.select}
                        >

                            <option value="user">
                                🍿 User
                            </option>

                            <option value="manager">
                                🎬 Manager
                            </option>

                            <option value="admin">
                                👑 Admin
                            </option>

                        </select>

                    </div>


                    {/* Button */}

                    <button
                        type="submit"
                        style={styles.button}
                        disabled={loading}
                    >

                        {
                            loading
                                ? 'Creating Account...'
                                : 'Create Account'
                        }

                    </button>

                </form>


                {/* Footer */}

                <p style={styles.footerText}>

                    Already have an account?{' '}

                    <Link
                        to="/login"
                        style={styles.link}
                    >
                        Sign In
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

        padding: '20px',

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
        maxWidth: '450px',

        padding: '40px',

        borderRadius: '24px',

        background:
            'rgba(15, 15, 15, 0.9)',

        border:
            '1px solid rgba(255,255,255,0.08)',

        backdropFilter: 'blur(12px)',

        boxShadow:
            '0 10px 40px rgba(0,0,0,0.5)',
    },


    logo: {
        textAlign: 'center',

        fontSize: '42px',
        fontWeight: '900',

        color: '#fff',

        marginBottom: '6px',

        letterSpacing: '-1px',
    },


    logoAccent: {
        color: '#E50914',
    },


    subtitle: {
        textAlign: 'center',

        color: '#999',

        marginBottom: '30px',

        fontSize: '14px',
    },


    alertDanger: {
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


    alertSuccess: {
        padding: '12px',

        marginBottom: '18px',

        borderRadius: '10px',

        background:
            'rgba(46,204,113,0.15)',

        border:
            '1px solid rgba(46,204,113,0.4)',

        color: '#7dffb0',

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


    select: {
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


export default Register;