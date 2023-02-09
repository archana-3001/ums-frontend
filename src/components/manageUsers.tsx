import UserForm from "./user-form";
import { useContext, useState } from 'react'; 
import { ListComponent } from "./listComponet";
import { ListAllUsers } from "./listAllUsers";
import { SearchByAttr } from "./searchByAttr";
import { useEffect } from "react";
import {RefreshContext} from "@/state/RefreshContext";
import { UserContext } from "@/state/RefreshContext";
import Link from "next/link";
import { FaCaretDown } from "react-icons/fa";


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
    const [drawers, setDrawer]=useState(false);
    
    
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
    setDrawer(!drawers);

}

const updateUsers=async()=>{
    console.log("update users")
    setComponents(<ListAllUsers/>);
    setDrawer(!drawers);
}

const searchUsers=async()=>{
    console.log("search users!!");
    setComponents(<SearchByAttr/>)
    setDrawer(!drawers);
}
const logout=()=>{
    localStorage.clear();
}
    return(<>
    <nav className="flex items-center justify-between flex-wrap bg-white py-4 lg:px-12 shadow border-solid border-t-2 border-blue-700">
    <ul className="flex w-full flex-wrap items-center h-10">
    <li className="text-md font-bold text-blue-700 lg:flex-grow">
        <button className="dropdown-toggle
          px-6
          py-2.5
          bg-blue-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg active:text-white
          transition
          duration-150
          ease-in-out
          flex
          items-center
          whitespace-nowrap
        " onClick={()=>{setDrawer(!drawers)}}>Manage Users<FaCaretDown/></button>
        {
           (drawers)? <div className="absolute z-50 bg-blue-200">
    
                <div className=" mt-4 hover:text-white px-6 py-2 hover:bg-blue-600">
                    <button  onClick={createUsers}>Create users </button>
                </div>
                <div className=" mt-4 hover:text-white px-6 py-2 hover:bg-blue-600">
                    <button  onClick={updateUsers}>Update users</button>
                </div>
                <div className=" mt-4 hover:text-white px-6 py-2 hover:bg-blue-600">
                    <button  onClick={searchUsers}>Search users</button>
                    </div>
                    <div className=" mt-4 hover:text-white px-6 py-2 hover:bg-blue-600">
                <Link  href="/" onClick={logout}>Logout</Link>
                </div>
            </div>:<></>
            }
        </li>
        </ul>
            
        </nav>
        <ListComponent text={components}/>
    </>);
}