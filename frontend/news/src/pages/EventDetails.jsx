import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchWithAuth } from '../services/authService';
import { AUTH_CONFIG } from '../utils/config.js';

const EventDetails = () => {
    const { lang, id } = useParams();
    const { t, i18n } = useTranslation();

    // State
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [attendanceStatus, setAttendanceStatus] = useState('loading');
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        if (lang && i18n.language !== lang) {
            i18n.changeLanguage(lang);
            document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        }
    }, [lang, i18n]);


    const getCurrentUserId = () => {
        const userStr = sessionStorage.getItem('user_details');
        return userStr ? JSON.parse(userStr).id : null;
    };

    const formatTimeRange = (startIso, endIso) => {
        if (!startIso || !endIso) return '';

        const startDate = new Date(startIso);
        const endDate = new Date(endIso);
        const lang = i18n.language;

        const options = { hour: '2-digit', minute: '2-digit', hour12: true };


        const localeString = lang === 'ar' ? 'ar-EG' : 'en-US';

        let startStr = new Intl.DateTimeFormat(localeString, options).format(startDate);
        let endStr = new Intl.DateTimeFormat(localeString, options).format(endDate);

        startStr = startStr.replace(/\s*(AM|PM|am|pm|ص|م)\s*/g, '').trim();

        if (lang === 'ar') {
            endStr = endStr.replace('AM', 'ص').replace('PM', 'م')
                .replace('am', 'ص').replace('pm', 'م');
        }

        return `${startStr} - ${endStr}`;
    };


    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const currentLang = lang || i18n.language || 'en';
                const eventRes = await fetchWithAuth(
                    `${AUTH_CONFIG.apiBaseUrl}/o/events/v1.0/events/${id}`,
                    { headers: { 'Accept-Language': currentLang =='ar' ? 'ar-SA' : 'en-US' } }
                );

                if (!eventRes.ok) throw new Error("Event not found");
                const eventData = await eventRes.json();
                setEvent(eventData);

                const userId = getCurrentUserId();
                if (userId) {
                    const filter = `creatorId eq ${userId} and eventID eq ${eventData.id}`;
                    const attendRes = await fetchWithAuth(
                        `${AUTH_CONFIG.apiBaseUrl}/o/c/eventsattendeeses/?filter=${encodeURIComponent(filter)}`
                    );
                    const attendData = await attendRes.json();

                    if (attendData.totalCount > 0) {
                        setAttendanceStatus('attended');
                    } else {
                        setAttendanceStatus('available');
                    }
                } else {
                    setAttendanceStatus('available'); // Guest or unknown user
                }

            } catch (error) {
                console.error(error);
                showNotification('error', t('error_loading_event'));
            } finally {
                setLoading(false);
            }
        };

        if (id) loadData();
    }, [id, lang]);


    // --- Actions ---

    const handleAttend = async () => {
        if (attendanceStatus !== 'available') return;

        setAttendanceStatus('attending');

        try {
            const response = await fetchWithAuth(`${AUTH_CONFIG.apiBaseUrl}/o/c/eventsattendeeses/`, {
                method: 'POST',
                body: JSON.stringify({
                    eventID: parseInt(id)
                })
            });

            if (!response.ok) throw new Error("Registration Failed");

            setAttendanceStatus('attended');
            showNotification('success', t('event-registration-success') || "Successfully registered!");

        } catch (error) {
            console.error(error);
            setAttendanceStatus('available'); // Revert
            showNotification('error', t('event-registration-error') || "Registration failed.");
        }
    };

    const showNotification = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 4000);
    };


    if (loading) return <div className="p-10 text-center">Loading...</div>;
    if (!event) return <div className="p-10 text-center">Event not found</div>;

    return (
        <div className="service-details-page">

            {notification && (
                <div className={`app-notification show ${notification.type}`}>
                    {notification.message}
                </div>
            )}

            <header className="app-wrapper mt-8">
                <div className="banner-wrapper">
                    <div className="banner-img">
                        <div className="layer"></div>
                        {event.image && (
                            <img src={event.image.startsWith('http') ? event.image : `${AUTH_CONFIG.apiBaseUrl}${event.image}`}
                                 alt={event.title} />
                        )}
                    </div>
                    <div className="banner-content">
                        <div className="headline">
                            <h1 className="limit-150"></h1>
                        </div>
                    </div>
                </div>
            </header>

            <main className="event-details-page app-wrapper main-content">
                <section className="flex gap-4 flex-wrap md:flex-nowrap">

                    <div className="flex flex-col gap-4 w-70">
                        <div className="card h-100">
                            <div className="section-card-header">
                                <div className="section-card-header__title">
                                    <h2 className="font-bold">{event.title}</h2>
                                </div>
                            </div>

                            <div className="content">
                                <div dangerouslySetInnerHTML={{ __html: event.description }} />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 w-30">
                        <div className="service-informations">

                            {event.startDateTime && (
                                <div className="card service-info">
                                    <div className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
                                            <path d="M6.5 10.75C5.80964 10.75 5.25 11.3096 5.25 12C5.25 12.6904 5.80964 13.25 6.5 13.25H6.50897C7.19933 13.25 7.75897 12.6904 7.75897 12C7.75897 11.3096 7.19933 10.75 6.50897 10.75H6.5Z" fill="white" />
                                            <path d="M10.4955 10.75C9.80516 10.75 9.24551 11.3096 9.24551 12C9.24551 12.6904 9.80516 13.25 10.4955 13.25H10.5045C11.1948 13.25 11.7545 12.6904 11.7545 12C11.7545 11.3096 11.1948 10.75 10.5045 10.75H10.4955Z" fill="white" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M5.5 1C5.5 0.447715 5.05229 0 4.5 0C3.94772 0 3.5 0.447715 3.5 1V1.44885C2.73882 1.6903 2.07734 2.06994 1.51802 2.6746C0.689493 3.57031 0.33279 4.69272 0.164161 6.04866C-3.27975e-05 7.36894 -1.80994e-05 9.05406 3.91151e-07 11.1739V11.8261C-1.80994e-05 13.9459 -3.27975e-05 15.6311 0.164161 16.9513C0.33279 18.3073 0.689493 19.4297 1.51802 20.3254C2.3568 21.2322 3.42535 21.6329 4.71533 21.8204C5.95141 22.0001 7.52291 22 9.47119 22H11.5288C13.477 22 15.0486 22.0001 16.2847 21.8204C17.5747 21.6329 18.6432 21.2322 19.482 20.3254C20.3105 19.4297 20.6672 18.3073 20.8358 16.9513C21 15.6311 21 13.9459 21 11.8261V11.1739C21 9.05408 21 7.36895 20.8358 6.04866C20.6672 4.69272 20.3105 3.57031 19.482 2.6746C18.9227 2.06993 18.2612 1.6903 17.5 1.44885V1C17.5 0.447715 17.0523 0 16.5 0C15.9477 0 15.5 0.447715 15.5 1V1.09173C14.403 0.999955 13.0863 0.999976 11.5288 1H9.47122C7.91376 0.999976 6.59704 0.999955 5.5 1.09173V1ZM2.99783 8C2.53921 8 2.3099 8 2.16385 8.14417C2.01781 8.28833 2.01487 8.51472 2.009 8.96751C2.00027 9.64067 2 10.3942 2 11.2432V11.7568C2 13.9616 2.00182 15.5221 2.14887 16.7045C2.29327 17.8656 2.56263 18.5094 2.98622 18.9673C3.39956 19.4142 3.9647 19.6903 5.003 19.8412C6.07858 19.9975 7.50425 20 9.55 20H11.45C13.4957 20 14.9214 19.9975 15.997 19.8412C17.0353 19.6903 17.6004 19.4142 18.0138 18.9673C18.4374 18.5094 18.7067 17.8656 18.8511 16.7045C18.9982 15.5221 19 13.9616 19 11.7568V11.2432C19 10.3942 18.9997 9.64067 18.991 8.96751C18.9851 8.51472 18.9822 8.28833 18.8362 8.14417C18.6901 8 18.4608 8 18.0022 8H2.99783Z" fill="white" />
                                        </svg>
                                    </div>
                                    <div className="info">
                                        <p>{new Date(event.startDateTime).toLocaleDateString(i18n.language === 'ar' ? 'ar-EG' : 'en-GB')}</p>
                                    </div>
                                </div>
                            )}

                            {event.startDateTime && event.endDateTime && (
                                <div className="card service-info">
                                    <div className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.75 0C4.81294 0 0 4.81294 0 10.75C0 16.6871 4.81294 21.5 10.75 21.5C16.6871 21.5 21.5 16.6871 21.5 10.75C21.5 4.81294 16.6871 0 10.75 0ZM11.75 6.75C11.75 6.19772 11.3023 5.75 10.75 5.75C10.1977 5.75 9.75 6.19772 9.75 6.75V10.75C9.75 11.0152 9.85536 11.2696 10.0429 11.4571L12.0429 13.4571C12.4334 13.8476 13.0666 13.8476 13.4571 13.4571C13.8476 13.0666 13.8476 12.4334 13.4571 12.0429L11.75 10.3358V6.75Z" fill="white" />
                                        </svg>
                                    </div>
                                    <div className="info">
                                        <p>{formatTimeRange(event.startDateTime, event.endDateTime)}</p>
                                    </div>
                                </div>
                            )}

                            {event.location && (
                                <div className="card service-info">
                                    <div className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M9.75154 0C5.92538 0 2.27505 2.26303 0.747135 5.83468C-0.67482 9.15865 0.0949632 11.9873 1.69771 14.4095C3.01177 16.3954 4.92835 18.1678 6.65742 19.7668L6.65758 19.7669L6.65824 19.7675C6.98768 20.0722 7.31031 20.3706 7.62066 20.6629L7.62231 20.6645C8.19734 21.2028 8.96115 21.5 9.75154 21.5C10.5419 21.5 11.3058 21.2028 11.8808 20.6644C12.1743 20.3896 12.4786 20.1092 12.789 19.8232L12.7891 19.8232L12.7891 19.8232C14.537 18.2127 16.4804 16.422 17.8082 14.4109C19.4091 11.9862 20.1761 9.15453 18.7559 5.83468C17.228 2.26303 13.5777 0 9.75154 0ZM9.75 5.75C7.54086 5.75 5.75 7.54086 5.75 9.75C5.75 11.9591 7.54086 13.75 9.75 13.75C11.9591 13.75 13.75 11.9591 13.75 9.75C13.75 7.54086 11.9591 5.75 9.75 5.75Z" fill="white" />
                                        </svg>
                                    </div>
                                    <div className="info">
                                        <p>{event.location}</p>
                                    </div>
                                </div>
                            )}

                            {event.url && (
                                <div className="card service-info">
                                    <div className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                             viewBox="0 0 18 18" fill="none">
                                            <path
                                                d="M16.6478 1.42433C14.823 -0.474779 11.8474 -0.474777 10.0226 1.42434L9.30908 2.16693C8.92643 2.56518 8.93908 3.19822 9.33732 3.58087C9.73556 3.96352 10.3686 3.95088 10.7513 3.55263L11.4648 2.81003C12.5025 1.72999 14.1679 1.72999 15.2056 2.81003C16.265 3.91256 16.265 5.71604 15.2056 6.81857L11.9662 10.19C11.8012 10.3617 11.6221 10.5047 11.4341 10.6202C10.1992 11.3793 8.59109 10.9156 7.85361 9.70783C7.56579 9.23648 6.95035 9.08769 6.47899 9.37552C6.00764 9.66334 5.85886 10.2788 6.14668 10.7501C6.32551 11.043 6.53777 11.3202 6.78322 11.5757C8.32006 13.1751 10.6795 13.4316 12.4814 12.3241C12.8142 12.1196 13.126 11.8696 13.4084 11.5757L16.6478 8.20427C18.4509 6.32765 18.4509 3.30096 16.6478 1.42433Z"
                                                fill="white"></path>
                                            <path
                                                d="M11.217 6.42433C9.39226 4.52522 6.41655 4.52522 4.59179 6.42433L1.35237 9.79573C-0.45079 11.6724 -0.450789 14.699 1.35237 16.5757C3.17713 18.4748 6.15284 18.4748 7.9776 16.5757L8.69138 15.8328C9.07403 15.4346 9.06139 14.8015 8.66315 14.4189C8.26491 14.0362 7.63187 14.0489 7.24922 14.4471L6.53544 15.19C5.49768 16.27 3.83229 16.27 2.79453 15.19C1.73516 14.0874 1.73516 12.284 2.79453 11.1814L6.03395 7.81004C7.07171 6.72999 8.7371 6.72999 9.77486 7.81003C9.91833 7.95935 10.0422 8.12108 10.1466 8.29204C10.4344 8.76338 11.0499 8.91213 11.5212 8.62428C11.9925 8.33643 12.1413 7.72098 11.8534 7.24964C11.6746 6.95686 11.4624 6.67972 11.217 6.42433Z"
                                                fill="white"></path>
                                        </svg>
                                    </div>
                                    <div className="info link-item">
                                        <a href={event.url} target="_blank" rel="noopener noreferrer">
                                            {event.url}
                                        </a>
                                    </div>
                                </div>
                            )}

                            <div className="card service-info">
                                <button
                                    id="attend-event-btn"
                                    className={`btn ${attendanceStatus === 'attending' ? 'loading' : ''}`}
                                    disabled={attendanceStatus !== 'available'}
                                    onClick={handleAttend}
                                    style={{
                                        width: '100%',
                                        opacity: attendanceStatus !== 'available' && attendanceStatus !== 'attending' ? 0.6 : 1,
                                        cursor: attendanceStatus === 'available' ? 'pointer' : 'not-allowed'
                                    }}
                                >
                                    {attendanceStatus === 'attending' && t('attending')}
                                    {attendanceStatus === 'attended' && t('already-attended-event')}
                                    {attendanceStatus === 'available' && t('attend-event')}
                                </button>
                            </div>

                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default EventDetails;