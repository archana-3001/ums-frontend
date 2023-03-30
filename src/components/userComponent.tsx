import { useState, useRef, useContext, useEffect } from "react";
import { Table } from "@delhivery/orca-ui";
import Link from "next/link";

interface userProperties{
    id?: JSX.Element,
    properties?:{
    FirstName?: JSX.Element,
    LastName?: JSX.Element,
    email?: string,
    Password?: JSX.Element,
    IsActive?: JSX.Element,
    IsAdmin?: JSX.Element,
    PhoneNumber?: string,
    Username?: string
    },
    delete?:  JSX.Element,
}

export const UserComponent=(props: any)=>{   
    const [users, setUsers]=useState<userProperties[]>(props.user);
    const deleteuser=async(id: string)=>{
        // const token=JSON.parse(localStorage.getItem('token') || "");
        const fetchOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                    Accept: "application/json",
                    // Authorization: 'Bearer '+ token.token
            },
            body: JSON.stringify({
                IsDeleted: true
            })
        };
        console.log("here put request ", id);
        await fetch('http://localhost:8004/api/users'+'/'+id, fetchOptions).then(val=>{
            console.log(val);
        }).catch(err=>{
            console.log(err);
        });
    }
    useEffect(()=>{
        console.log(props.user);
        const userD = props?.user.map((element: any) => {
            const data: userProperties = {
              id: <> <Link href = {{pathname:`usersConfig/${element.id}`, query: {user: `{
                    "Username" : "${element.properties.Username}" ,
                    "FirstName" : "${element.properties.FirstName}" ,
                    "LastName" : "${element.properties.LastName}" ,
                    "email" : "${element.properties.email}" ,
                    "Password" : "${element.properties.Password}" ,
                    "IsActive" : "${element.properties.IsActive}" , 
                    "IsAdmin" : "${element.properties.IsAdmin}" ,
                    "PhoneNumber" : "${element.properties.PhoneNumber}"
    
                    }`
              }}}>{element.id}
              </Link></>,
              properties: {
                Username: element.properties.Username,
                FirstName: <>{element.properties.FirstName}</>,
                LastName: <>{element.properties.LastName}</>,
                email: element.properties.email,
                Password: <>{element.properties.Password}</>,
                IsActive: <>
                    {...(element.properties.IsActive)}</>,
                IsAdmin: <>{element.properties.IsAdmin}</>,
                PhoneNumber: element.properties.PhoneNumber
              },
              delete: <button className="bg-red-600 px-4 py-2 rounded-md text-md text-white" onClick={()=>{deleteuser(element.id)}}>Delete</button>,
            };
            return data;
          });
          // Append new user data to existing users state using a functional update
          setUsers(prevUsers => [ ...userD]);
        }, [props.user]);
        
        return(
            
            <>
            {/* {console.log(users)} */}
            <div>
            <Table
      columnConfig={[
    
            {
            dataKey: 'id',
            label: 'id'
            },
            {
            dataKey: 'properties.Username',
            label: 'username'
            },{
          dataKey: 'properties.FirstName',
          label:  'firstName'
            },
           
        {
          dataKey: 'properties.LastName',
          label: 'lastName'
        },{
            dataKey: 'properties.email',
            label: 'email'
        },{
            dataKey: 'properties.PhoneNumber',
            label: 'phone_number'
        },{
            dataKey: 'properties.Password',
            label: 'password'
        },{
            dataKey: 'properties.IsActive',
            label: 'isActive'
        },{
            dataKey: 'properties.IsAdmin',
            label: 'isAdmin'
        }, {
            dataKey: 'delete',
            label: 'delete'
        }
    
      ]}
      dataArray={users}
    />
            </div>
            
            </>
            
        
        );
    }