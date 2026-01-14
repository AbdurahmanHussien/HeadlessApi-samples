import { request } from "./api";
import { AUTH_CONFIG } from "../utils/config";

export const getNewsList = async (search, date, page, pageSize, lang) => {

    const endpoint = "/o/News/v1.0/news";


    const params = new URLSearchParams({
        page: page,
        pageSize: pageSize
    })

    if(search) params.append("search", search);
    if(date) params.append("Date", date);


    const url = `${AUTH_CONFIG.apiBaseUrl}${endpoint}?${params.toString()}`;

    return request(url, {
        headers: { 'Accept-Language': lang }
    });
}


export const getNewsDetail = async (id, lang) => {
    const url = `${AUTH_CONFIG.apiBaseUrl}/o/News/v1.0/news/${id}`;

    return request(url, {
        headers: { 'Accept-Language': lang }
    });
};