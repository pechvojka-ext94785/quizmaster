export const fetchJson = async <T>(url: string, init?: RequestInit): Promise<T> =>
    fetch(url, init)
        .then(async response => {
            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message)
            }
            return response
        })
        .then(response => response.json())
        .then(data => data as T)

export const postJson = <T, U>(url: string, data: T): Promise<U> =>
    fetchJson(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

export const putJson = <T, U>(url: string, data: T): Promise<U> =>
    fetchJson(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
