import { Form } from "remix"
import { Input } from "~/shared/jsx.tsx"
import { nfetch } from "~/shared/js.ts"
import type { Lesson } from "~/shared/types.ts"



export async function action(params: any) {
	const request = params.request
	const fd = await request.formData()

	const form: Lesson = {
		day: fd.get("day"),
		note: fd.get("note"),
		start_time: fd.get("start_time"),
		end_time: fd.get("end_time"),
		team_id: Number(fd.get("tid")),
	}

	const res = await nfetch("/api/lessons/add", "post", form)
	console.log(res)
	return res
}

export default function Add() {
	// day
	// note?
	// start_time
	// end_time
	// team

	return <div className="m-5 p-5  rounded">
		<h1 className="text-4xl font-bold mb-2 text-green-400"> Tilføj lektion </h1>	

		<Form method="post">
			<Input dv="Mandag" id="day" ph="Hvilken dag på ugen?"/>
			<Input required={false} ie="note" ph="En kommentar til dagens lektion"/>
			<Input dv="9:00" id="start_time" ph="Hvad tid starter lektionen?"/>
			<Input dv="11:00" id="end_time" ph="Hvad tid slutter lektionen?"/>
			<Input dv="1" id="tid" ph="TeamID"/>

			<button type="submit" className="bg-gray-900 rounded p-2 mt-5 w-full text-red-400 text-2xl">Tilføj!</button>
		</Form>
	</div>
}
