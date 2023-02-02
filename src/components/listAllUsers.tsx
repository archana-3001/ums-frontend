import { useEffect, useRef, useState } from "react";


import { UserComponent } from "./userComponent";

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

export const ListAllUsers=()=>{
    const [users, setUsers]=useState<userProperties[]>([]);

    useEffect(()=>{
        const url='http://localhost:8000/api/users';
        const getAllUsers=async ()=>{
            const response=await fetch(url);
            const json: []=await response.json();
            var arr: userProperties[]=[]
            Object.values(json).forEach(data=>{
                // console.log(data);
                arr.push(data);
                setUsers([...arr]);
            })
            setUsers([...arr]);
            // console.log(users);
        }
        getAllUsers();
        
    }, []);
    
    

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
            
                users.map(user=>{
                // console.log(user.id, typeof(user.id))
                return(
                <>
                <UserComponent user={user} />
                </>
                )
                
            })    
            
        }
        
        
        </table>
        </>
        
    
    );
}