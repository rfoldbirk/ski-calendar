import { Form, useLoaderData, useSubmit, useTransition } from "remix";
import type { LoaderFunction } from "remix";
import { getWeekNumber, nfetch } from "~/shared/js";
import { input_text } from "~/shared/jsx";




export async function action(params: any) {
	try {
		const request = params.request
		const fd = await request.formData()
		
		const user = {
			firstname: fd.get("firstname"),
			lastname: fd.get("lastname"),
			tlf_nr: fd.get("number"),
			age: Number(fd.get("age")),
			week_nr: Number(fd.get("week")),
			is_instructor: (fd.get("is_instructor") == 'on') ? true:false,
			parent_id: null
		}
		
		return await nfetch("/api/users/add", 'post', user)
		
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
		: "Opret Person";
		
	
	
	return (
		<Form method="post" className="m-5 p-5">
			<h1 className="text-green-400 text-4xl font-bold"> Tilføj Person </h1>
			{input_text("firstname", "Fornavn")}
			{input_text("lastname", "Efternavn")}
			{input_text("age", "Alder", undefined, {type: "number"})}
			{input_text("week", "Uge nr", String(year_week[1]), {type: "number"})}
			{input_text("email", "Email", undefined, {type: "email"})}
			{input_text("number", "Tlf nummer", undefined, {type: "tel"})}
			
			<div className="mt-2">
				<label className="inline-flex items-center">
					<input type="checkbox" id="is_instructor" name="is_instructor" className="form-checkbox text-green-500"/>
					<span className="ml-2">Er instruktør?</span>
				</label>
			</div>
			
			<button type="submit" className="bg-green-500 hover:bg-green-300 w-full transition:colors mt-2 p-5 rounded text-black text-xl">
				{btn_text}
			</button>
		</Form>
	)
}
	