import {AUTH_CONFIG as CONFIG, AUTH_CONFIG} from "../utils/config";

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
        const response = await fetch(CONFIG.authUrl, {
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
        ...options.headers,
        "Content-Type": "application/json"
    };

    try {
        let response = await fetch(url, { ...options, headers });

        if (response.status === 401) {
            console.warn("Token expired. Wiping storage and retrying...");

            sessionStorage.removeItem("system_token");

            token = await getSystemToken(true);

            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
                response = await fetch(url, { ...options, headers });
            }
        }

        return response;
    } catch (error) {
        console.error("Network/CORS Error:", error);
        sessionStorage.removeItem("system_token");
        throw error;
    }
};