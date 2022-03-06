import { useLoaderData } from "remix";
import { nfetch } from "~/shared/js";


export const loader = async ({params}: {params: any}) => {
    // jeg har allerede noget info om selve lektionen, men jeg vil også gerne vide hvem der er med på holdet.

    // indtil videre får jeg team_id, som jeg kan bruge til at hente data om info

    const team_id = params?.id.split(':')[0]
    const lesson_id = params?.id.split(':')[1]

    const team = nfetch("/api/teams/id/"+team_id)
    // const lesson = nfetch("/api/teams/lessons/"+lesson_id
    // TODO: Lav en API som kan returnere en enkelt lektion!

    return team;
};


export default function RenderLesson() {
    const {status, team, errors}: {status: boolean, team: {title: string, description: string, week: number}, errors: string[]} = useLoaderData();

    if (status) {
        return <div className="m-5 p-5 bg-gray-800 rounded">
            <h1 className="text-2xl"> {team.title} </h1>
            <h2 className="text-lg text-gray-400"> {team?.description} </h2>

            <h1 className="text-lg"> Elever: </h1>
            <h1 className="text-lg"> Instruktører: </h1>
        </div>
    }
    else {
        return errors.map(err => <h1> {err} </h1>)
    }
}
