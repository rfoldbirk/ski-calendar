<script lang="ts">
    import { onMount } from "svelte";
    import { nget } from "../../stores/networking";
    import type { Day_dk, TeamLesson } from "../../stores/types";




    export let week_nr: number = 5;

    let lessons: TeamLesson[] = []

    let days = {
        "Søndag": [],
        "Mandag": [],
        "Tirsdag": [],
        "Onsdag": [],
        "Fredag": [],
        "Lørdag": [],
    }

    function capitalize(str): Day_dk {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    onMount(async () => {
		lessons = await nget("http://localhost:4000/api/teams/get_team_lessons_by_week/"+week_nr)
        

        for (const les of lessons) {
            let i = 0

            console.log(les.lesson.day)
            les.lesson.day = capitalize(les.lesson.day)
            console.log(les.lesson.day)

            

            // Sorter efter tid. n+1, men ellers bliver tiderne ikke sorteret...
            for (const day of days[les.lesson.day]) {
                let stored_st = Number(day.start_time.split(':')[0])
                let new_st = Number(day.start_time.split(':')[0])

                if (new_st > stored_st) {
                    day.splice(i, 0, les)
                }

                i++
            }

            if (i == 0) {
                days[les.lesson.day].push(les)
            }
        }
	});

</script>

<h1 class="text-5xl font-bold text-green-400 m-5 pb-5"> Uge {week_nr} </h1>

{#each lessons as TL}
    <div class="bg-gray-800 m-5 p-5 rounded">
        <p class="text-lg">{TL.title}</p>
        <p class="text-sm">{TL.lesson.day}</p>
    </div>
{/each}