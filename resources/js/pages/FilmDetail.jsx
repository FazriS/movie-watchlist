import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const FilmDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [film, setFilm] = useState(null);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);

    const fetchFilm = async () => {
        try {
            const [filmRes, genreRes] = await Promise.all([
                api.get(`/films/${id}`),
                api.get(`/films/${id}/genres`),
            ]);
            setFilm(filmRes.data.data || filmRes.data);
            setGenres(genreRes.data.data || genreRes.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFilm();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm('Yakin ingin menghapus film ini?')) return;
        try {
            setDeleting(true);
            await api.delete(`/films/${id}`);
            navigate('/films');
        } catch (error) {
            console.error(error);
            alert('Gagal menghapus film');
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div style={styles.page}>
                <div style={styles.loadingWrap}>
                    <p style={styles.loadingText}>Memuat film...</p>
                </div>
            </div>
        );
    }

    if (!film) {
        return (
            <div style={styles.page}>
                <div style={styles.loadingWrap}>
                    <p style={styles.loadingText}>Film tidak ditemukan.</p>
                    <button style={styles.btnBack} onClick={() => navigate(-1)}>Kembali</button>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.page}>

            {/* Back Button */}
            <button style={styles.backBtn} onClick={() => navigate(-1)}>
                <ArrowLeft size={18} />
                <span>Kembali</span>
            </button>

            <div style={styles.card}>
                {/* Poster */}
                <div style={styles.posterWrap}>
                    {film.poster ? (
                        <img src={film.poster} alt={film.title} style={styles.poster} />
                    ) : (
                        <div style={styles.posterFallback}>🎬</div>
                    )}
                </div>

                {/* Info */}
                <div style={styles.info}>
                    <h1 style={styles.title}>{film.title}</h1>

                    <p style={styles.year}>📅 {film.release_year}</p>

                    {/* Genre tags */}
                    {genres.length > 0 && (
                        <div style={styles.genreRow}>
                            {genres.map((genre) => (
                                <span key={genre.id} style={styles.genreTag}>
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Sinopsis */}
                    <div style={styles.synopsisBox}>
                        <h3 style={styles.synopsisLabel}>Sinopsis</h3>
                        <p style={styles.synopsis}>
                            {film.description || 'Tidak ada sinopsis tersedia.'}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div style={styles.actions}>
                        {/* Edit: admin & manager */}
                        {(user?.role === 'admin' || user?.role === 'manager') && (
                            <button
                                style={styles.editBtn}
                                onClick={() => navigate(`/films/edit/${film.id}`)}
                            >
                                <Edit size={16} />
                                Edit Film
                            </button>
                        )}

                        {/* Delete: admin only */}
                        {user?.role === 'admin' && (
                            <button
                                style={styles.deleteBtn}
                                onClick={handleDelete}
                                disabled={deleting}
                            >
                                <Trash2 size={16} />
                                {deleting ? 'Menghapus...' : 'Hapus Film'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    page: {
        minHeight: '100vh',
        background: '#0b0b0b',
        color: '#fff',
        fontFamily: 'Inter, sans-serif',
        padding: '32px 40px',
    },
    loadingWrap: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
        gap: '16px',
    },
    loadingText: {
        color: '#888',
        fontSize: '18px',
    },
    backBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(255,255,255,0.07)',
        border: 'none',
        color: '#fff',
        padding: '10px 18px',
        borderRadius: '12px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        marginBottom: '32px',
        transition: '0.2s',
    },
    card: {
        display: 'flex',
        gap: '40px',
        background: '#151515',
        borderRadius: '28px',
        padding: '36px',
        maxWidth: '960px',
        margin: '0 auto',
        flexWrap: 'wrap',
    },
    posterWrap: {
        flexShrink: 0,
    },
    poster: {
        width: '280px',
        height: '400px',
        objectFit: 'cover',
        borderRadius: '18px',
        display: 'block',
    },
    posterFallback: {
        width: '280px',
        height: '400px',
        background: '#222',
        borderRadius: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '72px',
    },
    info: {
        flex: 1,
        minWidth: '260px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    title: {
        fontSize: '38px',
        fontWeight: '900',
        lineHeight: 1.2,
        margin: 0,
    },
    year: {
        color: '#aaa',
        fontSize: '16px',
        margin: 0,
    },
    genreRow: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
    },
    genreTag: {
        background: 'linear-gradient(to right, #E50914, #c00710)',
        color: '#fff',
        padding: '6px 16px',
        borderRadius: '999px',
        fontSize: '13px',
        fontWeight: '600',
    },
    synopsisBox: {
        background: 'rgba(255,255,255,0.04)',
        borderRadius: '16px',
        padding: '20px',
    },
    synopsisLabel: {
        fontSize: '14px',
        fontWeight: '700',
        color: '#E50914',
        marginBottom: '10px',
        letterSpacing: '1px',
        textTransform: 'uppercase',
    },
    synopsis: {
        color: '#ccc',
        lineHeight: '1.8',
        fontSize: '15px',
        margin: 0,
    },
    actions: {
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        marginTop: '8px',
    },
    editBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: '#1a56db',
        color: '#fff',
        border: 'none',
        padding: '12px 22px',
        borderRadius: '12px',
        cursor: 'pointer',
        fontWeight: '700',
        fontSize: '14px',
    },
    deleteBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: '#E50914',
        color: '#fff',
        border: 'none',
        padding: '12px 22px',
        borderRadius: '12px',
        cursor: 'pointer',
        fontWeight: '700',
        fontSize: '14px',
    },
    btnBack: {
        background: 'rgba(255,255,255,0.07)',
        border: 'none',
        color: '#fff',
        padding: '10px 18px',
        borderRadius: '12px',
        cursor: 'pointer',
    },
};

export default FilmDetail;