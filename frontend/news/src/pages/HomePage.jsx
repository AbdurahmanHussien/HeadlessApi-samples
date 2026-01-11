import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const HomePage = () => {
    const { t } = useTranslation();

    return (
        <div>
            {/* Hero / Banner Section */}
            <div style={{
                backgroundColor: '#1B5A37',
                color: 'white',
                padding: '80px 20px',
                textAlign: 'center',
                marginBottom: '40px'
            }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>
                    Welcome to Our Digital Platform
                </h1>
                <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 30px' }}>
                    Stay connected with the latest updates, company news, and announcements directly from our headquarters.
                </p>
                <Link to="/news">
                    <button style={{
                        padding: '12px 30px',
                        fontSize: '1rem',
                        color: '#1B5A37',
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}>
                        Browse News
                    </button>
                </Link>
            </div>

            {/* Features / Info Section */}
            <div className="app-wrapper" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', paddingBottom: '50px' }}>

                {/* Card 1 */}
                <div style={cardStyle}>
                    <h3 style={{ color: '#1B5A37' }}>Latest Updates</h3>
                    <p style={{ color: '#555', lineHeight: '1.6' }}>
                        Read about our recent achievements and upcoming milestones. We update our feed daily to keep you informed.
                    </p>
                </div>

                {/* Card 2 */}
                <div style={cardStyle}>
                    <h3 style={{ color: '#1B5A37' }}>Company Events</h3>
                    <p style={{ color: '#555', lineHeight: '1.6' }}>
                        Join us at our upcoming town halls and webinars. Check the news section for dates and registration links.
                    </p>
                </div>

                {/* Card 3 */}
                <div style={cardStyle}>
                    <h3 style={{ color: '#1B5A37' }}>Employee Spotlight</h3>
                    <p style={{ color: '#555', lineHeight: '1.6' }}>
                        Celebrating the people who make our success possible. Read stories from teams across the globe.
                    </p>
                </div>
            </div>
        </div>
    );
};

// Simple internal style object for the cards
const cardStyle = {
    padding: '30px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    border: '1px solid #eaeaea'
};

export default HomePage;