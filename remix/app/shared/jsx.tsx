export type options = {
	type?: string;
	style?: string;
    required?: boolean;
}

export function input_text(id: string, placeholder?: string, value?: string | undefined, t?: options) {
	t = t || { type: "text", style: "", required: true }
	return <div>
	<input required={t.required} type={t.type} placeholder={placeholder} defaultValue={value} name={id} id={id} className={"w-full p-2 mt-2 rounded bg-gray-800 text-white " + t.style} />
	</div>
}