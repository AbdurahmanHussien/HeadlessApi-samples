import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useTranslation } from 'react-i18next';
import { fetchWithAuth } from '../services/authService';
import { AUTH_CONFIG } from "../utils/config";
import myImage from "@/assets/images/events.jpg";
import {useNavigate, useParams} from "react-router-dom";

const EventsCalendar = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const calendarRef = useRef(null);

    const { lang } = useParams();

    const [events, setEvents] = useState([]);
    const [currentView, setCurrentView] = useState('timeGridWeek');
    const [calendarTitle, setCalendarTitle] = useState('');
    const [isRTL, setIsRTL] = useState(i18n.dir() === 'rtl');

    useEffect(() => {
        setIsRTL(i18n.dir() === 'rtl');
    }, [i18n.language]);

    useEffect(() => {
        if (lang && i18n.language !== lang) {
            i18n.changeLanguage(lang);
            document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        }
    }, [lang, i18n]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {

                const currentLang = i18n.language || 'en';

                const response = await fetchWithAuth(
                    `${AUTH_CONFIG.apiBaseUrl}/o/events/v1.0/events`,
                    {
                        method: 'GET',
                        headers: { 'Accept-Language': currentLang ==='ar' ? 'ar-SA' : 'en-US' }
                    }
                );
                if (!response.ok) {
                    console.error("API Error:", response.status, response.statusText);
                    return; // Stop here so it doesn't crash
                }

                const data = await response.json();

                const formattedEvents = (data.events || data.items || []).map(event => ({
                    id: event.id,
                    title: event.title,
                    start: event.startDateTime,
                    end: event.endDateTime,
                    backgroundColor: event.backgroundColor,
                    url: event.url,
                    extendedProps: {
                        description: event.description,
                        location: event.location
                    }
                }));

                setEvents(formattedEvents);
            } catch (error) {
                console.error("Failed to fetch events", error);
            }
        };

        fetchEvents();
    }, [lang]);

    const handlePrev = () => {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.prev();
    };

    const handleNext = () => {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.next();
    };

    const handleViewChange = (e) => {
        const viewName = e.target.value;
        setCurrentView(viewName);
        const calendarApi = calendarRef.current.getApi();
        calendarApi.changeView(viewName);
    };

    const renderDayHeader = (args) => {
        const dayNum = args.date.getDate();
        const weekday = args.date.toLocaleDateString(
            isRTL ? "ar-EG" : "en-US",
            { weekday: "long" }
        );

        return (
            <div style={{textAlign: 'center'}}>
                <p className="day-number">{dayNum}</p>
                <p className="day-name">{weekday}</p>
            </div>
        );
    };

    const renderEventContent = (eventInfo) => {
        const viewType = eventInfo.view.type;
        const { title, backgroundColor } = eventInfo.event;

        if (viewType === 'dayGridMonth') {
            return (
                <div className="event-card month-view"
                     style={{
                         background: backgroundColor,
                         color: '#fff',
                         borderRadius: '4px',
                         marginInline: '6px',
                         padding: '2px 5px',
                         fontSize: '14px',
                         width: '100%',
                         fontWeight: 500
                     }}>
                    {title}
                </div>
            );
        }

        if (viewType === 'timeGridWeek') {
            return (
                <div className="event-card week-view"
                     style={{
                         background: backgroundColor,
                         color: '#fff',
                         borderRadius: '6px',
                         padding: '6px 8px',
                         fontSize: '13px',
                         fontWeight: 500,
                         height: '100%'
                     }}>
                    <strong>{title}</strong>
                </div>
            );
        }
    };

    const handleDayMount = (info) => {
        const day = info.date.getDay();
        const today = new Date();
        const isToday =
            info.date.getDate() === today.getDate() &&
            info.date.getMonth() === today.getMonth() &&
            info.date.getFullYear() === today.getFullYear();

        if (isToday) {
            info.el.style.backgroundColor = "#FBF9F1";
        }

        if (info.view.type === "timeGridWeek") {
            if (day === 4 || day === 5) {
                info.el.style.backgroundColor = "#f7f7f7";
            }
        }
    };

    return (
        <div>
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
                                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${myImage})`,
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
        <main className="app-wrapper main-content">
            <section className="card">

                {/* --- HEADER --- */}
                <div className="calendar-header">
                    <div className="calendar-header__actions">
                        <button id="prev" onClick={handlePrev} style={{background:'none', border:'none', cursor:'pointer'}}>
                            <svg className="rotate180" xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                                <path d="M0.703518 8.59744C0.811101 8.51618 1.13226 8.27357 1.3174 8.12909C1.68821 7.83971 2.18094 7.4443 2.6722 7.01776C3.16595 6.58907 3.64681 6.13873 4.0003 5.73865C4.17756 5.53804 4.31224 5.36182 4.39991 5.2164C4.48236 5.07963 4.4995 4.99884 4.4995 4.99884C4.4995 4.99884 4.48236 4.92042 4.39991 4.78366C4.31225 4.63825 4.17756 4.46202 4.00031 4.26141C3.64681 3.86134 3.16594 3.411 2.67219 2.9823C2.18093 2.55577 1.68819 2.16036 1.31738 1.87098C1.13224 1.72649 0.81153 1.48423 0.703946 1.40297C0.481598 1.23921 0.43364 0.925876 0.597395 0.703528C0.76115 0.481179 1.07415 0.43368 1.2965 0.597435L1.29819 0.598714C1.41103 0.683941 1.7437 0.935208 1.93261 1.08263C2.3118 1.37855 2.81907 1.7855 3.3278 2.2272C3.83405 2.66675 4.35319 3.15053 4.74969 3.59927C4.94743 3.82308 5.12525 4.04994 5.25633 4.26738C5.37914 4.4711 5.5 4.72903 5.49999 5.00004C5.49999 5.27104 5.37914 5.52897 5.25633 5.73269C5.12524 5.95013 4.94743 6.17699 4.74969 6.40079C4.35319 6.84953 3.83406 7.33331 3.32781 7.77286C2.81908 8.21456 2.31182 8.62152 1.93263 8.91743C1.7436 9.06496 1.41091 9.31624 1.29831 9.40129L1.29685 9.40239C1.0745 9.56615 0.761186 9.51889 0.597429 9.29654C0.433678 9.0742 0.481189 8.7612 0.703518 8.59744Z" fill="#161616" />
                            </svg>
                        </button>

                        <h2 id="calendar-title">{calendarTitle}</h2>

                        <button id="next" onClick={handleNext} style={{background:'none', border:'none', cursor:'pointer'}}>
                            <svg className="rotate180" xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                                <path d="M5.29648 1.40248C5.18889 1.48374 4.86773 1.72634 4.68259 1.87083C4.31178 2.16021 3.81906 2.55561 3.32779 2.98215C2.83405 3.41085 2.35319 3.86119 1.99969 4.26126C1.82244 4.46187 1.68775 4.63809 1.60008 4.78351C1.51763 4.92028 1.50049 5.00107 1.50049 5.00107C1.50049 5.00107 1.51764 5.07949 1.60008 5.21625C1.68775 5.36167 1.82243 5.53789 1.99969 5.7385C2.35318 6.13858 2.83405 6.58892 3.3278 7.01761C3.81907 7.44415 4.3118 7.83955 4.68261 8.12894C4.86776 8.27342 5.18846 8.51569 5.29605 8.59695C5.5184 8.7607 5.56635 9.07404 5.4026 9.29639C5.23884 9.51873 4.92584 9.56623 4.7035 9.40248L4.70194 9.4013C4.58923 9.31618 4.25637 9.06477 4.06739 8.91728C3.6882 8.62137 3.18093 8.21441 2.67219 7.77271C2.16594 7.33316 1.64681 6.84938 1.25031 6.40064C1.05256 6.17684 0.874748 5.94998 0.743664 5.73253C0.620854 5.52882 0.499998 5.27089 0.5 4.99988C0.500002 4.72887 0.620858 4.47095 0.743668 4.26723C0.874752 4.04979 1.05256 3.82293 1.25031 3.59913C1.64681 3.15038 2.16594 2.6666 2.67218 2.22705C3.18091 1.78535 3.68818 1.3784 4.06736 1.08248C4.25641 0.934942 4.58914 0.683626 4.70172 0.598597L4.70314 0.59752C4.92549 0.433763 5.23881 0.481027 5.40257 0.703375C5.56632 0.925715 5.51881 1.23872 5.29648 1.40248Z" fill="#161616" />
                            </svg>
                        </button>
                    </div>

                    <div className="filters">
                        <div className="time-switch">
                            <input
                                type="radio"
                                id="month"
                                name="time-period"
                                value="dayGridMonth"
                                checked={currentView === 'dayGridMonth'}
                                onChange={handleViewChange}
                            />
                            <label className="switch-label" htmlFor="month">{t('calendar_month')}</label>

                            <input
                                type="radio"
                                id="week"
                                name="time-period"
                                value="timeGridWeek"
                                checked={currentView === 'timeGridWeek'}
                                onChange={handleViewChange}
                            />
                            <label className="switch-label" htmlFor="week">{t('calendar_week')}</label>

                            <span
                                className="selection-indicator"
                                style={{
                                    left: isRTL ? 'auto' : (currentView === 'dayGridMonth' ? '0%' : '50%'),
                                    right: isRTL ? (currentView === 'dayGridMonth' ? '0%' : '50%') : 'auto',
                                }}
                            ></span>
                        </div>
                    </div>
                </div>

                <div id="calendar-container">
                    <FullCalendar
                        ref={calendarRef}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="timeGridWeek"

                        locale={isRTL ? "ar" : "en"}
                        direction={isRTL ? "rtl" : "ltr"}

                        // Time Settings
                        slotMinTime="08:00:00"
                        slotMaxTime="20:00:00"
                        slotDuration="00:30:00"
                        allDaySlot={false}
                        contentHeight="auto"
                        slotLabelFormat={{
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                        }}

                        headerToolbar={false}

                        // Callbacks
                        datesSet={(dateInfo) => {
                            let title = dateInfo.view.title;
                            title = title.replace(/,?\s*\d{4}/, "");
                            setCalendarTitle(title);
                        }}

                        events={events}

                        eventClick={(info) => {
                            info.jsEvent.preventDefault();

                            navigate(`/${i18n.language}/event/${info.event.id}`);
                        }}

                        // Custom Renderers
                        dayHeaderContent={renderDayHeader}
                        eventContent={renderEventContent}
                        dayCellDidMount={handleDayMount}
                        dayHeaderDidMount={handleDayMount}
                    />
                </div>

                {/* --- LEGENDS --- */}
                <div className="calendar-legends">
                    <div className="legend green">
                        <div className="dot"></div>
                        <p className="legend-label">{t('calendar_registered_events')}</p>
                    </div>
                    <div className="legend gold">
                        <div className="dot"></div>
                        <p className="legend-label">{t('calendar.unregistered.events')}</p>
                    </div>
                    <div className="legend gray">
                        <div className="dot"></div>
                        <p className="legend-label">{t('calendar.teams.events')}</p>
                    </div>
                </div>
            </section>
        </main>
        </div>
    );
};

export default EventsCalendar;