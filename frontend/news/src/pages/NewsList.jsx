import { Routes, Route, useSearchParams, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {useEffect, useState} from "react";
import NewsCard from "../components/NewsCard.jsx";
import { getNewsList } from "../services/newsService";

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

    useEffect(() => {
        const loadData = async () => {
            try {
                // Call the service instead of manual fetch
                const data = await getNewsList(
                    urlSearch,
                    urlDate,
                    currentPage,
                    pageSize,
                    i18n.language
                );
                setNewsData(data);
            } catch (err) {
                setError(err.message);
                console.error("Fetch error:", err);
            }
        };

        loadData();
    }, [searchParams, i18n.language]);

    // --- HANDLERS ---
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
                        <div className="custom-date-wrapper">
                            <svg
                                className="date-icon"
                                viewBox="0 0 24 24"
                                fill="#555"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V9H19V20ZM19 7H5V6H19V7Z"/>
                            </svg>

                            <input
                                type="date"
                                required
                                className="styled-date-input"
                                placeholder="Select Date"
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
export default News;