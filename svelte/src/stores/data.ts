import type { Lang_Days, Team } from "./types"



export function get_week_and_day() {
  let currentdate: any = new Date();
  var oneJan: any = new Date(currentdate.getFullYear(),0,1);
  var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
  var week_number = Math.ceil(( currentdate.getDay() + 1 + numberOfDays) / 7);

  let today = lang_days[currentdate.getDay()].dk;

  return {
    "week": 6,
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