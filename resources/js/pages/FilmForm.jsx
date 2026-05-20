import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import api from '../api';

const FilmForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEdit);

    useEffect(() => {
        if (isEdit) fetchFilm();
    }, []);

    const fetchFilm = async () => {
        try {
            const response = await api.get(`/films/${id}`);
            const film = response.data.data || response.data;
            setTitle(film.title);
            setDescription(film.description);
            setReleaseYear(film.release_year);
        } catch (error) {
            console.error(error);
            alert('Gagal mengambil data film');
        } finally {
            setFetching(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                title,
                description,
                release_year: releaseYear,
            };

            if (isEdit) {
                await api.put(`/films/${id}`, payload);
            } else {
                await api.post('/films', payload);
            }

            navigate('/films');
        } catch (error) {
            console.error(error);
            alert('Gagal menyimpan film');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div style={styles.page}>
                <div style={styles.centerWrap}>
                    <p style={{ color: '#888' }}>Memuat data film...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.page}>

            {/* Back */}
            <button style={styles.backBtn} onClick={() => navigate(-1)}>
                <ArrowLeft size={18} />
                <span>Kembali</span>
            </button>

            <div style={styles.card}>
                <h1 style={styles.pageTitle}>
                    {isEdit ? '✏️ Edit Film' : '🎬 Tambah Film Baru'}
                </h1>

                <form onSubmit={handleSubmit} style={styles.form}>

                    {/* Judul */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Judul Film</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Contoh: Avengers: Secret Wars"
                            style={styles.input}
                            required
                        />
                    </div>

                    {/* Tahun Rilis */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Tahun Rilis</label>
                        <input
                            type="number"
                            value={releaseYear}
                            onChange={(e) => setReleaseYear(e.target.value)}
                            placeholder="Contoh: 2026"
                            min="1888"
                            max="2100"
                            style={styles.input}
                            required
                        />
                    </div>

                    {/* Deskripsi */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Deskripsi / Sinopsis</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Tulis sinopsis film di sini..."
                            style={styles.textarea}
                            required
                        />
                    </div>

                    {/* Submit */}
                    <div style={styles.actions}>
                        <button
                            type="button"
                            style={styles.cancelBtn}
                            onClick={() => navigate(-1)}
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            style={styles.submitBtn}
                            disabled={loading}
                        >
                            <Save size={16} />
                            {loading
                                ? 'Menyimpan...'
                                : isEdit
                                    ? 'Update Film'
                                    : 'Simpan Film'}
                        </button>
                    </div>

                </form>
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
    centerWrap: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
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
    },
    card: {
        maxWidth: '680px',
        margin: '0 auto',
        background: '#151515',
        borderRadius: '28px',
        padding: '40px',
    },
    pageTitle: {
        fontSize: '30px',
        fontWeight: '900',
        marginBottom: '32px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    label: {
        fontSize: '13px',
        fontWeight: '700',
        color: '#aaa',
        letterSpacing: '0.8px',
        textTransform: 'uppercase',
    },
    input: {
        background: '#1e1e1e',
        border: '1.5px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        padding: '14px 16px',
        color: '#fff',
        fontSize: '15px',
        outline: 'none',
        transition: '0.2s',
        width: '100%',
        boxSizing: 'border-box',
    },
    textarea: {
        background: '#1e1e1e',
        border: '1.5px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        padding: '14px 16px',
        color: '#fff',
        fontSize: '15px',
        outline: 'none',
        transition: '0.2s',
        width: '100%',
        minHeight: '160px',
        resize: 'vertical',
        boxSizing: 'border-box',
        fontFamily: 'Inter, sans-serif',
        lineHeight: '1.6',
    },
    actions: {
        display: 'flex',
        gap: '12px',
        justifyContent: 'flex-end',
        marginTop: '8px',
    },
    cancelBtn: {
        background: 'rgba(255,255,255,0.07)',
        border: 'none',
        color: '#fff',
        padding: '13px 24px',
        borderRadius: '12px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
    },
    submitBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'linear-gradient(to right, #E50914, #ff2d37)',
        border: 'none',
        color: '#fff',
        padding: '13px 28px',
        borderRadius: '12px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '700',
        boxShadow: '0 4px 14px rgba(229,9,20,0.35)',
    },
};

export default FilmForm;