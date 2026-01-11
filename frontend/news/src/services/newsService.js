import { request } from "./api";
import { AUTH_CONFIG } from "../utils/config";

export const getNewsList = async (search, date, page, pageSize, lang) => {
    const url = new URL(`${AUTH_CONFIG.apiBaseUrl}/news`);

    if (search) url.searchParams.append("search", search);
    if (date) url.searchParams.append("Date", date);

    url.searchParams.append("page", page);
    url.searchParams.append("pageSize", pageSize);

    return request(url.toString(), {
        headers: { 'Accept-Language': lang }
    });
}

export const getNewsDetail = async (id, lang) => {
    const url = `${AUTH_CONFIG.apiBaseUrl}/news/${id}`;

    return request(url, {
        headers: { 'Accept-Language': lang }
    });
};