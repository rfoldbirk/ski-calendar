export type options = {
	type?: string;
	style?: string;
    required?: boolean;
}

// ph = placeholder, dv = defaultValue 
export function Input({id, ph, dv, rf, tp="text", required=true}) {
	return <div>
		<input ref={rf} required={required} type={tp} placeholder={ph} defaultValue={dv} name={id} id={id} className={"w-full p-2 mt-2 rounded bg-gray-800 text-white"} />
	</div>
}

export function input_text(id: string, placeholder?: string, value?: string | undefined, t?: options, ref?=null) {
	t = t || { type: "text", style: "", required: true }
	return <div>
	<input ref={ref} required={t.required} type={t.type} placeholder={placeholder} defaultValue={value} name={id} id={id} className={"w-full p-2 mt-2 rounded bg-gray-800 text-white " + t.style} />
	</div>
}
