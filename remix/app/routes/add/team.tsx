import { Form, useLoaderData, useSubmit, useTransition } from "remix";
import type { LoaderFunction } from "remix";
import { getWeekNumber, nfetch } from "~/shared/js";
import { input_text } from "~/shared/jsx";import GetUsers from "./team.get_users";




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
        
        return await nfetch("http://localhost:4000/api/teams/new", 'post', team)
        
    }
    catch (err) {
        return {status: false, errors: ["unexpected"]}
    }
}



export default function Add() {
    const transition = useTransition();
    const year_week = getWeekNumber(new Date())
    
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
            {input_text("title", "Hold navn")}
            {input_text("description", "Beskrivelse", undefined, {required: false})}
            {input_text("week", "Uge nr", String(year_week[1]), {type: "number"})}
            
            <input type="text" id="instructor_ids" name="instructor_ids" hidden/>
            <input type="text" id="student_ids" name="student_ids" hidden/>
            
            
            <GetUsers is_instructor={true}/>
            <GetUsers is_instructor={false}/>

            
            <button type="submit" className="bg-green-500 hover:bg-green-300 w-full transition:colors mt-2 p-5 rounded text-black text-xl">
                {btn_text}
            </button>
        </Form>
        
        </>
    )
}
    