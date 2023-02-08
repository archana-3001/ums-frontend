import UserForm from "./user-form";
import { useContext, useState } from 'react'; 
import { ListComponent } from "./listComponet";
import { ListAllUsers } from "./listAllUsers";
import { SearchByAttr } from "./searchByAttr";
import { useEffect } from "react";
import {RefreshContext} from "@/state/RefreshContext";
import { UserContext } from "@/state/RefreshContext";
import Link from "next/link";

interface userProperties{
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    is_active: boolean,
    is_admin: boolean,
    phone_number: string,
    id: string,
    username: string
}

export const ManageUsers=()=>{
    const {refresh, setRefresh}=useContext(RefreshContext);
    // const [users, setUsers]=useState<userProperties[]>([]);
    const {user, setUser}=useContext<any>(UserContext);
    const [components, setComponents] = useState(<UserForm/>); 
    
    
    useEffect(()=>{
        console.log("refresh......", refresh);
        // console.log(token.token);
        const tok=localStorage.getItem('token') || "";
        if(tok!=""){
        const token=JSON.parse(tok);
        const fetchOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: 'Bearer ' + token.token
            },
        };
        const url='http://localhost:8000/api/users';
        const getAllUsers=async ()=>{
            const response=await fetch(url, fetchOptions);
            const json: []=await response.json();
            var arr: userProperties[]=[]
            Object.values(json).forEach(data=>{
                // console.log(data);
                arr.push(data);
                // setUsers([...arr]);
            })
            setUser([...arr]);
            // console.log(users);
        }
        getAllUsers();
    }
        
    }, [components, refresh]);
const createUsers=async()=>{
    console.log("create users");
    setComponents(<UserForm/>);

}

const updateUsers=async()=>{
    console.log("update users")
    setComponents(<ListAllUsers/>);
}

const searchUsers=async()=>{
    console.log("search users!!");
    setComponents(<SearchByAttr/>)
}
const logout=()=>{
    localStorage.clear();
}
    return(<>
    <nav className="flex items-center justify-between flex-wrap bg-white py-4 lg:px-12 shadow border-solid border-t-2 border-blue-700">
            <ul className="flex w-full flex-wrap items-center h-10">
                <li className="text-md font-bold text-blue-700 lg:flex-grow">
                    <button className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2" onClick={createUsers}>Create users </button>
          
                    <button className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2" onClick={updateUsers}>Update users</button>
                </li>
                <li className="flex">
                    <button className="block text-md px-4 py-2 rounded text-blue-700 ml-2 font-bold hover:text-white mt-4 hover:bg-blue-700 lg:mt-0" onClick={searchUsers}>Search users</button>
                <Link className="block text-md px-4  ml-2 py-2 rounded text-blue-700 font-bold hover:text-white mt-4 hover:bg-blue-700 lg:mt-0" href="/" onClick={logout}>Logout</Link>
                </li>
            </ul>
        </nav>
        <ListComponent text={components}/>
    </>);
}