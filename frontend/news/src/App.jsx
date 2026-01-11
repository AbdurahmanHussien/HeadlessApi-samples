import React, { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NewsCard from "./components/NewsCard";
import NewsDetail from "./pages/NewsDetail.jsx";
import HomePage from "./pages/HomePage.jsx";
import {getSystemToken } from "./services/authService.js";
import './App.css';
import News from "./pages/NewsList.jsx";

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



export default App;