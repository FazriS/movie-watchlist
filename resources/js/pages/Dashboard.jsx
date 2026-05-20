import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, User, Film, Heart, LogOut, UserPlus, Tag, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../api';

const genres = ['Action', 'Sci-Fi', 'Anime', 'Thriller', 'Comedy', 'Adventure'];

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

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

    // Film pertama dijadikan hero
    const heroFilm = films[0] || null;
    const restFilms = films.slice(1);

    return (
        <div style={styles.container}>
            {/* ================= SIDEBAR ================= */}
            <div style={{ ...styles.sidebar, width: sidebarOpen ? '220px' : '80px' }}>
                <button style={styles.menuButton} onClick={() => setSidebarOpen(!sidebarOpen)}>
                    <Menu size={26} />
                </button>

                <div style={styles.sidebarMenu}>
                    <Link to="/films" style={styles.sidebarItem}>
                        <Film size={22} />
                        {sidebarOpen && <span>List Film</span>}
                    </Link>
                    <Link to="/genres" style={styles.sidebarItem}>
                        <Tag size={22} />
                        {sidebarOpen && <span>Genre</span>}
                    </Link>
                    <Link to="/watchlist" style={styles.sidebarItem}>
                        <Heart size={22} />
                        {sidebarOpen && <span>Watchlist</span>}
                    </Link>
                </div>
            </div>

            {/* ================= MAIN CONTENT ================= */}
            <div style={{ ...styles.mainContent, marginLeft: sidebarOpen ? '220px' : '80px' }}>

                {/* ================= TOPBAR ================= */}
                <div style={styles.topbar}>
                    <h1 style={styles.logo}>
                        Movie<span style={styles.logoAccent}>In</span>
                    </h1>

                    <div style={styles.topbarRight}>
                        {/* Tombol Tambah Film: hanya admin & manager */}
                        {(user?.role === 'admin' || user?.role === 'manager') && (
                            <button
                                style={styles.addFilmButton}
                                onClick={() => navigate('/films/create')}
                            >
                                <Plus size={16} />
                                <span>Tambah Film</span>
                            </button>
                        )}

                        <button style={styles.friendButton} onClick={() => navigate('/users')}>
                            <UserPlus size={18} />
                            <span>Add Friend</span>
                        </button>

                        <button style={styles.profileButton} onClick={() => navigate('/me')}>
                            <User size={18} />
                            <span>{user?.name}</span>
                        </button>

                        <button style={styles.logoutButton} onClick={logout}>
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>

                {/* ================= HERO SECTION ================= */}
                {loading ? (
                    <div style={styles.heroSkeleton}>
                        <div style={styles.skeletonPulse} />
                    </div>
                ) : heroFilm ? (
                    <div
                        style={{
                            ...styles.heroSection,
                            backgroundImage: heroFilm.poster
                                ? `url(${heroFilm.poster})`
                                : `url(https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200)`,
                        }}
                        onClick={() => navigate(`/films/${heroFilm.id}`)}
                    >
                        <div style={styles.heroOverlay}>
                            <p style={styles.newBadge}>NEW RELEASE</p>
                            <h2 style={styles.heroTitle}>{heroFilm.title}</h2>
                            <p style={styles.heroYear}>{heroFilm.release_year}</p>
                            <button style={styles.watchButton}>▶ Lihat Detail</button>
                        </div>
                    </div>
                ) : (
                    <div style={styles.heroEmpty}>Belum ada film tersedia.</div>
                )}

                {/* ================= GENRES ================= */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Browse Genres</h3>
                    <div style={styles.genreContainer}>
                        {genres.map((genre, index) => (
                            <div key={index} style={styles.genreCard}>{genre}</div>
                        ))}
                    </div>
                </div>

                {/* ================= SEMUA FILM DARI DATABASE ================= */}
                <div style={styles.section}>
                    <div style={styles.sectionHeader}>
                        <h3 style={styles.sectionTitle}>Semua Film</h3>
                        <Link to="/films" style={styles.seeAll}>Lihat Semua →</Link>
                    </div>

                    {loading ? (
                        <div style={styles.movieRow}>
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} style={styles.movieCardSkeleton} />
                            ))}
                        </div>
                    ) : films.length === 0 ? (
                        <p style={styles.emptyText}>Belum ada film di database.</p>
                    ) : (
                        <div style={styles.movieRow}>
                            {films.map((film) => (
                                <div
                                    key={film.id}
                                    style={styles.movieCard}
                                    onClick={() => navigate(`/films/${film.id}`)}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.transform = 'translateY(-6px)';
                                        e.currentTarget.style.boxShadow = '0 12px 30px rgba(229,9,20,0.25)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    {film.poster ? (
                                        <img src={film.poster} alt={film.title} style={styles.movieImage} />
                                    ) : (
                                        <div style={styles.movieImageFallback}>🎬</div>
                                    )}
                                    <div style={styles.movieInfo}>
                                        <p style={styles.movieTitle}>{film.title}</p>
                                        <p style={styles.movieYear}>{film.release_year}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#0b0b0b',
        color: '#fff',
        fontFamily: 'Inter, sans-serif',
    },
    sidebar: {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        background: 'rgba(15,15,15,0.95)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        transition: '0.3s ease',
        overflow: 'hidden',
        zIndex: 100,
    },
    menuButton: {
        width: '100%',
        padding: '24px',
        background: 'transparent',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
    },
    sidebarMenu: {
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        padding: '10px',
    },
    sidebarItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '14px',
        borderRadius: '14px',
        color: '#fff',
        textDecoration: 'none',
        transition: '0.3s',
        background: 'rgba(255,255,255,0.03)',
    },
    mainContent: {
        flex: 1,
        padding: '24px',
        transition: '0.3s ease',
    },
    topbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        flexWrap: 'wrap',
        gap: '12px',
    },
    logo: {
        fontSize: '34px',
        fontWeight: '900',
        letterSpacing: '-1px',
    },
    logoAccent: {
        color: '#E50914',
    },
    topbarRight: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexWrap: 'wrap',
    },
    addFilmButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 16px',
        borderRadius: '14px',
        border: '1.5px solid #E50914',
        background: 'transparent',
        color: '#E50914',
        cursor: 'pointer',
        fontWeight: '700',
        transition: '0.2s',
    },
    friendButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 16px',
        borderRadius: '14px',
        border: 'none',
        background: 'linear-gradient(to right, #E50914, #ff2d37)',
        color: '#fff',
        cursor: 'pointer',
        fontWeight: '700',
        boxShadow: '0 4px 14px rgba(229,9,20,0.35)',
        transition: '0.3s',
    },
    profileButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 16px',
        borderRadius: '14px',
        border: 'none',
        background: 'rgba(255,255,255,0.08)',
        color: '#fff',
        cursor: 'pointer',
    },
    logoutButton: {
        padding: '10px',
        borderRadius: '12px',
        border: 'none',
        background: 'rgba(229,9,20,0.15)',
        color: '#E50914',
        cursor: 'pointer',
    },
    heroSection: {
        height: '420px',
        borderRadius: '28px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
        marginBottom: '40px',
        cursor: 'pointer',
        transition: '0.3s',
    },
    heroSkeleton: {
        height: '420px',
        borderRadius: '28px',
        background: '#1a1a1a',
        marginBottom: '40px',
        overflow: 'hidden',
    },
    heroEmpty: {
        height: '120px',
        borderRadius: '28px',
        background: '#1a1a1a',
        marginBottom: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#555',
    },
    skeletonPulse: {
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, #1a1a1a, #2a2a2a, #1a1a1a)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
    },
    heroOverlay: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '40px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.1))',
    },
    newBadge: {
        color: '#E50914',
        fontWeight: '700',
        marginBottom: '8px',
        fontSize: '13px',
        letterSpacing: '1.5px',
    },
    heroTitle: {
        fontSize: '48px',
        fontWeight: '900',
        marginBottom: '8px',
    },
    heroYear: {
        color: '#ccc',
        marginBottom: '20px',
    },
    watchButton: {
        width: '180px',
        padding: '14px',
        border: 'none',
        borderRadius: '14px',
        background: 'linear-gradient(to right, #E50914, #ff2d37)',
        color: '#fff',
        fontWeight: '700',
        cursor: 'pointer',
    },
    section: {
        marginBottom: '40px',
    },
    sectionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '18px',
    },
    sectionTitle: {
        fontSize: '24px',
        marginBottom: '0',
        fontWeight: '700',
    },
    seeAll: {
        color: '#E50914',
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: '600',
    },
    genreContainer: {
        display: 'flex',
        gap: '14px',
        overflowX: 'auto',
        paddingBottom: '6px',
    },
    genreCard: {
        minWidth: '160px',
        padding: '20px',
        borderRadius: '18px',
        background: 'linear-gradient(to right, #1f1f1f, #2b0000)',
        textAlign: 'center',
        fontWeight: '700',
        cursor: 'pointer',
        transition: '0.3s',
    },
    movieRow: {
        display: 'flex',
        gap: '20px',
        overflowX: 'auto',
        paddingBottom: '10px',
    },
    movieCard: {
        minWidth: '200px',
        maxWidth: '200px',
        borderRadius: '20px',
        overflow: 'hidden',
        background: '#151515',
        cursor: 'pointer',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        flexShrink: 0,
    },
    movieCardSkeleton: {
        minWidth: '200px',
        height: '320px',
        borderRadius: '20px',
        background: '#1a1a1a',
        flexShrink: 0,
    },
    movieImage: {
        width: '100%',
        height: '280px',
        objectFit: 'cover',
        display: 'block',
    },
    movieImageFallback: {
        width: '100%',
        height: '280px',
        background: '#222',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '48px',
    },
    movieInfo: {
        padding: '14px',
    },
    movieTitle: {
        fontWeight: '700',
        fontSize: '14px',
        marginBottom: '4px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    movieYear: {
        color: '#888',
        fontSize: '13px',
    },
    emptyText: {
        color: '#555',
        fontSize: '15px',
    },
};

export default Dashboard;