export async function nfetch(url: string, method: RequestInit["method"], body?: any) {
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


export function getWeekNumber(d: Date) {
	d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
	d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
	var yearStart = Number(new Date(Date.UTC(d.getUTCFullYear(),0,1)))
	var weekNo = Math.ceil(( ( (Number(d) - yearStart) / 86400000) + 1)/7);
	return [d.getUTCFullYear(), weekNo];
}