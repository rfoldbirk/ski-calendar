

export async function nget(url: string) {
    return await nfetch(url, "get")
}


export async function npost(url: string, body: RequestInit["body"]) {
    return await nfetch(url, "post", body)
}




async function nfetch(url: string, method: RequestInit["method"], body?: RequestInit["body"]) {
    const response = await fetch(url, {
        method, // GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(body) // body data type must match "Content-Type" header
    });
    return response.json();
}