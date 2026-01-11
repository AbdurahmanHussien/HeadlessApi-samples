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
            "newsDetails": "News Details",
            "page": "Page",
            "no_news": "No news found matching your criteria.",
            "publish_date": "Publish Date",
            "welcome_title": "Welcome to Our Digital Platform",
            "welcome_subtitle": "Stay connected with the latest updates, company news, and announcements directly from our headquarters.",
            "browse_news": "Browse All News",
            "latest_updates": "Latest Updates",
            "view_details": "View Details"
        }
    },
    ar: {
        translation: {
            "platform_logo": "شعار المنصة",
            "home": "الرئيسية",
            "news": "الأخبار",
            "logout": "تسجيل خروج",
            "search_placeholder": "بحث...",
            "newsDetails": "تفاصيل الخبر",
            "reset": "إعادة تعيين",
            "search": "بحث",
            "page": "صفحة",
            "no_news": "لم يتم العثور على أخبار.",
            "publish_date": "تاريخ النشر",
            "welcome_title": "مرحباً بكم في منصتنا الرقمية",
            "welcome_subtitle": "ابق على تواصل مع أحدث التحديثات وأخبار الشركة والإعلانات مباشرة من مقرنا الرئيسي.",
            "browse_news": "تصفح كل الأخبار",
            "latest_updates": "آخر التحديثات",
            "view_details": "عرض التفاصيل"

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