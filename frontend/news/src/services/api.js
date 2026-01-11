import { fetchWithAuth } from "./authService";

export const request = async (url, options) => {
    const response = await fetchWithAuth(url, options);
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
};