<script type="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
  import { lang_days, get_week_and_day } from "../stores/data";
  import type { Team, Day_dk } from "../stores/types";

	let today = get_week_and_day();
	let teams: Team[] = []

	onMount(async () => {
		today = get_week_and_day()
		teams = await window["feathers"].service("schedule").find();
	});

  let week: number = today.week;
  let amount_of_weeks: number = 1;

	function load_next_week() {
		amount_of_weeks ++
	}

  let week_arr: number[] = [];

	$: {
		let _week_arr: number[] = [];
		for (let i = week; i < week + amount_of_weeks; i++) {
			_week_arr.push(i);
		}

		week_arr = _week_arr;
	}

  let free_days = [];

	$: {
		free_days = []
		for (let W of week_arr) {
			for (let day of lang_days) {
				let free = true;
				for (let team of teams) {
					for (let lesson of team.lessons) {
						if (team.week == W && lesson.day == day.dk) free = false;
					}
				}
				
				if (!free) continue;
				
				free_days.push(day.dk + W);
			}
		}
	}
		
  /*

	- render week
		- render days in week
			- render Teams in a day

	*/
</script>

{#each week_arr as week_nr}
  <h1 class="m-5 text-blue-400 text-[44px] font-semibold">Uge {week_nr}</h1>
  {#each lang_days as day}
		<div transition:fade>
			{#if !free_days.includes(day.dk + week_nr)}
				<h1 class="m-5 text-{(today.day == day.dk && week_nr == today.week) ? 'red':'green'}-400 text-[32px] font-semibold">{day.dk}</h1>
				{#each teams as team}
					{#if team.week == week_nr}
						{#each team.lessons as lesson}
							{#if lesson.day == day.dk}
								<div class="bg-slate-800 { (team.title == "Træning") ? 'bg-zinc-900':''} rounded p-5 m-5">
									<div class="col-span-9">
										<h1 class="text-xl text-gray-300">{team.title}</h1>
										<span class="text-gray-500">
											<span>{lesson.start}</span> - <span>{lesson.end}</span>
										</span>
									</div>
								</div>
							{/if}
						{/each}
					{/if}
				{/each}
			{:else}
				{#if today.day == day.dk && week_nr == today.week}
					<div class="m-5">
						<h1 class="text-red-400 text-[32px] font-semibold">{day.dk}</h1>
						<p class="text-xl"> <span class="text-4xl mr-1">🥳</span> Intet at lave i dag <span class="text-4xl ml-1">🥳</span></p>
					</div>
				{/if}
				<!-- <h1> {(today.day == day.dk && week_nr == week) ? "Du har fri i dag":"Det er ikke i dag"} </h1> -->
			{/if}
		</div>
  {/each}
{/each}

<div class="flex justify-center m-5 mt-10">
  <button 
		on:click={load_next_week} 
		class="p-3 bg-gray-900 shadow text-blue-500 rounded">
		Indlæs næste uge 
	</button>  
</div>
​


