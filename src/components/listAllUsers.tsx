import { useEffect, useRef, useState } from "react";
import { isPropertySignature } from "typescript";


import { UserComponent } from "./userComponent";



export const ListAllUsers=(props: any)=>{
    return(
        <>
        list all users 
        <table>
        
                <th className="users-list-heading">
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
                </th>
        

        {
            
            props.users.map((usr: Object)=>{

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