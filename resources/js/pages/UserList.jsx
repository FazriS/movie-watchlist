import React, {
    useState,
    useEffect,
} from 'react';

import {
    Users,
    Shield,
    Crown,
    Clapperboard,
    UserPlus,
    ArrowLeft,
} from 'lucide-react';

import {
    useNavigate,
} from 'react-router-dom';

import api from '../api';

import {
    useAuth,
} from '../context/AuthContext';


const UserList = () => {

    const { user } = useAuth();

    const navigate = useNavigate();

    const [users, setUsers] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState('');


    // FORM ADMIN

    const [name, setName] =
        useState('');

    const [email, setEmail] =
        useState('');

    const [bio, setBio] =
        useState('');

    const [formSuccess, setFormSuccess] =
        useState('');

    const [formError, setFormError] =
        useState('');


    // FETCH USERS

    const fetchUsers = async () => {

        try {

            const response =
                await api.get('/users');

            setUsers(response.data);

        } catch (err) {

            setError(
                'Failed to load users.'
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        fetchUsers();

    }, []);


    // ADD USER

    const handleAddUser = async (e) => {

        e.preventDefault();

        setFormError('');
        setFormSuccess('');


        try {

            await api.post(
                '/users',
                {
                    name,
                    email,
                    bio,
                }
            );

            setFormSuccess(
                'New user added successfully 🎉'
            );

            setName('');
            setEmail('');
            setBio('');

            fetchUsers();

        } catch (err) {

            if (
                err.response &&
                err.response.data
            ) {

                setFormError(
                    err.response.data.message ||
                    'Failed to add user.'
                );

            } else {

                setFormError(
                    'Server connection failed.'
                );

            }
        }
    };


    if (loading) {

        return (

            <div style={styles.loadingContainer}>

                <h2 style={styles.loadingText}>
                    Loading users...
                </h2>

            </div>
        );
    }


    return (

        <div style={styles.container}>


            {/* HEADER */}

            <div style={styles.topbar}>


                <button
                    style={styles.backButton}
                    onClick={() =>
                        navigate('/dashboard')
                    }
                >

                    <ArrowLeft size={18} />

                    Back

                </button>


                <h1 style={styles.logo}>
                    Movie
                    <span style={styles.logoAccent}>
                        In
                    </span>
                </h1>

            </div>


            {/* TITLE */}

            <div style={styles.pageTitleContainer}>

                <h1 style={styles.pageTitle}>
                    <Users size={32} />

                    Community Users
                </h1>

                <p style={styles.subtitle}>
                    Explore all MovieIn members 🍿
                </p>

            </div>


            {/* ERROR */}

            {
                error &&
                <div style={styles.alertDanger}>
                    {error}
                </div>
            }


            {/* ADMIN PANEL */}

            {
                user?.role === 'admin'
                    ? (

                        <div style={styles.adminPanel}>


                            <div style={styles.adminHeader}>

                                <Shield size={22} />

                                <h3>
                                    Admin Panel
                                </h3>

                            </div>


                            {
                                formSuccess &&
                                <div style={styles.alertSuccess}>
                                    {formSuccess}
                                </div>
                            }


                            {
                                formError &&
                                <div style={styles.alertDanger}>
                                    {formError}
                                </div>
                            }


                            <form
                                onSubmit={handleAddUser}
                                style={styles.form}
                            >

                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={name}
                                    onChange={(e) =>
                                        setName(
                                            e.target.value
                                        )
                                    }
                                    style={styles.input}
                                    required
                                />


                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(
                                            e.target.value
                                        )
                                    }
                                    style={styles.input}
                                    required
                                />


                                <input
                                    type="text"
                                    placeholder="Short Bio"
                                    value={bio}
                                    onChange={(e) =>
                                        setBio(
                                            e.target.value
                                        )
                                    }
                                    style={styles.input}
                                />


                                <button
                                    type="submit"
                                    style={styles.addButton}
                                >

                                    <UserPlus size={18} />

                                    Add User

                                </button>

                            </form>

                        </div>

                    ) : (

                        <div style={styles.infoBox}>

                            <Clapperboard size={18} />

                            Logged in as{' '}

                            <strong>
                                {user?.role}
                            </strong>

                            . Admin features disabled.

                        </div>

                    )
            }


            {/* USERS GRID */}

            <div style={styles.grid}>


                {
                    users.map((u) => (

                        <div
                            key={u.id}
                            style={styles.userCard}
                        >


                            {/* AVATAR */}

                            <div style={styles.avatar}>

                                {
                                    u.name
                                        ?.charAt(0)
                                        ?.toUpperCase()
                                }

                            </div>


                            {/* NAME */}

                            <h3 style={styles.userName}>
                                {u.name}
                            </h3>


                            {/* EMAIL */}

                            <p style={styles.userEmail}>
                                {u.email}
                            </p>


                            {/* BIO */}

                            <p style={styles.bioText}>

                                "
                                {
                                    u.profile?.bio ||
                                    'No bio yet.'
                                }
                                "

                            </p>


                            {/* ROLE */}

                            <div
                                style={{
                                    ...styles.roleBadge,

                                    background:
                                        u.role === 'admin'
                                            ? '#E50914'
                                            : u.role === 'manager'
                                                ? '#ff9800'
                                                : '#3498db',
                                }}
                            >

                                {
                                    u.role === 'admin'
                                        ? <Crown size={14} />
                                        : <Users size={14} />
                                }

                                {u.role}

                            </div>


                            {/* BUTTON */}

                            <button
                                style={styles.friendButton}
                                onClick={() =>
                                    alert(
                                        `Friend request sent to ${u.name} 🎉`
                                    )
                                }
                            >

                                ➕ Add Friend

                            </button>

                        </div>

                    ))
                }

            </div>

        </div>
    );
};


