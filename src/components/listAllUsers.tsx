import { UserContext } from "@/state/RefreshContext";
import { useContext, useEffect, useRef, useState } from "react";
import { UserComponent } from "./userComponent";

export const ListAllUsers=()=>{
    const {user, setUser}=useContext<any>(UserContext);
    return(
        <>
        <div className=" shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
            <th scope="col" className="px-6 py-3">
                    id
            </th>
            <th scope="col" className="px-6 py-3">
                    username
            </th>
            <th scope="col" className="px-6 py-3">
                    first name
            </th>
            <th scope="col" className="px-6 py-3">
                    last name
            </th>
            <th scope="col" className="px-6 py-3">
                    email
            </th>
            <th scope="col" className="px-6 py-3">
                    password
            </th>
            <th scope="col" className="px-6 py-3">
                    contact
            </th>
            <th scope="col" className="px-6 py-3">
                    active
            </th>
            <th scope="col" className="px-6 py-3">
                    admin
            </th>
            <th scope="col" className="px-6 py-3">
                    update
            </th>
            <th scope="col" className="px-6 py-3">
                    delete
            </th>
            </tr>
        </thead>


        <tbody>
{
    
    user.map((usr: Object)=>{

        // console.log("from listAllUsers",usr)
        return(
        <>
        <UserComponent user={usr}  />
        
        </>
        )
        
    })    
    
}
</tbody>


</table>
        </div>
        
        </>
        
    
    );
}