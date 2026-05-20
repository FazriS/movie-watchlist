import React, {
    useState,
    useEffect,
} from 'react';

import {
    User,
    Mail,
    Shield,
    ArrowLeft,
} from 'lucide-react';

import {
    useNavigate,
} from 'react-router-dom';

import api from '../api';


const MyProfile = () => {

    const [profileData, setProfileData] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState('');

    const navigate = useNavigate();


    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const response =
                    await api.get('/me');


                // Support API Resource / direct object

                if (
                    response.data &&
                    response.data.data
                ) {

                    setProfileData(
                        response.data.data
                    );

                } else {

                    setProfileData(
                        response.data
                    );

                }

            } catch (err) {

                console.error(err);

                setError(
                    'Failed to load profile.'
                );

            } finally {

                setLoading(false);

            }
        };

        fetchProfile();

    }, []);


    if (loading) {

        return (

            <div style={styles.loadingContainer}>

                <div style={styles.loadingCard}>

                    <h2 style={styles.loadingText}>
                        Loading Profile...
                    </h2>

                </div>

            </div>
        );
    }


    if (error) {

        return (

            <div style={styles.loadingContainer}>

                <div style={styles.errorCard}>
                    {error}
                </div>

            </div>
        );
    }


    const bioText =
        profileData?.profile?.bio ||
        profileData?.user_profile?.bio ||
        'This user has no bio yet.';


    return (

        <div style={styles.container}>


            {/* BACK BUTTON */}

            <button
                style={styles.backButton}
                onClick={() =>
                    navigate('/dashboard')
                }
            >

                <ArrowLeft size={18} />

                Back

            </button>


            {/* PROFILE CARD */}

            <div style={styles.card}>


                {/* HEADER */}

                <div style={styles.header}>


                    {/* Avatar */}

                    <div style={styles.avatar}>

                        {
                            profileData?.name
                                ?.charAt(0)
                                ?.toUpperCase()
                        }

                    </div>


                    {/* Name */}

                    <h1 style={styles.name}>
                        {profileData?.name}
                    </h1>


                    {/* Email */}

                    <p style={styles.email}>
                        {profileData?.email}
                    </p>


                    {/* Role Badge */}

                    <div style={styles.roleBadge}>

                        <Shield size={16} />

                        {
                            profileData?.role
                                ?.toUpperCase()
                        }

                    </div>

                </div>


                {/* BODY */}

                <div style={styles.body}>


                    {/* APP TITLE */}

                    <div style={styles.appTitle}>

                        Movie
                        <span style={styles.appAccent}>
                            In
                        </span>

                    </div>


                    {/* INFO */}

                    <div style={styles.infoContainer}>


                        <div style={styles.infoCard}>

                            <div style={styles.infoIcon}>
                                <User size={20} />
                            </div>

                            <div>

                                <p style={styles.infoLabel}>
                                    Full Name
                                </p>

                                <h3 style={styles.infoValue}>
                                    {profileData?.name}
                                </h3>

                            </div>

                        </div>


                        <div style={styles.infoCard}>

                            <div style={styles.infoIcon}>
                                <Mail size={20} />
                            </div>

                            <div>

                                <p style={styles.infoLabel}>
                                    Email Address
                                </p>

                                <h3 style={styles.infoValue}>
                                    {profileData?.email}
                                </h3>

                            </div>

                        </div>

                    </div>


                    {/* BIO */}

                    <div style={styles.bioSection}>

                        <p style={styles.bioLabel}>
                            Bio
                        </p>

                        <p style={styles.bioText}>
                            {bioText}
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};


