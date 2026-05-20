import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const FilmList = () => {

    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user } = useAuth();

    const fetchFilms = async () => {
        try {

            const response = await api.get('/films');

            setFilms(response.data.data || response.data);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFilms();
    }, []);

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            'Yakin ingin menghapus film ini?'
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/films/${id}`);

            fetchFilms();

        } catch (error) {
            console.error(error);
            alert('Gagal menghapus film');
        }
    };

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div style={styles.container}>

            <div style={styles.header}>
                <h1 style={styles.title}>Movie List</h1>

                {(user?.role === 'admin' ||
                    user?.role === 'manager') && (

                    <Link
                        to="/films/create"
                        style={styles.addButton}
                    >
                        + Tambah Film
                    </Link>
                )}
            </div>

            <div style={styles.grid}>

                {films.map((film) => (

                    <div key={film.id} style={styles.card}>

                        <h2 style={styles.movieTitle}>
                            {film.title}
                        </h2>

                        <p style={styles.year}>
                            Tahun: {film.release_year}
                        </p>

                        <p style={styles.description}>
                            {film.description}
                        </p>

                        <div style={styles.actions}>

                            <Link
                                to={`/films/${film.id}`}
                                style={styles.detailButton}
                            >
                                Detail
                            </Link>

                            {(user?.role === 'admin' ||
                                user?.role === 'manager') && (

                                <Link
                                    to={`/films/edit/${film.id}`}
                                    style={styles.editButton}
                                >
                                    Edit
                                </Link>
                            )}

                            {user?.role === 'admin' && (

                                <button
                                    onClick={() =>
                                        handleDelete(film.id)
                                    }
                                    style={styles.deleteButton}
                                >
                                    Delete
                                </button>
                            )}

                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

const styles = {

    container: {
        padding: '40px',
        background: '#111',
        minHeight: '100vh',
        color: '#fff',
        fontFamily: 'Arial',
    },

    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
    },

    title: {
        fontSize: '36px',
    },

    addButton: {
        background: '#E50914',
        color: '#fff',
        padding: '10px 18px',
        borderRadius: '10px',
        textDecoration: 'none',
        fontWeight: 'bold',
    },

    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
    },

    card: {
        background: '#1e1e1e',
        padding: '20px',
        borderRadius: '14px',
    },

    movieTitle: {
        marginBottom: '10px',
    },

    year: {
        color: '#bbb',
        marginBottom: '10px',
    },

    description: {
        color: '#ddd',
        marginBottom: '20px',
    },

    actions: {
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
    },

    detailButton: {
        background: '#444',
        color: '#fff',
        padding: '8px 14px',
        borderRadius: '8px',
        textDecoration: 'none',
    },

    editButton: {
        background: '#007bff',
        color: '#fff',
        padding: '8px 14px',
        borderRadius: '8px',
        textDecoration: 'none',
        border: 'none',
    },

    deleteButton: {
        background: '#dc3545',
        color: '#fff',
        padding: '8px 14px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
    },
};

export default FilmList;