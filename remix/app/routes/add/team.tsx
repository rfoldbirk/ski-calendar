import { Form, useLoaderData, useSubmit, useTransition } from "remix";
import type { LoaderFunction } from "remix";
import { useRef } from "react"
import { getWeekNumber, nfetch, get_date } from "~/shared/js";
import { input_text, Input } from "~/shared/jsx";
import GetUsers from "./team.get_users";




export async function action(params: any) {

    const kids = [
		{
			"day": "søndag",
			"start_time": "9:30",
			"end_time": "12:00"
		},
		{
			"day": "mandag",
			"start_time": "9:00",
			"end_time": "11:30"
		},
		{
			"day": "tirsdag",
			"start_time": "9:00",
			"end_time": "11:30"
		},
		{
			"day": "torsdag",
			"start_time": "9:00",
			"end_time": "11:30"
		},
		{
			"day": "fredag",
			"start_time": "9:00",
			"end_time": "11:00"
		}
    ]
	

    try {
        const request = params.request
        const fd = await request.formData()
        
        const team = {
            title: fd.get("title"),
            description: fd.get("description"),
            week: Number(fd.get("week")),
            students: fd.getAll("student").map( (num: string) => Number(num) ),
            instructors: fd.getAll("instructor").map( (num: string) => Number(num) ),
            lessons: kids,
        }

        console.log(team)
        
        return await nfetch("/api/teams/new", 'post', team)
        
    }
    catch (err) {
        return {status: false, errors: ["unexpected"]}
    }
}



export default function Add() {
	const week_ref = useRef(null)
    const transition = useTransition();
    const today = get_date()
    
    const btn_text =
        transition.state === "submitting"
        ? "Gemmer..."
        : transition.state === "loading"
        ? "Gemt!"
        : "Opret Hold";
        
    
    return (
        <>
        <Form method="post" className="m-5 p-5">
            <h1 className="text-green-400 text-4xl font-bold"> Tilføj Hold </h1>
			<Input id="title" ph="Hold navn"/>
			<Input id="description" ph="Beskrivelse" required="false"/>
			<Input tp="number" id="week" ph="Uge nr" dv={today.week} rf={week_ref}/>
            
            <input type="text" id="instructor_ids" name="instructor_ids" hidden/>
            <input type="text" id="student_ids" name="student_ids" hidden/>
           
			<GetUsers is_instructor={true} week_nr={week_ref}/>
			<GetUsers is_instructor={false} week_nr={week_ref}/>

            
            <button type="submit" className="bg-green-500 hover:bg-green-300 w-full transition:colors mt-2 p-5 rounded text-black text-xl">
                {btn_text}
            </button>
        </Form>
        
        </>
    )
}
    