const styles = {

    container: {
        minHeight: '100vh',

        padding: '30px',

        background:
            'linear-gradient(to bottom right, #000000, #1a0000)',

        fontFamily:
            'Inter, sans-serif',

        color: '#fff',
    },


    topbar: {
        display: 'flex',

        justifyContent: 'space-between',

        alignItems: 'center',

        marginBottom: '30px',
    },


    backButton: {
        display: 'flex',

        alignItems: 'center',

        gap: '8px',

        padding: '12px 18px',

        border: 'none',

        borderRadius: '14px',

        background:
            'rgba(255,255,255,0.08)',

        color: '#fff',

        cursor: 'pointer',

        fontWeight: '600',
    },


    logo: {
        fontSize: '34px',

        fontWeight: '900',
    },


    logoAccent: {
        color: '#E50914',
    },


    pageTitleContainer: {
        marginBottom: '30px',
    },


    pageTitle: {
        display: 'flex',

        alignItems: 'center',

        gap: '12px',

        fontSize: '36px',

        fontWeight: '900',

        marginBottom: '8px',
    },


    subtitle: {
        color: '#aaa',

        fontSize: '15px',
    },


    adminPanel: {
        padding: '25px',

        borderRadius: '24px',

        marginBottom: '35px',

        background:
            'rgba(15,15,15,0.9)',

        border:
            '1px solid rgba(255,255,255,0.08)',
    },


    adminHeader: {
        display: 'flex',

        alignItems: 'center',

        gap: '10px',

        marginBottom: '20px',

        color: '#E50914',
    },


    form: {
        display: 'grid',

        gridTemplateColumns:
            'repeat(auto-fit, minmax(200px, 1fr))',

        gap: '16px',
    },


    input: {
        padding: '14px',

        borderRadius: '14px',

        border:
            '1px solid rgba(255,255,255,0.08)',

        background:
            'rgba(255,255,255,0.04)',

        color: '#fff',

        outline: 'none',
    },


    addButton: {
        display: 'flex',

        justifyContent: 'center',

        alignItems: 'center',

        gap: '8px',

        padding: '14px',

        border: 'none',

        borderRadius: '14px',

        background:
            'linear-gradient(to right, #E50914, #ff2d37)',

        color: '#fff',

        fontWeight: '700',

        cursor: 'pointer',
    },


    infoBox: {
        display: 'flex',

        alignItems: 'center',

        gap: '10px',

        padding: '16px',

        borderRadius: '18px',

        marginBottom: '30px',

        background:
            'rgba(255,255,255,0.05)',

        color: '#ccc',
    },


    grid: {
        display: 'grid',

        gridTemplateColumns:
            'repeat(auto-fill, minmax(260px, 1fr))',

        gap: '24px',
    },


    userCard: {
        padding: '24px',

        borderRadius: '24px',

        background:
            'rgba(15,15,15,0.92)',

        border:
            '1px solid rgba(255,255,255,0.06)',

        textAlign: 'center',

        transition: '0.3s ease',

        boxShadow:
            '0 10px 30px rgba(0,0,0,0.3)',
    },


    avatar: {
        width: '80px',
        height: '80px',

        borderRadius: '50%',

        margin: '0 auto 18px auto',

        display: 'flex',

        justifyContent: 'center',

        alignItems: 'center',

        background:
            'linear-gradient(to right, #E50914, #7a0000)',

        fontSize: '30px',

        fontWeight: '900',
    },


    userName: {
        fontSize: '22px',

        marginBottom: '6px',
    },


    userEmail: {
        color: '#aaa',

        fontSize: '14px',

        marginBottom: '14px',
    },


    bioText: {
        color: '#ddd',

        fontStyle: 'italic',

        minHeight: '50px',

        marginBottom: '18px',

        lineHeight: '1.6',
    },


    roleBadge: {
        display: 'inline-flex',

        alignItems: 'center',

        gap: '6px',

        padding: '8px 14px',

        borderRadius: '999px',

        color: '#fff',

        fontWeight: '700',

        fontSize: '13px',

        textTransform: 'uppercase',

        marginBottom: '20px',
    },


    friendButton: {
        width: '100%',

        padding: '12px',

        border: 'none',

        borderRadius: '14px',

        background:
            'rgba(255,255,255,0.08)',

        color: '#fff',

        fontWeight: '700',

        cursor: 'pointer',

        transition: '0.3s',
    },


    alertSuccess: {
        padding: '14px',

        borderRadius: '14px',

        marginBottom: '18px',

        background:
            'rgba(46,204,113,0.15)',

        border:
            '1px solid rgba(46,204,113,0.4)',

        color: '#7dffb0',
    },


    alertDanger: {
        padding: '14px',

        borderRadius: '14px',

        marginBottom: '18px',

        background:
            'rgba(229,9,20,0.15)',

        border:
            '1px solid rgba(229,9,20,0.4)',

        color: '#ff8a8a',
    },


    loadingContainer: {
        minHeight: '100vh',

        display: 'flex',

        justifyContent: 'center',

        alignItems: 'center',

        background:
            'linear-gradient(to bottom right, #000000, #1a0000)',
    },


    loadingText: {
        color: '#fff',

        fontSize: '24px',
    },

};


export default UserList;