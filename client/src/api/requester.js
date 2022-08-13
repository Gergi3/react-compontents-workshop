const url = 'http://localhost:3005/api'
export function customFetch(method, endpoint, body) {
    let options = { method }
    if (method !== 'GET' && method !== 'DELETE') {
        options = {
            method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }

    return fetch(`${url}${endpoint}`, options)
        .then(res => res.json())
        .catch(err => {
            console.error(err);
            throw new Error('Failed to fetch')
        })
}

export const get = (endpoint) => customFetch('GET', endpoint)
export const post = (endpoint, body) => customFetch('POST', endpoint, body)
export const put = (endpoint, body) => customFetch('PUT', endpoint, body)
export const del = (endpoint) => customFetch('DELETE', endpoint);
