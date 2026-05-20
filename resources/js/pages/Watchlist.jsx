import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Film, Heart, Tag, LogOut, User, ChevronLeft, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // Sesuaikan path context auth kamu
import api from '../api'; // Axios instance yang sudah menampung token JWT kamu

const Watchlist = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // ---- State Watchlist ----
    const [watchlists, setWatchlists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // ---- Fetch Data Watchlist ----
    const fetchWatchlist = async () => {
        setLoading(true);
        setError('');
        try {
            // Mengambil data via instance 'api' yang otomatis mengirim token JWT di header
            const res = await api.get('/watchlists');
            setWatchlists(res.data.data || []);
        } catch (err) {
            setError('Gagal memuat watchlist. Pastikan Anda sudah login.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWatchlist();
    }, []);

    // ---- Handle Ubah Status (PUT) ----
    const handleUpdateStatus = async (id, newStatus) => {
        try {
            const res = await api.put(`/watchlists/${id}`, { status: newStatus });
            if (res.data.success) {
                alert('✅ Status watchlist berhasil diperbarui!');
                // Update data di posisi state lokal agar tampilan langsung berubah
                setWatchlists(prev => prev.map(item => 
                    item.id === id ? { ...item, status: newStatus } : item
                ));
            }
        } catch (err) {
            alert('❌ Gagal memperbarui status.');
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
                    <Link to="/genres" style={s.sidebarItem}>
                        <Tag size={22} />{sidebarOpen && <span>Genre</span>}
                    </Link>
                    {/* Menu Aktif Watchlist */}
                    <Link to="/watchlist" style={{ ...s.sidebarItem, background: 'rgba(229,9,20,0.15)', color: '#E50914' }}>
                        <Heart size={22} />{sidebarOpen && <span>Watchlist</span>}
                    </Link>
                </div>
            </div>

            {/* ===== MAIN CONTENT ===== */}
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
                    <Heart size={28} style={{ color: '#E50914' }} />
                    <h2 style={s.pageTitle}>My Watchlist</h2>
                </div>

                {/* ===== DAFTAR WATCHLIST (CARD GRID) ===== */}
                {loading ? (
                    <p style={s.muted}>Memuat daftar watchlist...</p>
                ) : error ? (
                    <p style={s.errorText}>{error}</p>
                ) : watchlists.length === 0 ? (
                    <div style={s.card}>
                        <p style={s.muted}>Belum ada film di dalam daftar watchlist kamu.</p>
                    </div>
                ) : (
                    <div style={s.grid}>
                        {watchlists.map((item) => (
                            <div key={item.id} style={s.movieCard}>
                                <div>
                                    <h3 style={s.movieTitle}>{item.film?.title || 'Judul Film'}</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
                                        <Clock size={14} style={{ color: '#E50914' }} />
                                        <span style={s.statusText}>{item.status}</span>
                                    </div>
                                </div>

                                {/* Dropdown Aksi Edit Status */}
                                <div style={{ marginTop: 'auto' }}>
                                    <label style={s.label}>Ubah Status :</label>
                                    <select
                                        style={s.select}
                                        value={item.status}
                                        onChange={(e) => handleUpdateStatus(item.id, e.target.value)}
                                    >
                                        <option value="planned">Planned</option>
                                        <option value="watching">Watching</option>
                                        <option value="watched">Watched</option>
                                    </select>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// ===== STYLES INDUK (Sesuai Tema MovieIn Kamu) =====
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
    muted: { color: '#888', fontSize: '14px', margin: 0 },
    errorText: { color: '#f87171', fontSize: '14px' },
    
    // Grid & Card Styles Baru
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' },
    movieCard: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '160px' },
    movieTitle: { fontSize: '18px', fontWeight: '700', margin: '0 0 6px', color: '#fff' },
    statusText: { fontSize: '13px', textTransform: 'capitalize', color: '#aaa', fontWeight: '500' },
    label: { fontSize: '12px', color: '#666', fontWeight: '600', display: 'block', marginBottom: '6px' },
    select: { width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: '#141414', color: '#fff', fontSize: '14px', outline: 'none', cursor: 'pointer' }
};

export default Watchlist;