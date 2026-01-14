import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { getNewsDetail } from "../services/newsService";
import {formatDate} from "../utils/formatters.js";
import myImage from '@/assets/images/placeholder-news.jpg';
import {AUTH_CONFIG} from "@/utils/config.js";

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


    return (
        <div className="news-details-page">

            <header className="app-wrapper mt-8">
                <div className="banner-wrapper">
                    <div className="banner-content">
                        <div className="splide banner-slider" id="banner-slider">
                            <div className="splide__track">
                                <ul className="splide__list">
                                    <li
                                        className="splide__slide"
                                        style={{
                                            height: '400px',
                                            width: '100%',
                                            display: 'block',
                                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${article.image ? `${AUTH_CONFIG.apiBaseUrl}${article.image}` : `${myImage}`})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat'
                                        }}
                                    ></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- Content --- */}
            <main className="app-wrapper main-content">
                <section className="flex gap-4">
                    <div className="card announce-details-card">

                        <div className="section-card-header"
                             >
                            <div className="section-card-header__title flex-col items-start gap-2">
                                <h2 className="font-bold text-primary">
                                    {article.title}
                                </h2>
                                <p className="text-details" style={{color: '#666'}}>
                                    {t('publish_date')}: {formatDate(article.date, i18n.language)}
                                </p>
                            </div>
                        </div>

                        <div className="content">
                            <p style={{lineHeight: '1.8', color: '#333', fontSize: '1.1rem'}}>
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