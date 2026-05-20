import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Film, Heart, Tag, LogOut, User, ChevronLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../api';

const GenreList = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // ---- State: Genre ----
    const [genres, setGenres] = useState([]);
    const [genreLoading, setGenreLoading] = useState(true);
    const [genreError, setGenreError] = useState('');

    // ---- State: Form Tambah Genre ----
    const [newGenreName, setNewGenreName] = useState('');
    const [addLoading, setAddLoading] = useState(false);
    const [addMsg, setAddMsg] = useState('');

    // ---- State: Attach Genre ke Film ----
    const [films, setFilms] = useState([]);
    const [selectedFilmId, setSelectedFilmId] = useState('');
    const [selectedGenreId, setSelectedGenreId] = useState('');
    const [attachLoading, setAttachLoading] = useState(false);
    const [attachMsg, setAttachMsg] = useState('');

    // Role check: hanya admin & manager yang bisa tambah/attach
    const canManage = user?.role === 'admin' || user?.role === 'manager';

    // ---- Fetch Genres ----
    const fetchGenres = async () => {
        setGenreLoading(true);
        setGenreError('');
        try {
            const res = await api.get('/genres');
            setGenres(res.data.genres || []);
        } catch (err) {
            setGenreError('Gagal memuat genre. Pastikan Anda sudah login.');
        } finally {
            setGenreLoading(false);
        }
    };

    // ---- Fetch Films (untuk dropdown attach) ----
    const fetchFilms = async () => {
        try {
            const res = await api.get('/films');
            setFilms(res.data.films || res.data.data || []);
        } catch (err) {
            // silent — hanya dibutuhkan kalau canManage
        }
    };

    useEffect(() => {
        fetchGenres();
        if (canManage) fetchFilms();
    }, []);

    // ---- Handle Tambah Genre ----
    const handleAddGenre = async (e) => {
        e.preventDefault();
        if (!newGenreName.trim()) return;
        setAddLoading(true);
        setAddMsg('');
        try {
            await api.post('/genres', { name: newGenreName.trim() });
            setAddMsg('✅ Genre berhasil ditambahkan!');
            setNewGenreName('');
            fetchGenres();
        } catch (err) {
            const msg = err.response?.data?.message || 'Gagal menambahkan genre.';
            setAddMsg(`❌ ${msg}`);
        } finally {
            setAddLoading(false);
        }
    };

    // ---- Handle Attach Genre ke Film ----
    const handleAttachGenre = async (e) => {
        e.preventDefault();
        if (!selectedFilmId || !selectedGenreId) return;
        setAttachLoading(true);
        setAttachMsg('');
        try {
            const res = await api.put(`/films/${selectedFilmId}/genre/${selectedGenreId}`);
            setAttachMsg(`✅ ${res.data.message}`);
            setSelectedFilmId('');
            setSelectedGenreId('');
        } catch (err) {
            const msg = err.response?.data?.message || 'Gagal menyematkan genre.';
            setAttachMsg(`❌ ${msg}`);
        } finally {
            setAttachLoading(false);
        }
    };

    return (
        <div style={s.container}>
            {/* ===== SIDEBAR ===== */}
            <div style={{ ...s.sidebar, width: sidebarOpen ? '220px' : '80px' }}>
                <button style={s.menuButton} onClick={() => setSidebarOpen(!sidebarOpen)}>
                    <Menu size={26} />
                </button>
                <div style={s.sidebarMenu}>
                    <Link to="/dashboard" style={s.sidebarItem}>
                        <Film size={22} />{sidebarOpen && <span>Dashboard</span>}
                    </Link>
                    <Link to="/genres" style={{ ...s.sidebarItem, background: 'rgba(229,9,20,0.15)', color: '#E50914' }}>
                        <Tag size={22} />{sidebarOpen && <span>Genre</span>}
                    </Link>
                    <Link to="#" style={s.sidebarItem}>
                        <Heart size={22} />{sidebarOpen && <span>Watchlist</span>}
                    </Link>
                </div>
            </div>

            {/* ===== MAIN ===== */}
            <div style={{ ...s.main, marginLeft: sidebarOpen ? '220px' : '80px' }}>
                {/* Topbar */}
                <div style={s.topbar}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <button style={s.backBtn} onClick={() => navigate('/dashboard')}>
                            <ChevronLeft size={18} /> Back
                        </button>
                        <h1 style={s.logo}>Movie<span style={s.accent}>In</span></h1>
                    </div>
                    <div style={s.topRight}>
                        <button style={s.profileBtn} onClick={() => navigate('/me')}>
                            <User size={18} /><span>{user?.name}</span>
                        </button>
                        <button style={s.logoutBtn} onClick={logout}><LogOut size={18} /></button>
                    </div>
                </div>

                {/* Page Header */}
                <div style={s.pageHeader}>
                    <Tag size={28} style={{ color: '#E50914' }} />
                    <h2 style={s.pageTitle}>Daftar Genre</h2>
                </div>

                {/* ===== GENRE LIST TABLE ===== */}
                <div style={s.card}>
                    <h3 style={s.cardTitle}>Semua Genre</h3>
                    {genreLoading ? (
                        <p style={s.muted}>Memuat genre...</p>
                    ) : genreError ? (
                        <p style={s.errorText}>{genreError}</p>
                    ) : genres.length === 0 ? (
                        <p style={s.muted}>Belum ada genre.</p>
                    ) : (
                        <div style={s.tableWrapper}>
                            <table style={s.table}>
                                <thead>
                                    <tr>
                                        <th style={s.th}>#</th>
                                        <th style={s.th}>Nama Genre</th>
                                        <th style={s.th}>Dibuat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {genres.map((g, i) => (
                                        <tr key={g.id} style={i % 2 === 0 ? s.trEven : s.trOdd}>
                                            <td style={s.td}>{i + 1}</td>
                                            <td style={s.td}>
                                                <span style={s.genreBadge}>{g.name}</span>
                                            </td>
                                            <td style={s.td}>{new Date(g.created_at).toLocaleDateString('id-ID')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* ===== FORM TAMBAH GENRE (admin/manager only) ===== */}
                {canManage && (
                    <div style={s.card}>
                        <h3 style={s.cardTitle}>Tambah Genre Baru</h3>
                        <p style={s.muted}>Hanya admin &amp; manager yang dapat menambah genre.</p>
                        <div style={s.formRow}>
                            <input
                                style={s.input}
                                type="text"
                                placeholder="Nama genre baru..."
                                value={newGenreName}
                                onChange={e => setNewGenreName(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleAddGenre(e)}
                            />
                            <button
                                style={addLoading ? s.btnDisabled : s.btn}
                                onClick={handleAddGenre}
                                disabled={addLoading}
                            >
                                {addLoading ? 'Menyimpan...' : '+ Tambah'}
                            </button>
                        </div>
                        {addMsg && <p style={addMsg.startsWith('✅') ? s.successText : s.errorText}>{addMsg}</p>}
                    </div>
                )}

                {/* ===== FORM SEMATKAN GENRE KE FILM (admin/manager only) ===== */}
                {canManage && (
                    <div style={s.card}>
                        <h3 style={s.cardTitle}>Sematkan Genre ke Film</h3>
                        <p style={s.muted}>Pilih film dan genre, lalu klik Sematkan.</p>
                        <div style={s.formGrid}>
                            <div style={s.formGroup}>
                                <label style={s.label}>Pilih Film</label>
                                <select
                                    style={s.select}
                                    value={selectedFilmId}
                                    onChange={e => setSelectedFilmId(e.target.value)}
                                >
                                    <option value="">-- Pilih Film --</option>
                                    {films.map(f => (
                                        <option key={f.id} value={f.id}>{f.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div style={s.formGroup}>
                                <label style={s.label}>Pilih Genre</label>
                                <select
                                    style={s.select}
                                    value={selectedGenreId}
                                    onChange={e => setSelectedGenreId(e.target.value)}
                                >
                                    <option value="">-- Pilih Genre --</option>
                                    {genres.map(g => (
                                        <option key={g.id} value={g.id}>{g.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button
                            style={attachLoading || !selectedFilmId || !selectedGenreId ? s.btnDisabled : s.btn}
                            onClick={handleAttachGenre}
                            disabled={attachLoading || !selectedFilmId || !selectedGenreId}
                        >
                            {attachLoading ? 'Menyematkan...' : '🔗 Sematkan Genre'}
                        </button>
                        {attachMsg && (
                            <p style={attachMsg.startsWith('✅') ? s.successText : s.errorText}>{attachMsg}</p>
                        )}
                    </div>
                )}

                {/* Info untuk role user */}
                {!canManage && (
                    <div style={s.infoBox}>
                        <p>ℹ️ Kamu login sebagai <strong>{user?.role}</strong>. Fitur tambah genre dan sematkan genre ke film hanya tersedia untuk <strong>admin</strong> dan <strong>manager</strong>.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// ===== STYLES =====
const s = {
    container: { display: 'flex', minHeight: '100vh', backgroundColor: '#0b0b0b', color: '#fff', fontFamily: 'Inter, sans-serif' },
    sidebar: { position: 'fixed', top: 0, left: 0, height: '100vh', background: 'rgba(15,15,15,0.97)', borderRight: '1px solid rgba(255,255,255,0.06)', transition: '0.3s ease', overflow: 'hidden', zIndex: 100 },
    menuButton: { width: '100%', padding: '24px', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' },
    sidebarMenu: { display: 'flex', flexDirection: 'column', gap: '14px', padding: '10px' },
    sidebarItem: { display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', borderRadius: '14px', color: '#fff', textDecoration: 'none', background: 'rgba(255,255,255,0.03)' },
    main: { flex: 1, padding: '24px', transition: '0.3s' },
    topbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
    logo: { fontSize: '28px', fontWeight: '900', letterSpacing: '-1px', margin: 0 },
    accent: { color: '#E50914' },
    topRight: { display: 'flex', alignItems: 'center', gap: '12px' },
    profileBtn: { display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '14px', border: 'none', background: 'rgba(255,255,255,0.08)', color: '#fff', cursor: 'pointer' },
    logoutBtn: { padding: '10px', borderRadius: '12px', border: 'none', background: 'rgba(229,9,20,0.15)', color: '#E50914', cursor: 'pointer' },
    backBtn: { display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '10px', border: 'none', background: 'rgba(255,255,255,0.06)', color: '#aaa', cursor: 'pointer', fontSize: '14px' },
    pageHeader: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' },
    pageTitle: { fontSize: '28px', fontWeight: '800', margin: 0 },
    card: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '28px', marginBottom: '24px' },
    cardTitle: { fontSize: '18px', fontWeight: '700', marginBottom: '16px', marginTop: 0, color: '#fff' },
    muted: { color: '#888', fontSize: '14px', margin: '0 0 12px' },
    tableWrapper: { overflowX: 'auto' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#aaa', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase' },
    td: { padding: '14px 16px', fontSize: '15px' },
    trEven: { background: 'rgba(255,255,255,0.02)' },
    trOdd: { background: 'transparent' },
    genreBadge: { padding: '4px 14px', borderRadius: '20px', background: 'linear-gradient(to right, #1f1f1f, #2b0000)', border: '1px solid rgba(229,9,20,0.3)', fontSize: '14px', color: '#fff' },
    formRow: { display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '12px' },
    formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' },
    formGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
    label: { fontSize: '13px', color: '#aaa', fontWeight: '600' },
    input: { padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '15px', outline: 'none', minWidth: '240px' },
    select: { padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: '#1a1a1a', color: '#fff', fontSize: '15px', outline: 'none', cursor: 'pointer' },
    btn: { padding: '12px 24px', borderRadius: '12px', border: 'none', background: 'linear-gradient(to right, #E50914, #ff2d37)', color: '#fff', fontWeight: '700', cursor: 'pointer', fontSize: '15px' },
    btnDisabled: { padding: '12px 24px', borderRadius: '12px', border: 'none', background: '#333', color: '#666', fontWeight: '700', cursor: 'not-allowed', fontSize: '15px' },
    successText: { color: '#4ade80', marginTop: '10px', fontSize: '14px' },
    errorText: { color: '#f87171', marginTop: '10px', fontSize: '14px' },
    infoBox: { background: 'rgba(229,9,20,0.08)', border: '1px solid rgba(229,9,20,0.2)', borderRadius: '14px', padding: '18px 24px', color: '#ccc', fontSize: '14px', lineHeight: '1.6' },
};

export default GenreList;
