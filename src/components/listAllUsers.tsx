import { UserContext } from "@/state/RefreshContext";
import { useContext, useEffect, useRef, useState } from "react";
import { UserComponent } from "./userComponent";

export const ListAllUsers=()=>{
    const {user, setUser}=useContext<any>(UserContext);
    return(
        <>
        list all users 
        <table className="users-lists-table">
        
                <thead className="users-list-heading">
                <tr>
                    <td className="user-item">
                        id
                    </td>
                    <td className="user-item">
                        username
                    </td>
                    <td className="user-item">
                        first name
                    </td>
                    <td className="user-item">
                        last name
                    </td>
                    <td className="user-item">
                        email
                    </td>
                    <td className="user-item">
                        password
                    </td>
                    <td className="user-item">
                        phone number
                    </td>
                    <td className="user-item">
                        active
                    </td>
                    <td className="user-item">
                        admin
                    </td>
                    <td className="user-item">
                        update
                    </td>
                    <td className="user-item">
                        update-all
                    </td>
                    <td className="user-item">
                        delete
                    </td>
                    </tr>
                </thead>

        

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
        
        
        </table>
        </>
        
    
    );
}