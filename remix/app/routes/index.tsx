import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";

const days = ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"]

export async function loader() {
  let res = await fetch("http://localhost:4000/api/teams/weekly_schedule/9");
  let lessons = await res.json()

  let schedule: any = {
    "søndag": [],
    "mandag": [],
    "tirsdag": [],
    "onsdag": [],
    "torsdag": [],
    "fredag": [],
    "lørdag": [],
  }

  for (let lesson of lessons) {
    schedule[lesson.day].push(lesson)
  }

  return schedule;
}



export default function Index() {
  let schedule = useLoaderData();

  return (
    <div className="">
      {days.map( day =>
        <div key={day}>
          <h1 className="m-5 text-green-400 text-4xl"> {day} </h1>

          {schedule[day].map( (lesson: any) =>
            <div key={lesson.title+day} className="m-5 p-5 rounded bg-gray-800">
              <h1 className="text-xl"> {lesson.title} </h1>
              <p className="text-gray-400">{lesson.start_time} - {lesson.end_time}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
