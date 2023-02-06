import UserForm from "./user-form";
import UserUpdate from "./user-update";
import { useContext, useState } from 'react'; 
import { ListComponent } from "./listComponet";
import { ListAllUsers } from "./listAllUsers";
import { SearchByAttr } from "./searchByAttr";
import { useEffect } from "react";
import {RefreshContext} from "@/state/RefreshContext";
import { UserContext } from "@/state/RefreshContext";

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
        const url='http://localhost:8000/api/users';
        const getAllUsers=async ()=>{
            const response=await fetch(url);
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
    return(<>
    <nav className="user-bar">
            <ul className="user-content">
                <li className="user-list">
                    <button className="user-link" onClick={createUsers}>Create users </button>
                </li>
                <li className="user-list">
                    <button className="user-link" onClick={updateUsers}>Update users</button>
                </li>
                <li className="user-list">
                    <button className="user-link" onClick={searchUsers}>Search users</button>
                </li>
            </ul>
        </nav>
        <ListComponent text={components}/>
    </>);
}