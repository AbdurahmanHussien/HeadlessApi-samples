/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import React, { useState, useEffect } from 'react';
import api from '../services/liferay/api';

function UserList() {
    const [users, setUsers] = useState([]); // Initialize as empty array


    useEffect(() => {

        api('o/headless-admin-user/v1.0/user-accounts')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setUsers(data.items || []);
            })
            .catch((error) => {
                console.error("5. API CRASHED:", error);
            });
    }, []);

    return (
        <div className="container p-3">
<div>
    <h1>Users List</h1>
</div>
            <ul className="list-group">
                {users.length === 0 && <li className="list-group-item">No users found yet...</li>}

                {users.map((user) => (
                    <li key={user.id} className="list-group-item">
                      <span> {user.name} - {user.jobTitle ? user.jobTitle : "No Job Title"}</span>
                       <span>| Email:  {user.emailAddress}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;