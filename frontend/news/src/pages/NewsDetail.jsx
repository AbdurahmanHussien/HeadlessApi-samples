import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { getNewsDetail } from "../services/newsService";

const NewsDetail = () => {
    const { id } = useParams();
    const { t, i18n } = useTranslation();

    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadArticle = async () => {
            try {
                setLoading(true);
                const data = await getNewsDetail(id, i18n.language);
                setArticle(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadArticle();
    }, [id, i18n.language]);

    if (loading) return <div className="p-4">{t('loading')}...</div>;
    if (error) return <div className="p-4" style={{color: 'red'}}>Error: {error}</div>;
    if (!article) return <div className="p-4">{t('article_not_found')}</div>;

    const getDateLocale = (lang) => {
        if (lang === 'ar') return 'ar-EG';
        return 'en-US';
    };

    const dateStr = article.date
        ? new Date(article.date).toLocaleDateString(getDateLocale(i18n.language), {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : "";

    return (
        <div className="news-details-page">

            {/* --- Banner --- */}
            <header className="app-wrapper mt-8" style={{marginTop:'30px'}}>
                <div className="banner-wrapper" style={{height:'300px', borderRadius:'16px', overflow:'hidden', position:'relative'}}>
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${article.image ? `http://localhost:8080${article.image}` : '/placeholder.jpg'}) no-repeat center center/cover`
                        }}
                    />
                </div>
            </header>

            {/* --- Content --- */}
            <main className="app-wrapper main-content" style={{maxWidth:'1200px', margin:'0 auto', padding:'20px'}}>
                <section className="flex gap-4">
                    <div className="card announce-details-card" style={{background:'white', padding:'30px', borderRadius:'12px', boxShadow:'0 4px 12px rgba(0,0,0,0.05)'}}>

                        <div className="section-card-header" style={{marginBottom:'20px', borderBottom:'1px solid #eee', paddingBottom:'15px'}}>
                            <div className="section-card-header__title flex-col items-start gap-2">
                                <h2 className="font-bold text-primary" style={{color:'#1B5A37', fontSize:'2rem', marginBottom:'10px'}}>
                                    {article.title}
                                </h2>
                                <p className="text-details" style={{color:'#666'}}>
                                    {t('publish_date')}: {dateStr}
                                </p>
                            </div>
                        </div>

                        <div className="content">
                            <p style={{lineHeight:'1.8', color:'#333', fontSize:'1.1rem'}}>
                                {article.description}
                            </p>
                        </div>

                    </div>
                </section>
            </main>
        </div>
    );
};

export default NewsDetail;