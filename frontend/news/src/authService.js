
const CONFIG = {
    url: "http://localhost:8080/o/oauth2/token",
    clientId: "id-6a225931-a6f6-a64d-4343-f85df92e2b",
    clientSecret: "secret-efa032bf-10b5-22f7-dfb9-9c14b0238e89"
};


export const getSystemToken = async (forceRefresh = false) => {
    if (!forceRefresh) {
        const storedToken = sessionStorage.getItem("system_token");
        if (storedToken) return storedToken;
    }

    // 2. Fetch NEW token
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", CONFIG.clientId);
    params.append("client_secret", CONFIG.clientSecret);

    try {
        const response = await fetch(CONFIG.url, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params
        });

        if (!response.ok) throw new Error("Auth Failed");

        const data = await response.json();
        sessionStorage.setItem("system_token", data.access_token);
        return data.access_token;

    } catch (error) {
        console.error("Token Error:", error);
        sessionStorage.removeItem("system_token");
        return null;
    }
};

export const fetchWithAuth = async (url, options = {}) => {
    let token = await getSystemToken();

    if (!token) throw new Error("No Access Token Available");

    const headers = {
        ...options.headers,
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    };

    try {
        let response = await fetch(url, { ...options, headers });

        // 3. Intercept 401 (Expired Token)
        if (response.status === 401) {
            console.warn("Token expired. Wiping storage and retrying...");

            // CRITICAL: Remove the bad token immediately
            sessionStorage.removeItem("system_token");

            // Force fetch a brand new one
            token = await getSystemToken(true);

            if (token) {
                // Retry the request with the new token
                headers["Authorization"] = `Bearer ${token}`;
                response = await fetch(url, { ...options, headers });
            }
        }

        return response;
    } catch (error) {
        // If we get a CORS error (TypeError), it often means a 401 happened
        // behind the scenes but Liferay stripped headers.
        // We wipe the token to ensure next reload is fresh.
        console.error("Network/CORS Error:", error);
        sessionStorage.removeItem("system_token");
        throw error;
    }
};