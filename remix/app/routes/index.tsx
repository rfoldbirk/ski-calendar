import { Link, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { get_date, nfetch } from "~/shared/js";

const days = ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"]

export async function loader() {
  let today = get_date()
  console.log(today)
  let lessons = await nfetch("/api/teams/weekly_schedule/9")

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

  function _get_lesson_data(elem: HTMLElement): JSON | boolean {
    const lesson = elem.getAttribute("data-lesson")

    if (lesson) {
      return JSON.parse(lesson)
    }
    
    if (elem.parentElement)
      return _get_lesson_data(elem.parentElement)

    return false
  }

  function lessonClick({target}: {target: any}) {
    const lesson = _get_lesson_data(target)
    console.log(lesson)
  }

  return (
    <div className="">
      {days.map( day =>
        <div key={day}>
          <h1 className="m-5 text-green-400 text-4xl"> {day} </h1>

          {schedule[day].map( (lesson: any) =>
            <Link to={`/lessons/${lesson.team_id}:${lesson.lesson_id}`} data-lesson={JSON.stringify(lesson)} onClick={lessonClick} key={lesson.title+day}>
              <div className="m-5 p-5 rounded bg-gray-800 cursor-pointer hover:bg-gray-900 transition-colors duration-200">
                <h1 className="text-xl"> {lesson.title} </h1>
                <p className="text-gray-400">{lesson.start_time} - {lesson.end_time}</p>
              </div>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
