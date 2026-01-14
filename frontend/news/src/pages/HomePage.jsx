import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import {getNewsList} from "../services/newsService.js";
import NewsCard from "../components/NewsCard.jsx";
import {ClipLoader, RingLoader} from "react-spinners";


const HomePage = () => {
    const { t, i18n } = useTranslation();
    const [topNews, setTopNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [color, setColor] = useState("#114933");

    // Fetch only the latest 3 items
    useEffect(() => {
        const fetchTopNews = async () => {
            try {
                const data = await getNewsList("", "", 1, 3, i18n.language);
                setTopNews(data.newsArticles || []);
            } catch (error) {
                console.error("Failed to load home news", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTopNews();
    }, [i18n.language]);

    if(loading) {
        return (
            <div>

                <RingLoader
                    color={color}
                    size={50}
                    style={{
                        textAlign: 'center',
                        alignSelf: 'center'
                    }}
                    loading={loading}/>

            </div>
        );
    }
    return (
        <div>
            <div style={{
                backgroundColor: '#1B5A37',
                color: 'white',
                padding: '100px 20px',
                textAlign: 'center',
                marginBottom: '50px',
                backgroundImage: 'linear-gradient(rgba(27, 90, 55, 0.9), rgba(27, 90, 55, 0.8)), url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '20px', fontWeight: 'bold' }}>
                    {t('welcome_title')}
                </h1>
                <p style={{ fontSize: '1.3rem', maxWidth: '700px', margin: '0 auto 30px', opacity: 0.9 }}>
                    {t('welcome_subtitle')}
                </p>

                <Link to={`/${i18n.language}/news`}>
                    <button style={{
                        padding: '15px 40px',
                        fontSize: '1.1rem',
                        color: '#1B5A37',
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '30px', // Pill shape
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                        transition: 'transform 0.2s'
                    }}>
                        {t('browse_news')}
                    </button>
                </Link>
            </div>

            <div className="app-wrapper" style={{ paddingBottom: '60px' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '30px',
                    borderBottom: '1px solid #eee',
                    paddingBottom: '15px'
                }}>
                    <h2 style={{ color: '#1B5A37', fontSize: '2rem', margin: 0 }}>
                        {t('latest_updates')}
                    </h2>

                    <Link to={`/${i18n.language}/news`} style={{ color: '#1B5A37', fontWeight: 'bold', textDecoration: 'none' }}>
                        {t('browse_news')} &rarr;
                    </Link>
                </div>

                {loading ? (
                    <div>

                        <RingLoader
                            color={color}
                            size={50}
                            loading={loading}/>

                    </div>
                ) : (
                    <div className="grid-3-wrapper">
                        {topNews.map((article) => (
                            <NewsCard key={article.id} article={article} />
                        ))}
                    </div>
                )}

                {!loading && topNews.length === 0 && (
                    <p style={{ textAlign: 'center', color: '#666' }}>{t('no_news')}</p>
                )}
            </div>
        </div>
    );
};

export default HomePage;