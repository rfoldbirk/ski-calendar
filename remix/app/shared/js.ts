import { Lang_Days } from "./types";

export async function nfetch(url: string, method: RequestInit["method"] = "get", body?: any) {
	let baseURL = ""
	try {
		if (window) {
			baseURL = ""
		}
	}
	catch (err) {
		baseURL = "http://localhost"
	}


	const response = await fetch(baseURL + url, {
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


export function get_date() {
	let currentdate: any = new Date();
	var oneJan: any = new Date(currentdate.getFullYear(), 0, 1);
	var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
	var week_number = getWeekNumber(currentdate)[1]
	
	let today = lang_days[currentdate.getDay()].dk;
	week_number = (today == "Søndag") ? ++week_number:week_number

	console.log(week_number)

	return {
		"week": week_number,
		"day": today,
	}
}


export const lang_days: Lang_Days[] = [
	{ "en": "Sunday", "dk": "Søndag" },
	{ "en": "Monday", "dk": "Mandag" },
	{ "en": "Tuesdag", "dk": "Tirsdag" },
	{ "en": "Wednesday", "dk": "Onsdag" },
	{ "en": "Thursday", "dk": "Torsdag" },
	{ "en": "Friday", "dk": "Fredag" },
	{ "en": "Saturday", "dk": "Lørdag" },
  ]


export function getWeekNumber(d: Date) {
	d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
	d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
	var yearStart = Number(new Date(Date.UTC(d.getUTCFullYear(), 0, 1)))
	var weekNo = Math.ceil((((Number(d) - yearStart) / 86400000) + 1) / 7);
	return [d.getUTCFullYear(), weekNo];
}
