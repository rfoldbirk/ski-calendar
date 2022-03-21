import { ActionFunction, Form, useActionData, useFetcher, useTransition } from "remix"
import { InputHTMLAttributes, useRef, useState } from "react"
import { nfetch } from "~/shared/js"



type user = {
    firstname: string;
    lastname: string;
    id: number,
    is_instructor: boolean;
    nr: string;
    week: number;
}


export default function GetUsers({is_instructor, week_nr}: { is_instructor: boolean, week_nr: number }) {

    const usersf = useFetcher();
    const ref = useRef(null);


    let _users: user[] = []
    const [users, set_users] = useState(_users)
    const [selected_users, set_selusers] = useState(_users)



    async function handleChange({target}: {target: HTMLInputElement}) {
        let res = await nfetch("/api/users/search", "post", {
            "name": target.value,
            "weeknr": Number(week_nr.current?.value),
            "is_instructor": is_instructor,
        })

        if (!res.status) {
            // noget gik galt
            return
        }

        set_users(res.users)
    }

    function does_seluser_exist(id: number, _users=selected_users) {
        for (let user of _users)
            if (user.id == id)
                return true

        return false
    }

    function add_instructor(event: any) {
        // console.log(event.target)
        const user = JSON.parse(event.target.getAttribute("data-user"))
        
        if (does_seluser_exist(user.id)) {
            set_selusers(selected_users.filter(ouser => ouser.id !== user.id))
            return
        }
        
        set_selusers(selected_users => [...selected_users, user])
    }

    return <div className="mt-2 pl-2 border-red-400 border-l-4 ">
        {selected_users.map( user => <div key={"h"+user.id}>
            <input type="hidden" className="bg-gray-900" name={is_instructor ? "instructor" : "student"} defaultValue={String(user.id)} />
        </div>)}


        <input onFocus={handleChange} placeholder={is_instructor ? "Tilføj instruktør" : "Tilføj elev"} onChange={handleChange} className="bg-gray-800 w-full p-3 rounded outline-none " type="text"/>

        {users.map( user => <div key={"u"+user.id} className="bg-gray-900 m-2 p-2 rounded">
            {user.firstname} {user.lastname}
            <span data-user={JSON.stringify(user)} onClick={ add_instructor } className={(does_seluser_exist(user.id) ? 'text-red-400' : 'text-green-400') +" float-right text-green-400 cursor-pointer bg-black pr-2 pl-2 rounded"}>
                {does_seluser_exist(user.id) ? 'fjern' : 'tilføj'}
            </span>
        </div>)}
    </div>
}
