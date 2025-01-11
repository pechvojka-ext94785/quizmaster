export const fetchJson = async <T>(url: string, init?: RequestInit): Promise<T> => {
    const response = await fetch(url, init)
    return (await response.json()) as T
}

export const postJson = <T, U>(url: string, data: T): Promise<U> =>
    fetchJson(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
