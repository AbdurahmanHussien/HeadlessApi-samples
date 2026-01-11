/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import React from 'react';

import UserList from './common/components/UserList.js';
import api from './common/services/liferay/api.js';
import {Liferay} from './common/services/liferay/liferay.js';
import {createRoot} from "react-dom/client";
import UserProfile from "./common/components/UserProfile";
import Tasks from "./common/components/Tasks";

const App = () => {


	return (
		<div>
					<UserList />
            <br></br>

<UserProfile />

            <Tasks />
		</div>
	);
};

class WebComponent extends HTMLElement {
    connectedCallback() {
        // Create a React root inside this custom element
        this.root = createRoot(this);

        // Render your App component
        this.root.render(<App />);
    }

    // This runs when the element is removed (cleanup)
    disconnectedCallback() {
        if (this.root) {
            this.root.unmount();
        }
    }
}

const ELEMENT_ID = 'liferay-sample-custom-element-2';

if (!customElements.get(ELEMENT_ID)) {
	customElements.define(ELEMENT_ID, WebComponent);
}
