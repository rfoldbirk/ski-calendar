import { useLoaderData } from "remix";
import { useRef, useState } from "react";
import { nfetch } from "~/shared/js";


export const loader = async ({params}: {params: any}) => {
    // jeg har allerede noget info om selve lektionen, men jeg vil også gerne vide hvem der er med på holdet.
    // indtil videre får jeg team_id, som jeg kan bruge til at hente data om info

    const team_id = params?.id.split(':')[0]
    const lesson_id = params?.id.split(':')[1]

    const team = await nfetch("/api/teams/id/"+team_id)
	const lesson = await nfetch("/api/lessons/"+lesson_id)
	team.team.lesson = lesson

    return team;
};


export default function RenderLesson() {
    const {status, team, errors}: {status: boolean, team: {title: string, description: string, week: number}, errors: string[]} = useLoaderData();
	const lesson = team.lesson
	const st = useRef(null) // start_time input field reference
	const et = useRef(null)
	const [valid, setValid] = useState("yes") // bruges til at style tidspunkt alt afhængigt af om det er gyldigt


	async function remove_lesson() {
		const dr = await nfetch("/api/lessons/delete/"+lesson.id, "delete")
		if (dr.status) {
			location.href = "/"
		}
		else {
			alert("Kunne ikke slette")
		}
	}

	
	async function update_time(event, _val=true) {


		let data = {
			start_time: st.current?.value,
			end_time: et.current?.value,
			lesson_id: lesson.id,
		}

		for (let e of ["start_time", "end_time"]) {
			const hm = data[e].split(":")
			const hour = hm[0]
			const min = hm[1]

			if (hour.length < 1 || hour.length > 2) {
				return
			}

			if (min.length != 2) {
				return
			}
		}

		setValid("pending")
		const res = await nfetch("/api/lessons/update", "post", data)

		if (res.status) {
			lesson.start_time = data.start_time
			lesson.end_time = data.end_time
			setValid("yes")
			return
		}

		setValid("no")
	}

	function RenderUsers({users}) {
		users.map((user) => {
			if (!user.tlf_nr.includes("+")) {
				user.tlf_nr = "+45"+user.tlf_nr
			}
		})


		return users.map(user => <div className="bg-gray-300 dark:bg-gray-900 p-2 mt-2 mb-2 rounded">
			{user.firstname}
			<span className="float-right text-green-700 dark:text-green-400">
				<a href={"tel:"+user.tlf_nr}> {user.tlf_nr} </a>
			</span>
		</div>)
	}

	function Time({time, rf}) {
		const time_style = valid == "yes" ? "text-white": valid == "pending" ? "text-yellow-400":"text-red-400"
		// const time_style = "text-blue-400"

		return <input
			className={"focus:text-yellow-600 dark:focus:text-yellow-400 text-center bg-gray-300 dark:bg-gray-900 p-2 mt-2 mb-2 rounded"}
			defaultValue={time}
			ref={rf}
			onChange={update_time}
		/>
	}


    if (status) {
		return <>
			<div className="m-5 p-5 bg-gray-200 dark:bg-gray-800 rounded">
				<h1 className="text-2xl"> {team.title} </h1>
				<h2 className="text-lg text-gray-400"> {team?.description} </h2>

				<span className="grid grid-cols-3 gap-2">
					<h1 className="text-xl font-bold text-green-700 dark:text-green-400 pt-3 pb-2"> {lesson.day} </h1>
					<Time rf={st} time={lesson.start_time}/>
					<Time rf={et} time={lesson.end_time}/>
				</span>

        	    <h1 className="text-lg text-blue-400 font-bold"> Elever </h1>
				<RenderUsers users={team.students}/>
			
        	    <h1 className="text-lg text-blue-400 font-bold"> Instruktører </h1>

				<RenderUsers users={team.instructors}/>
        	</div>
			<div className="m-5">
			<button onClick={remove_lesson} className="p-5 bg-gray-200 dark:bg-gray-800 rounded w-full">
				<h1 className="text-red-500 dark:text-red-400 font-bold text-center text-lg"> Fjern lektion  </h1>
			</button>
			</div>
		</>
    }
    else {
        return errors.map(err => <h1> {err} </h1>)
    }
}
