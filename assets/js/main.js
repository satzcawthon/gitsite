
/**
 * Vessel - Minimalist Search Platform
 */

const API_CONFIG = {
    key: 'cf72f14362cff1da8bed9fa86831de66',
    baseUrl: 'https://api.themoviedb.org/3',
    imageUrl: 'https://image.tmdb.org/t/p/w500',
    posterUrl: 'https://image.tmdb.org/t/p/w200',
    backdropUrl: 'https://image.tmdb.org/t/p/original'
};

class VesselApp {
    constructor() {
        this.searchTimeout = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupSearchFunctionality();
        console.log('🔍 Satz initialized successfully!');
    }

    setupEventListeners() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    this.handleSearch(e.target.value.trim());
                }
            });

            this.addLoadAnimation(searchInput);
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                this.focusSearch();
            }
        });
    }

    setupSearchFunctionality() {
        
    }

    handleSearch(query) {
        if (query.length >= 2) {
            const basePath = window.location.pathname.includes('/pages/') ? './' : './pages/';
            window.location.href = `${basePath}busca.html?q=${encodeURIComponent(query)}`;
        }
    }

    focusSearch() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
        }
    }

    addLoadAnimation(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';

        setTimeout(() => {
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    }

    getMediaType(item) {
        if (item.title) return 'movie';
        if (item.name) return 'tv';
        return 'movie';
    }

    extractYear(dateString) {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).getFullYear() || 'N/A';
        } catch {
            return 'N/A';
        }
    }

    truncateText(text, maxLength = 150) {
        if (!text || text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    }

    openMediaPage(id, type) {
        if (!id) {
            console.error('Invalid ID for navigation');
            return;
        }

        let pageType;
        switch (type) {
            case 'movie':
                pageType = './pages/filme.html';
                break;
            case 'anime':
                pageType = './pages/anime.html';
                break;
            case 'tv':
            default:
                pageType = './pages/serie.html';
                break;
        }

        try {
            document.body.style.opacity = '0.8';
            setTimeout(() => {
                window.location.href = `${pageType}?id=${encodeURIComponent(id)}`;
            }, 150);
        } catch (error) {
            console.error('Navigation error:', error);
            window.location.href = `${pageType}?id=${encodeURIComponent(id)}`;
        }
    }
}

let app;

function initializeApp() {
    try {
        app = new VesselApp();
    } catch (error) {
        
        document.body.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100vh; background: #000; color: #fff; text-align: center; font-family: Inter, sans-serif;">
                <div>
                    <h1>Error loading Satz</h1>
                    <p>Please reload the page.</p>
                    <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #fff; color: #000; border: none; border-radius: 0.5rem; cursor: pointer;">
                        Reload
                    </button>
                </div>
            </div>
        `;
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

if (typeof window !== 'undefined') {
    window.Vessel = { app };
}
