<script type="ts">
	import { onMount } from 'svelte';
  import { lang_days, get_week_and_day } from "../stores/data";
  import type { Team, Day_dk, Student } from "../stores/types";

	let today = get_week_and_day();


	let fields = [
		{
			"header": "Titel",
			"type": "text",
			"placeholder": "Skriv en titel",
			"value": "",
		},
		{
			"header": "Uge",
			"type": "number",
			"placeholder": "",
			"value": today.week+1,
		}
	]

	let students: Student[] = [
		{
			"name": "Rasmus Asschenfeldt Foldberg Birkebæk",
			"age": 21,
			"nr": "+4560210409"
		}
	]

	function add() {

	}

</script>


{#each fields as field}
<span class="p-2 w-full">
	<h1 class="font-semibold text-4xl text-blue-400">{field.header}:</h1>
	<input class="w-full mt-3 p-3 bg-gray-800 outline-none text-slate-00" value={field.value} placeholder={field.placeholder} type={field.type}>
</span>
{/each}

<h1 class="font-semibold text-4xl mt-5 text-blue-400"> Elever:</h1>

{#each students as student}
	<div class="grid gap-1 grid-cols-10 p-1 bg-gray-900 rounded">
		<p class="bg-gray-900 rounded col-start-1 col-span-5 p-1">{student.name}</p>
		<p class="bg-gray-900 rounded col-span-1 p-1 text-center">{student.age}</p>
		<p class="bg-gray-900 rounded col-span-4 p-1 text-right">{student.nr}</p>
	</div>
{/each}

<button 
	on:click={add} 
	class="w-1/2 m-3 p-3 bg-gray-900 shadow text-blue-500 rounded">
	Tilføj elev
</button>  


<div class="flex justify-center m-5 mt-10">
  <button 
		on:click={add} 
		class="w-1/2 p-3 bg-gray-900 shadow text-red-500 rounded">
		Tilføj hold
	</button>  
</div>
​


