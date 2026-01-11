import React, { useState, useEffect } from "react";
import { Routes, Route, useSearchParams, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NewsCard from "./components/NewsCard";
import NewsDetail from "./components/NewsDetail";
import HomePage from "./HomePage.jsx";
import { fetchWithAuth, getSystemToken } from "./authService.js";
import './App.css';

function App() {
    const { t, i18n } = useTranslation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const initAuth = async () => {
            const token = await getSystemToken();
            if (token) setIsAuthenticated(true);
        };
        initAuth();
    }, []);

    const handleLanguageChange = (lng) => {
        i18n.changeLanguage(lng);
        document.body.dir = lng === "ar" ? "rtl" : "ltr";
    };

    const handleLogout = () => {

        window.location.reload();
    };

    if (!isAuthenticated) {
        return <div style={{textAlign:'center', marginTop:'50px', color: "black"}}>Connecting to System...</div>;
    }

    return (
        <div>
            <nav className="navbar" style={{background: '#1B5A37', padding: '15px', color: 'white', marginBottom: '20px'}}>
                <div className="app-wrapper" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <span style={{fontSize: '1.2rem', fontWeight: 'bold'}}>{t('platform_logo')}</span>

                    <div style={{ display: 'flex', gap: '15px' }}>
                        <NavLink
                            to="/"
                            style={({ isActive }) => ({
                                color: 'white', textDecoration: 'none',
                                fontWeight: isActive ? 'bold' : 'normal',
                                borderBottom: isActive ? '2px solid white' : 'none'
                            })}
                        >
                            {t('home')}
                        </NavLink>

                        <NavLink
                            to="/news"
                            style={({ isActive }) => ({
                                color: 'white', textDecoration: 'none',
                                fontWeight: isActive ? 'bold' : 'normal',
                                borderBottom: isActive ? '2px solid white' : 'none'
                            })}
                        >
                            {t('news')}
                        </NavLink>
                    </div>

                    <div style={{display:'flex', gap:'15px'}}>
                        <button onClick={() => handleLanguageChange('en')}>English</button>
                        <button onClick={() => handleLanguageChange('ar')}>العربية</button>

                        <button onClick={handleLogout}>
                            {t('logout')}
                        </button>
                    </div>
                </div>
            </nav>

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:id" element={<NewsDetail />} />
            </Routes>
        </div>
    );
}

const News = () => {
    const { t, i18n } = useTranslation();
    const [newsData, setNewsData] = useState(null);
    const [error, setError] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();

    const urlSearch = searchParams.get("search") || "";
    const urlDate = searchParams.get("date") || "";
    const currentPage = parseInt(searchParams.get("page") || "1");

    const [tempSearch, setTempSearch] = useState(urlSearch);
    const [tempDate, setTempDate] = useState(urlDate);

    const pageSize = 6;

    useEffect(() => {
        setTempSearch(urlSearch);
        setTempDate(urlDate);
    }, [urlSearch, urlDate]);

    const fetchNews = async () => {
        try {
            const url = new URL("http://localhost:8080/o/News/v1.0/news");

            if (urlSearch) url.searchParams.append("search", urlSearch);
            if (urlDate) url.searchParams.append("Date", urlDate);

            url.searchParams.append("page", currentPage);
            url.searchParams.append("pageSize", pageSize);

            const response = await fetchWithAuth(url.toString(), {
                headers: {
                    'Accept-Language': i18n.language // Dynamically gets 'en' or 'ar'
                }
            });

            if (!response.ok) throw new Error(response.statusText);

            const data = await response.json();
            setNewsData(data);
        } catch (err) {
            setError(err.message);
            console.error("Fetch error:", err);
        }
    };

    useEffect(() => {
        fetchNews();
    }, [searchParams, i18n.language]);

    const handleSearch = () => {
        const params = {};
        if (tempSearch) params.search = tempSearch;
        if (tempDate) params.date = tempDate;
        params.page = 1;
        setSearchParams(params);
    };

    const handleReset = () => {
        setTempSearch("");
        setTempDate("");
        setSearchParams({});
    };

    const handlePageChange = (newPage) => {
        const params = {};
        if (urlSearch) params.search = urlSearch;
        if (urlDate) params.date = urlDate;
        params.page = newPage;
        setSearchParams(params);
        window.scrollTo(0, 0);
    };

    const totalPages = newsData?.totalCount ? Math.ceil(newsData.totalCount / pageSize) : 1;

    return (
        <div>
            {/* Banner */}
            <header className="app-wrapper">
                <div className="banner-wrapper banner-shorter">
                    <div className="banner-img">
                        <div className="layer"></div>
                        <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop" alt="Banner" />
                    </div>
                    <div className="banner-content">
                        <h1 style={{color: "white"}}>{t('news')}</h1>
                    </div>
                </div>
            </header>

            <main className="app-wrapper main-content">
                {/* Filters */}
                <div className="card filter-card">
                    <div className="filters">
                        <div className="search-box">
                            <img className="icon" src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Search_Icon.svg" style={{width:'16px'}} alt="search"/>
                            <input
                                type="text"
                                placeholder={t('search_placeholder')}
                                value={tempSearch}
                                style={{color:"black"}}
                                onChange={(e) => setTempSearch(e.target.value)}
                            />
                        </div>
                        <div className="custom-date" style={{padding: 0, overflow: 'hidden', display:'flex', position: 'relative'}}>
                            <input
                                type="date"
                                className="styled-date"
                                style={{
                                    background: "#f3f4f6", outline: 'none', fontFamily: 'inherit',
                                    width: '100%', color: '#555', height: '35px', padding: '22px 15px',
                                    borderRadius: '8px', border: '1px solid #E2E3E5'
                                }}
                                value={tempDate}
                                onChange={(e) => setTempDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="actions">
                        <button className="search-button reset-btn" onClick={handleReset}>
                            {t('reset')}
                        </button>
                        <button className="search-button" onClick={handleSearch}>
                            {t('search')}
                        </button>
                    </div>
                </div>

                {error && <div style={{color: 'red', padding: '20px'}}>{error}</div>}

                {/* Grid */}
                <div className="grid-3-wrapper">
                    {newsData?.newsArticles?.map((article) => (
                        <NewsCard key={article.id} article={article} />
                    ))}
                </div>

                {/* Pagination */}
                {newsData?.totalCount > 0 && (
                    <div className="pagination" style={{display:'flex', justifyContent:'center', gap:'10px', marginTop:'40px', alignItems:'center'}}>
                        <button
                            className="search-button"
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                            style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
                        >
                            &lt;
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                            <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className="search-button"
                                style={{
                                    background: currentPage === pageNum ? 'rgb(10, 122, 77)' : 'transparent',
                                    color: currentPage === pageNum ? 'white' : '#1B5A37',
                                }}
                            >
                                {pageNum}
                            </button>
                        ))}

                        <button
                            className="search-button"
                            disabled={currentPage >= totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                            style={{ opacity: currentPage >= totalPages ? 0.5 : 1 }}
                        >
                            &gt;
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default App;