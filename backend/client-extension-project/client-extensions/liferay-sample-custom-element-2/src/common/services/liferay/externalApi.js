
export const fetchExternal = async (url, options = {}) => {
    return fetch(url, {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    });
};

export default fetchExternal;