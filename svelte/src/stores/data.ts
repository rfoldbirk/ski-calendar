import type { Lang_Days, Team } from "./types"




export function get_week_and_day() {
  let currentdate: any = new Date();
  var oneJan: any = new Date(currentdate.getFullYear(),0,1);
  var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
  var week_number = Math.ceil(( currentdate.getDay() + 1 + numberOfDays) / 7);

  let today = lang_days[currentdate.getDay()].dk;

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

export const teams: Team[] = [
  {
    title: "Børn Let øvet 7-14 årige",
    week: 5,
    students: [
      {
        "name": "Bjørk",
        "age": 11,
        "nr": "+4500000000",
      },
      {
        "name": "Johanna",
        "age": 7,
        "nr": "+4500000000",
      },
      {
        "name": "Johannes",
        "age": 9,
        "nr": "+4500000000",
      }
    ],
    lessons: [
      {
        "day": "Søndag",
        "start": "9:30",
        "end": "12:00",
      },
      {
        "day": "Mandag",
        "start": "9:00",
        "end": "11:30",
      },
      {
        "day": "Tirsdag",
        "start": "9:00",
        "end": "11:30",
      },
      {
        "day": "Torsdag",
        "start": "9:00",
        "end": "11:30",
      },
      {
        "day": "Fredag",
        "start": "9:00",
        "end": "11:30",
      }
    ]
  },
  {
    title: "Halv dag 9.00-12.00",
    week: 5,
    students: [
      {
        "name": "Allan Hoffmann",
        "age": 42,
        "nr": "+4500000000",
      },
      {
        "name": "Marie",
        "age": 8,
        "nr": "+4500000000",
      },
    ],
    lessons: [
      {
        "day": "Søndag",
        "start": "13:00",
        "end": "16:30",
      },
      {
        "day": "Mandag",
        "start": "13:00",
        "end": "16:30",
      },
    ]
  },
  {
    title: "Voksen begynder 15+ år",
    week: 6,
    students: [
      {
        "name": "Cindy Sha",
        "age": 37,
        "nr": "+4560557590",
      }
    ],
    lessons: [
      {
        "day": "Søndag",
        "start": "9:30",
        "end": "12:00",
      }
    ]
  },
  {
    title: "Privatlektion â 1 time",
    week: 6,
    students: [
      {
        "name": "Theo Bøgh",
        "age": 17,
        "nr": "+453154133",
      }
    ],
    lessons: [
      {
        "day": "Lørdag",
        "start": "10:00",
        "end": "11:00",
      },
      {
        "day": "Lørdag",
        "start": "13:00",
        "end": "15:00",
      }
    ]
  },
];