const styles = {

    container: {
        minHeight: '100vh',

        background:
            'linear-gradient(to bottom right, #000000, #1a0000)',

        display: 'flex',

        flexDirection: 'column',

        justifyContent: 'center',

        alignItems: 'center',

        padding: '40px 20px',

        fontFamily:
            'Inter, sans-serif',
    },


    backButton: {
        alignSelf: 'flex-start',

        marginBottom: '20px',

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


    card: {
        width: '100%',
        maxWidth: '850px',

        borderRadius: '28px',

        overflow: 'hidden',

        background:
            'rgba(15,15,15,0.95)',

        border:
            '1px solid rgba(255,255,255,0.08)',

        backdropFilter: 'blur(12px)',

        boxShadow:
            '0 10px 40px rgba(0,0,0,0.5)',
    },


    header: {
        padding: '50px 30px',

        background:
            'linear-gradient(to right, #E50914, #7a0000)',

        display: 'flex',

        flexDirection: 'column',

        alignItems: 'center',
    },


    avatar: {
        width: '120px',
        height: '120px',

        borderRadius: '50%',

        display: 'flex',

        justifyContent: 'center',

        alignItems: 'center',

        background:
            'rgba(255,255,255,0.15)',

        color: '#fff',

        fontSize: '48px',

        fontWeight: '900',

        marginBottom: '20px',

        border:
            '4px solid rgba(255,255,255,0.2)',
    },


    name: {
        fontSize: '34px',

        fontWeight: '900',

        color: '#fff',

        marginBottom: '8px',
    },


    email: {
        color: '#ffd5d5',

        marginBottom: '18px',

        fontSize: '15px',
    },


    roleBadge: {
        display: 'flex',

        alignItems: 'center',

        gap: '8px',

        padding: '10px 18px',

        borderRadius: '999px',

        background:
            'rgba(0,0,0,0.25)',

        color: '#fff',

        fontWeight: '700',
    },


    body: {
        padding: '35px',
    },


    appTitle: {
        fontSize: '32px',

        fontWeight: '900',

        marginBottom: '30px',

        color: '#fff',
    },


    appAccent: {
        color: '#E50914',
    },


    infoContainer: {
        display: 'grid',

        gridTemplateColumns:
            'repeat(auto-fit, minmax(250px, 1fr))',

        gap: '20px',

        marginBottom: '30px',
    },


    infoCard: {
        display: 'flex',

        alignItems: 'center',

        gap: '16px',

        padding: '20px',

        borderRadius: '20px',

        background:
            'rgba(255,255,255,0.04)',

        border:
            '1px solid rgba(255,255,255,0.06)',
    },


    infoIcon: {
        width: '50px',
        height: '50px',

        borderRadius: '14px',

        display: 'flex',

        justifyContent: 'center',

        alignItems: 'center',

        background:
            'rgba(229,9,20,0.15)',

        color: '#E50914',
    },


    infoLabel: {
        color: '#999',

        fontSize: '13px',

        marginBottom: '4px',
    },


    infoValue: {
        color: '#fff',

        fontSize: '18px',

        fontWeight: '700',
    },


    bioSection: {
        padding: '24px',

        borderRadius: '22px',

        background:
            'rgba(255,255,255,0.04)',

        border:
            '1px solid rgba(255,255,255,0.06)',
    },


    bioLabel: {
        color: '#E50914',

        fontWeight: '700',

        marginBottom: '12px',

        fontSize: '15px',
    },


    bioText: {
        color: '#ddd',

        lineHeight: '1.8',

        fontSize: '15px',
    },


    loadingContainer: {
        minHeight: '100vh',

        display: 'flex',

        justifyContent: 'center',

        alignItems: 'center',

        background:
            'linear-gradient(to bottom right, #000000, #1a0000)',
    },


    loadingCard: {
        padding: '40px',

        borderRadius: '20px',

        background:
            'rgba(15,15,15,0.9)',
    },


    loadingText: {
        color: '#fff',
    },


    errorCard: {
        padding: '20px 30px',

        borderRadius: '16px',

        background:
            'rgba(229,9,20,0.15)',

        border:
            '1px solid rgba(229,9,20,0.4)',

        color: '#ff8a8a',

        fontWeight: '600',
    },

};


export default MyProfile;