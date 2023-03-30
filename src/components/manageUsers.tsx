import UserForm from "./user-form";
import { useContext, useState } from 'react'; 
import { ListComponent } from "./listComponet";
import { ListAllUsers } from "./listAllUsers";
import { SearchByAttr } from "./searchByAttr";
import { useEffect } from "react";
import {ImageComponent} from "./imageComponent";
import {RefreshContext} from "@/state/RefreshContext";
import { UserContext } from "@/state/RefreshContext";
import Link from "next/link";
import { FaArrowCircleLeft, FaCaretDown } from "react-icons/fa";
import { Suspense } from 'react';
import  {Dropdown}  from "@delhivery/orca-ui";
import dynamic from "next/dynamic";
import {
	ChevronDownIcon,
} from "@heroicons/react/outline";

interface userProperties{
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    isActive: boolean,
    isAdmin: boolean,
    phone_number: string,
    id: string,
    username: string
}

// const ImageComponent=dynamic(async()=> (await import('./imageComponent')).ImageComponent, {
//     ssr: false
// })



export const ManageUsers=()=>{
    const {refresh, setRefresh}=useContext(RefreshContext);
    // const [users, setUsers]=useState<userProperties[]>([]);
    const {user, setUser}=useContext<any>(UserContext);
    const [components, setComponents] = useState(<UserForm/>); 
    const [drawers, setDrawer]=useState(false);
    const [token, setToken]=useState("");
    const [isModifyColumnsModalOpen, setIsModifyColumnsModalOpen] =
		useState(false);
    
    const dropDownItemsConfig = [
		{
			dropdownItemName: "Modify Columns",
			handlerFunction: () => setIsModifyColumnsModalOpen(true),
		},
        {
            dropdownItemName: "create",
            handlerFunction: () => setComponents(<UserForm/>),
        },{
            dropdownItemName: 'update',
            handlerFunction: () => setComponents(<ListAllUsers/>)
        }
	];
    
    useEffect(()=>{
        console.log("refresh......", refresh);
        // console.log(token.token);
        // const tok=localStorage.getItem('token') || "";
        // if(tok!=""){
        // const token=JSON.parse(tok);
        
        // let token=localStorage.getItem("APItoken") || "";
        // if(token.length>2){
        const fetchOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
           
        };
        const url='http://localhost:8004/app/test-arc/api/users';
        const getAllUsers=async ()=>{
            const response=await fetch(url, fetchOptions);
            if(response.status==200){
                const json=await response.json();
                // console.log(json.data.entityInstances);
                setUser([...json?.data?.entityInstances]);
            }
            // setToken("token set");
        }
    
        getAllUsers();
    // }
    // }
        
    }, [components, user]);
const createUsers=async()=>{
    console.log("create users");
    setComponents(<UserForm/>);
    setDrawer(!drawers);

}

const updateUsers=async()=>{
    console.log("update users")
    // let token=localStorage.getItem("APItoken") || "";
    //     if(token.length>2){
    setComponents(<ListAllUsers/>);
    setDrawer(!drawers);
        // }
}

const searchUsers=async()=>{
    console.log("search users!!");
    // let token=localStorage.getItem("APItoken") || "";
    //     if(token.length>2){
    
    setComponents(<SearchByAttr/>)
    setDrawer(!drawers)
        // }
}
const logout=()=>{
    localStorage.clear();
}
    return(<>
    <nav className="flex items-center justify-between flex-wrap bg-white py-5 lg:px-12 shadow border-solid border-t-2 border-blue-700">
    <ul className="flex w-full flex-wrap items-center h-50 ">
        <li className="text-md font-bold text-blue-700 lg:flex-auto flex-direction: row-reverse">
            <ImageComponent/>
        </li>
    <li className="text-md font-bold text-blue-700 lg:flex-auto">
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
        <li className="text-md font-bold text-blue-700 lg:flex-auto">
        <Dropdown
								label={"ManageUsers"}
								Icon={ChevronDownIcon}
								dropdownItems={dropDownItemsConfig}
							/>
        </li>
        
        </ul>
            
        </nav>
        <Suspense fallback={<div>Loading...</div>}>
        
        <ListComponent text={components}/>
        </Suspense>
        
    </>);
}