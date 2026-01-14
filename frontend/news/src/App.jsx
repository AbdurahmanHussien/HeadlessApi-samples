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
import EventsCalendar from "@/components/EventsCalendar.jsx";
import EventDetails from "@/pages/EventDetails.jsx";
import Navbar from "@/components/NavBar.jsx";

function App() {
    const { t, i18n } = useTranslation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    // 1. Auth Logic
    useEffect(() => {
        const initAuth = async () => {
            const token = await getSystemToken();
            if (token) setIsAuthenticated(true);
        };
        initAuth();
    }, []);


    if (!isAuthenticated) {
        return <div style={{textAlign:'center', marginTop:'50px', color: "black"}}>{t('loading')}...</div>;
    }

    return (

<div>
        <Navbar></Navbar>
            <Routes>
                <Route path="/" element={<Navigate to="/en" replace />} />

                <Route path="/:lang" element={<LanguageWrapper />}>
                    <Route index element={<HomePage />} />
                    <Route path="news" element={<NewsList />} />
                    <Route path="events" element={<EventsCalendar />} />
                    <Route path="news/:id" element={<NewsDetail />} />
                    <Route path="event/:id" element={<EventDetails />} />
                </Route>

            </Routes>
</div>
    );
}

export default App;