import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, User, Film, Heart, LogOut, UserPlus, Tag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// ================= DUMMY DATA =================
const latestMovie = {
    title: 'Avengers: Secret Wars',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200',
};

const genres = ['Action', 'Sci-Fi', 'Anime', 'Thriller', 'Comedy', 'Adventure'];

const recommendedMovies = [
    { title: 'Interstellar', image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=800' },
    { title: 'John Wick', image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=800' },
    { title: 'The Batman', image: 'https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?q=80&w=800' },
    { title: 'Joker', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800' },
];

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            {/* ================= SIDEBAR ================= */}
            <div style={{ ...styles.sidebar, width: sidebarOpen ? '220px' : '80px' }}>
                <button style={styles.menuButton} onClick={() => setSidebarOpen(!sidebarOpen)}>
                    <Menu size={26} />
                </button>

                <div style={styles.sidebarMenu}>
                    <Link to="#" style={styles.sidebarItem}>
                        <Film size={22} />
                        {sidebarOpen && <span>List Film</span>}
                    </Link>
                    <Link to="/genres" style={styles.sidebarItem}>
                        <Tag size={22} />
                        {sidebarOpen && <span>Genre</span>}
                    </Link>
                    <Link to="#" style={styles.sidebarItem}>
                        <Heart size={22} />
                        {sidebarOpen && <span>Watchlist</span>}
                    </Link>
                </div>
            </div>

            {/* ================= MAIN CONTENT ================= */}
            <div style={styles.mainContent}>
                {/* ================= TOPBAR ================= */}
                <div style={styles.topbar}>
                    <h1 style={styles.logo}>
                        Movie<span style={styles.logoAccent}>In</span>
                    </h1>

                    <div style={styles.topbarRight}>
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
                <div style={{ ...styles.heroSection, backgroundImage: `url(${latestMovie.image})` }}>
                    <div style={styles.heroOverlay}>
                        <p style={styles.newBadge}>NEW RELEASE</p>
                        <h2 style={styles.heroTitle}>{latestMovie.title}</h2>
                        <p style={styles.heroYear}>{latestMovie.year}</p>
                        <button style={styles.watchButton}>▶ Watch Now</button>
                    </div>
                </div>

                {/* ================= GENRES ================= */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Browse Genres</h3>
                    <div style={styles.genreContainer}>
                        {genres.map((genre, index) => (
                            <div key={index} style={styles.genreCard}>{genre}</div>
                        ))}
                    </div>
                </div>

                {/* ================= RECOMMENDATION ================= */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Recommended For You</h3>
                    <div style={styles.movieRow}>
                        {recommendedMovies.map((movie, index) => (
                            <div key={index} style={styles.movieCard}>
                                <img src={movie.image} alt={movie.title} style={styles.movieImage} />
                                <div style={styles.movieInfo}>{movie.title}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// ================= STYLES =================
const styles = {
    container: { display: 'flex', minHeight: '100vh', backgroundColor: '#0b0b0b', color: '#fff', fontFamily: 'Inter, sans-serif' },
    sidebar: { position: 'fixed', top: 0, left: 0, height: '100vh', background: 'rgba(15,15,15,0.95)', borderRight: '1px solid rgba(255,255,255,0.06)', transition: '0.3s ease', overflow: 'hidden', zIndex: 100 },
    menuButton: { width: '100%', padding: '24px', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' },
    sidebarMenu: { display: 'flex', flexDirection: 'column', gap: '14px', padding: '10px' },
    sidebarItem: { display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', borderRadius: '14px', color: '#fff', textDecoration: 'none', transition: '0.3s', background: 'rgba(255,255,255,0.03)' },
    mainContent: { flex: 1, marginLeft: '80px', padding: '24px' },
    topbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
    logo: { fontSize: '34px', fontWeight: '900', letterSpacing: '-1px' },
    logoAccent: { color: '#E50914' },
    topbarRight: { display: 'flex', alignItems: 'center', gap: '12px' },
    friendButton: { display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '14px', border: 'none', background: 'linear-gradient(to right, #E50914, #ff2d37)', color: '#fff', cursor: 'pointer', fontWeight: '700', boxShadow: '0 4px 14px rgba(229,9,20,0.35)', transition: '0.3s' },
    profileButton: { display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '14px', border: 'none', background: 'rgba(255,255,255,0.08)', color: '#fff', cursor: 'pointer' },
    logoutButton: { padding: '10px', borderRadius: '12px', border: 'none', background: 'rgba(229,9,20,0.15)', color: '#E50914', cursor: 'pointer' },
    heroSection: { height: '420px', borderRadius: '28px', backgroundSize: 'cover', backgroundPosition: 'center', overflow: 'hidden', marginBottom: '40px' },
    heroOverlay: { width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifycontent: 'flex-end', padding: '40px', background: 'linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.1))' },
    newBadge: { color: '#E50914', fontWeight: '700', marginBottom: '8px' },
    heroTitle: { fontSize: '48px', fontWeight: '900', marginBottom: '8px' },
    heroYear: { color: '#ccc', marginBottom: '20px' },
    watchButton: { width: '180px', padding: '14px', border: 'none', borderRadius: '14px', background: 'linear-gradient(to right, #E50914, #ff2d37)', color: '#fff', fontWeight: '700', cursor: 'pointer' },
    section: { marginBottom: '40px' },
    sectionTitle: { fontSize: '24px', marginBottom: '18px', fontWeight: '700' },
    genreContainer: { display: 'flex', gap: '14px', overflowX: 'auto' },
    genreCard: { minWidth: '160px', padding: '20px', borderRadius: '18px', background: 'linear-gradient(to right, #1f1f1f, #2b0000)', textAlign: 'center', fontWeight: '700', cursor: 'pointer', transition: '0.3s' },
    movieRow: { display: 'flex', gap: '20px', overflowX: 'auto' },
    movieCard: { minWidth: '220px', borderRadius: '20px', overflow: 'hidden', background: '#151515', transition: '0.3s' },
    movieImage: { width: '100%', height: '320px', objectFit: 'cover' },
    movieInfo: { padding: '16px', fontWeight: '600' },
};

export default Dashboard;
