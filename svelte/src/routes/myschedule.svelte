<script lang="ts">
    import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { nget } from "../stores/networking";
	import { lang_days, get_week_and_day } from "../stores/data";
	import type { Team, Lesson, Day_dk, TeamLesson } from "../stores/types";
    import RenderWeek from "../components/myschedule/render_week.svelte"




    let week_nr: number = 8;

	
</script>

<RenderWeek week_nr={week_nr}/>
