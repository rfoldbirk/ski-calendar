import { Link, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { get_date, nfetch } from "~/shared/js";

const days = ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"]


export async function loader() {
  let today = get_date()
  let lessons = await nfetch("/api/teams/weekly_schedule/" + today.week)

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

function DisplayDay({day}) {
  let today = get_date()
  let this_day = today.day[0].toLowerCase() + today.day.split(today.day[0])[1]

  return (
    <h1 className={"m-5 text-green-500 dark:text-"+ ((day == this_day ) ? 'red':'green')  +"-400 text-4xl"}> { day[0].toUpperCase() + day.split(day[0])[1] } </h1>
  )
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
  }


  return (
    <div className="">
      {days.map( day =>
      <>
        { schedule[day].length > 0 ?
        <div key={day}>
          <DisplayDay day={day}/>
          {schedule[day].map( (lesson: any) =>
            <Link className="" to={`/lessons/${lesson.team_id}:${lesson.lesson_id}`} data-lesson={JSON.stringify(lesson)} onClick={lessonClick} key={lesson.title+day}>
              <div className="m-5 p-5 rounded bg-gray-200 dark:bg-gray-800 cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-900 transition-colors duration-200">
                <h1 className="text-xl"> {lesson.title} </h1>
                <p className="text-gray-700 dark:text-gray-400">{lesson.start_time} - {lesson.end_time}</p>
              </div>
            </Link>
          )}
        </div>
        : "" }
      </>
      )}
    </div>
  );
}
