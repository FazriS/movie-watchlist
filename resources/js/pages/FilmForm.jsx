import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Image, Tag } from 'lucide-react';
import api from '../api';

const FilmForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [poster, setPoster] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genreList, setGenreList] = useState([]);

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEdit);
    const [previewError, setPreviewError] = useState(false);

    // Fetch genre list dari API
    const fetchGenres = async () => {
        try {
            const res = await api.get('/genres');
            setGenreList(res.data.genres || res.data.data || res.data || []);
        } catch (err) {
            console.error('Gagal memuat genre', err);
        }
    };

    // Fetch data film jika mode edit
    const fetchFilm = async () => {
        try {
            const [filmRes, genreRes] = await Promise.all([
                api.get(`/films/${id}`),
                api.get(`/films/${id}/genres`),
            ]);
            const film = filmRes.data.data || filmRes.data;
            const attachedGenres = genreRes.data.data || genreRes.data || [];

            setTitle(film.title);
            setDescription(film.description || '');
            setReleaseYear(film.release_date);
            setPoster(film.poster || '');
            setSelectedGenres(attachedGenres.map((g) => g.id));
        } catch (err) {
            console.error(err);
            alert('Gagal mengambil data film');
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchGenres();
        if (isEdit) fetchFilm();
    }, []);

    const toggleGenre = (genreId) => {
        setSelectedGenres((prev) =>
            prev.includes(genreId)
                ? prev.filter((g) => g !== genreId)
                : [...prev, genreId]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                title,
                description,
                release_date: releaseYear,
                poster: poster || null,
            };

            let filmId = id;

            if (isEdit) {
                await api.put(`/films/${id}`, payload);
            } else {
                const res = await api.post('/films', payload);
                filmId = res.data.data?.id || res.data?.id;
            }

            // Attach setiap genre yang dipilih
            for (const genreId of selectedGenres) {
                try {
                    await api.put(`/films/${filmId}/genre/${genreId}`);
                } catch (err) {
                    // genre mungkin sudah ter-attach, skip
                }
            }

            navigate('/films');
        } catch (err) {
            console.error(err);
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

            <div style={styles.layout}>
                {/* ===== FORM ===== */}
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
                            <label style={styles.label}>Tanggal Rilis</label>
                            <input
                                type="date"
                                value={releaseYear}
                                onChange={(e) => setReleaseYear(e.target.value)}
                                placeholder="Contoh: 2026-01-01"
                                
                                
                                style={styles.input}
                                required
                            />
                        </div>

                        {/* Poster URL */}
                        <div style={styles.formGroup}>
                            <label style={styles.label}>
                                <Image size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                                Link Poster (URL Gambar)
                            </label>
                            <input
                                type="url"
                                value={poster}
                                onChange={(e) => {
                                    setPoster(e.target.value);
                                    setPreviewError(false);
                                }}
                                placeholder="https://contoh.com/poster.jpg"
                                style={styles.input}
                            />
                            <p style={styles.hint}>Opsional. Tempel URL gambar dari internet.</p>
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

                        {/* Genre Picker */}
                        <div style={styles.formGroup}>
                            <label style={styles.label}>
                                <Tag size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                                Pilih Genre
                            </label>
                            {genreList.length === 0 ? (
                                <p style={styles.hint}>Memuat genre...</p>
                            ) : (
                                <div style={styles.genrePicker}>
                                    {genreList.map((genre) => {
                                        const selected = selectedGenres.includes(genre.id);
                                        return (
                                            <button
                                                key={genre.id}
                                                type="button"
                                                onClick={() => toggleGenre(genre.id)}
                                                style={selected ? styles.genreChipActive : styles.genreChip}
                                            >
                                                {selected && <span style={{ marginRight: '4px' }}>✓</span>}
                                                {genre.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                            {selectedGenres.length > 0 && (
                                <p style={styles.hint}>
                                    {selectedGenres.length} genre dipilih
                                </p>
                            )}
                        </div>

                        {/* Actions */}
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
                                style={loading ? styles.submitBtnDisabled : styles.submitBtn}
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

                {/* ===== PREVIEW POSTER ===== */}
                <div style={styles.previewPanel}>
                    <p style={styles.previewLabel}>Preview Poster</p>
                    <div style={styles.previewBox}>
                        {poster && !previewError ? (
                            <img
                                src={poster}
                                alt="Preview poster"
                                style={styles.previewImg}
                                onError={() => setPreviewError(true)}
                            />
                        ) : (
                            <div style={styles.previewEmpty}>
                                <span style={{ fontSize: '48px' }}>🎬</span>
                                <p style={styles.hint}>
                                    {previewError
                                        ? 'URL gambar tidak valid'
                                        : 'Preview poster akan muncul di sini'}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Summary */}
                    <div style={styles.summaryBox}>
                        <p style={styles.summaryTitle}>{title || 'Judul Film'}</p>
                        <p style={styles.summaryYear}>{releaseYear || 'Tahun'}</p>
                        {selectedGenres.length > 0 && (
                            <div style={styles.summaryGenres}>
                                {genreList
                                    .filter((g) => selectedGenres.includes(g.id))
                                    .map((g) => (
                                        <span key={g.id} style={styles.summaryGenreTag}>
                                            {g.name}
                                        </span>
                                    ))}
                            </div>
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
    layout: {
        display: 'flex',
        gap: '28px',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    card: {
        flex: '1 1 480px',
        background: '#151515',
        borderRadius: '28px',
        padding: '40px',
    },
    pageTitle: {
        fontSize: '28px',
        fontWeight: '900',
        marginBottom: '32px',
        marginTop: 0,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '22px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    label: {
        fontSize: '12px',
        fontWeight: '700',
        color: '#aaa',
        letterSpacing: '0.8px',
        textTransform: 'uppercase',
    },
    input: {
        background: '#1e1e1e',
        border: '1.5px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        padding: '13px 16px',
        color: '#fff',
        fontSize: '15px',
        outline: 'none',
        width: '100%',
        boxSizing: 'border-box',
        fontFamily: 'Inter, sans-serif',
    },
    textarea: {
        background: '#1e1e1e',
        border: '1.5px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        padding: '13px 16px',
        color: '#fff',
        fontSize: '15px',
        outline: 'none',
        width: '100%',
        minHeight: '140px',
        resize: 'vertical',
        boxSizing: 'border-box',
        fontFamily: 'Inter, sans-serif',
        lineHeight: '1.6',
    },
    hint: {
        fontSize: '12px',
        color: '#666',
        margin: 0,
    },
    genrePicker: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
    },
    genreChip: {
        padding: '8px 16px',
        borderRadius: '999px',
        border: '1.5px solid rgba(255,255,255,0.1)',
        background: 'transparent',
        color: '#aaa',
        fontSize: '13px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: '0.2s',
    },
    genreChipActive: {
        padding: '8px 16px',
        borderRadius: '999px',
        border: '1.5px solid #E50914',
        background: 'rgba(229,9,20,0.15)',
        color: '#fff',
        fontSize: '13px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: '0.2s',
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
    submitBtnDisabled: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: '#333',
        border: 'none',
        color: '#666',
        padding: '13px 28px',
        borderRadius: '12px',
        cursor: 'not-allowed',
        fontSize: '14px',
        fontWeight: '700',
    },
    // Preview Panel
    previewPanel: {
        flex: '0 0 260px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        position: 'sticky',
        top: '32px',
    },
    previewLabel: {
        fontSize: '12px',
        fontWeight: '700',
        color: '#aaa',
        letterSpacing: '0.8px',
        textTransform: 'uppercase',
        margin: 0,
    },
    previewBox: {
        borderRadius: '20px',
        overflow: 'hidden',
        background: '#151515',
        border: '1.5px solid rgba(255,255,255,0.07)',
        minHeight: '360px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    previewImg: {
        width: '100%',
        height: '360px',
        objectFit: 'cover',
        display: 'block',
    },
    previewEmpty: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        padding: '32px',
        textAlign: 'center',
    },
    summaryBox: {
        background: '#151515',
        borderRadius: '16px',
        padding: '18px',
        border: '1.5px solid rgba(255,255,255,0.07)',
    },
    summaryTitle: {
        fontSize: '16px',
        fontWeight: '800',
        margin: '0 0 6px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    summaryYear: {
        color: '#888',
        fontSize: '13px',
        margin: '0 0 10px',
    },
    summaryGenres: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
    },
    summaryGenreTag: {
        background: 'rgba(229,9,20,0.2)',
        border: '1px solid rgba(229,9,20,0.4)',
        color: '#ff6b6b',
        padding: '4px 12px',
        borderRadius: '999px',
        fontSize: '12px',
        fontWeight: '600',
    },
};

export default FilmForm;