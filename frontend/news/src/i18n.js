import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            "platform_logo": "Platform Logo",
            "home": "Home",
            "news": "News",
            "logout": "Logout",
            "search_placeholder": "Search...",
            "reset": "Reset",
            "search": "Search",
            "page": "Page",
            "no_news": "No news found matching your criteria."
        }
    },
    ar: {
        translation: {
            "platform_logo": "شعار المنصة",
            "home": "الرئيسية",
            "news": "الأخبار",
            "logout": "تسجيل خروج",
            "search_placeholder": "بحث...",
            "reset": "إعادة تعيين",
            "search": "بحث",
            "page": "صفحة",
            "no_news": "لم يتم العثور على أخبار."
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en", // Default language
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;