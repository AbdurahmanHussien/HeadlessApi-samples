

import React, {useState, useEffect } from 'react';
import api from '../services/liferay/api';

function UserProfile() {
    // We added 'id' to the state because we need it for the update URL
    const [userData, setUserData] = useState({
        id: '',
        givenName: '',
        familyName: '',
        jobTitle: '',
        emailAddress: ''
    });

    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. GET request stays the same (this works)
        api('o/headless-admin-user/v1.0/my-user-account')
            .then((response) => response.json())
            .then((data) => {
                setUserData({
                    id: data.id,
                    givenName: data.givenName || '',
                    familyName: data.familyName || '',
                    jobTitle: data.jobTitle || '',
                    emailAddress: data.emailAddress || ''
                });
                setLoading(false);
            })
            .catch((error) => {
                console.error("Fetch error:", error);
                setLoading(false);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'info', message: 'Updating...' });

        try {
            const updateUrl = `o/headless-admin-user/v1.0/user-accounts/${userData.id}`;

            const response = await api(updateUrl, {
                method: 'PATCH',
                body: JSON.stringify({
                    givenName: userData.givenName,
                    familyName: userData.familyName,
                    jobTitle: userData.jobTitle,
                    emailAddress: userData.emailAddress
                })
            });

            if (response.ok) {
                setStatus({ type: 'success', message: 'Profile updated successfully!' });
                setTimeout(() => setStatus({ type: '', message: '' }), 3000);
            } else {
                // Read the error message from the server if possible
                const errorData = await response.json();
                console.error("Server Error:", errorData);
                setStatus({ type: 'danger', message: 'Update failed: ' + (errorData.title || 'Unknown error') });
            }
        } catch (error) {
            console.error("Update error:", error);
            setStatus({ type: 'danger', message: 'An error occurred.' });
        }
    };

    if (loading) return <div className="p-4">Loading...</div>;

    return (
        <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
                <h5 className="mb-0">My Profile (ID: {userData.id})</h5>
            </div>
            <div className="card-body">
                {status.message && (
                    <div className={`alert alert-${status.type}`}>{status.message}</div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="givenName"
                                value={userData.givenName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="familyName"
                                value={userData.familyName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Job Title</label>
                        <input
                            type="text"
                            className="form-control"
                            name="jobTitle"
                            value={userData.jobTitle}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email Address</label>
                        <input
                            type="text"
                            className="form-control"
                            name="emailAddress"
                            value={userData.emailAddress}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UserProfile;