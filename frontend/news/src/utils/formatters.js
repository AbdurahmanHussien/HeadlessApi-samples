
export const formatDate = (dateString, lang = 'en') => {
    if (!dateString) return "";

    const locale = lang === 'ar' ? 'ar-EG' : 'en-GB';

    return new Date(dateString).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });
};