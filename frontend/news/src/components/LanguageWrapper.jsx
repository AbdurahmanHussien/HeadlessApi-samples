import React, { useEffect } from 'react';
import { useParams, Outlet, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LanguageWrapper = () => {
    const { lang } = useParams();
    const { i18n } = useTranslation();

    const supportedLanguages = ['en', 'ar'];

    if (!supportedLanguages.includes(lang)) {
        return <Navigate to="/en" replace />;
    }

    useEffect(() => {
        if (i18n.language !== lang) {
            i18n.changeLanguage(lang);
        }
        document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }, [lang, i18n]);

    return <Outlet />;
};

export default LanguageWrapper;