import React, { useState, useEffect } from "react";
import { Routes, Route, NavLink, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getSystemToken } from "./services/authService.js";
import './App.css';

// Components
import LanguageWrapper from "./components/LanguageWrapper.jsx";
import NewsDetail from "./pages/NewsDetail.jsx";
import HomePage from "./pages/HomePage.jsx";
import NewsList from "./pages/NewsList.jsx";

function App() {
    const { t, i18n } = useTranslation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Router Hooks
    const navigate = useNavigate();
    const location = useLocation();

    // 1. Auth Logic
    useEffect(() => {
        const initAuth = async () => {
            const token = await getSystemToken();
            if (token) setIsAuthenticated(true);
        };
        initAuth();
    }, []);


    const toggleLanguage = () => {
        const currentLang = i18n.language;
        const newLang = currentLang === 'en' ? 'ar' : 'en';

        const newPath = location.pathname.replace(/^\/(en|ar)/, `/${newLang}`);

        if (newPath === location.pathname) {
            navigate(`/${newLang}`);
        } else {
            navigate(newPath);
        }
    };

    const handleLogout = () => {
        window.location.reload();
    };

    if (!isAuthenticated) {
        return <div style={{textAlign:'center', marginTop:'50px', color: "black"}}>{t('loading')}...</div>;
    }

    return (
        <div>
            <nav className="navbar" style={{background: '#1B5A37', padding: '15px', color: 'white', marginBottom: '20px'}}>
                <div className="app-wrapper" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <span style={{fontSize: '1.2rem', fontWeight: 'bold'}}>{t('platform_logo')}</span>

                    <div style={{ display: 'flex', gap: '15px' }}>
                        <NavLink
                            to={`/${i18n.language}/`}
                            end
                            style={({ isActive }) => ({
                                color: 'white', textDecoration: 'none',
                                fontWeight: isActive ? 'bold' : 'normal',
                                borderBottom: isActive ? '2px solid white' : 'none'
                            })}
                        >
                            {t('home')}
                        </NavLink>

                        <NavLink
                            to={`/${i18n.language}/news`}
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
                        <button
                            onClick={toggleLanguage}
                            title={i18n.language === 'en' ? "Switch to Arabic" : "Switch to English"}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                outline: 'none', // Removed ugly border
                                cursor: 'pointer',
                                padding: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                transition: 'transform 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                style={{ width: '24px', height: '24px' }}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                                />
                            </svg>
                        </button>
                        <button onClick={handleLogout} style={{background:'transparent', border:'1px solid white', color:'white', borderRadius:'4px', padding:'0 10px', cursor:'pointer'}}>
                            {t('logout')}
                        </button>
                    </div>
                </div>
            </nav>

            <Routes>
                <Route path="/" element={<Navigate to="/en" replace />} />

                <Route path="/:lang" element={<LanguageWrapper />}>
                    <Route index element={<HomePage />} />
                    <Route path="news" element={<NewsList />} />
                    <Route path="news/:id" element={<NewsDetail />} />
                </Route>

            </Routes>
        </div>
    );
}

export default App;