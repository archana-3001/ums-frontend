import { useRef, useState } from "react";
import { ListAllUsers } from "./listAllUsers";
import { UserComponent } from "./userComponent";
const url='http://localhost:8000/api/users';
import { ListComponent } from "./listComponet";


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

export const SearchByAttr=(props: any)=>{
    
    interface FormData{
        ID?: string,
        First_name?: string,
        Last_name?: string,
        Is_active?: boolean | string,
        Is_admin?: boolean | string,
        Username?: string
    }
    const inputID=useRef<HTMLInputElement>(null)
    const inputFirst_name = useRef<HTMLInputElement>(null);
    const inputLast_name=useRef<HTMLInputElement>(null);
    const inputUsername = useRef<HTMLInputElement>(null);

    const [components, setComponents]=useState(<></>);

    const [active, setActive] =useState("");
    const [admin, setAdmin]=useState("");

    const [users, setUsers]=useState<userProperties[]>([]);

    const searchAtt=()=>{
        console.log(inputID.current?.value);
        console.log(inputFirst_name.current?.value);
        console.log(inputLast_name.current?.value);
        console.log(inputUsername.current?.value);
        console.log("admin: ",admin, " , active: ", active)
        const filterUser: FormData={
            First_name:inputFirst_name.current?.value || "",
            Last_name: inputLast_name.current?.value || "",
            ID: inputID.current?.value||"",
            Username: inputUsername.current?.value || "",
            Is_active: active,
            Is_admin: admin
        }   
        let newurl=url+'?';
        if(filterUser.First_name!=""){
            if(newurl!=url){
                newurl=newurl+'&'
            }
            newurl=newurl+'First_name='+`'`+filterUser.First_name+`'`
        }
        if(filterUser.ID!=""){
            if(newurl!=url){
                newurl=newurl+'&'
            }
            newurl=newurl+'ID='+filterUser.ID;
        }
        if(filterUser.Last_name!=""){
            if(newurl!=url){
                newurl=newurl+'&'
            }
            newurl=newurl+'Last_name='+`'`+filterUser.Last_name+`'`;
        }
        if(filterUser.Username!=""){
            if(newurl!=url){
                newurl=newurl+'&'
            }
            newurl=newurl+'Username='+`'${String(filterUser.Username)}'`;
        }
        if(filterUser.Is_admin!=""){
            if(newurl!=url){
                newurl=newurl+'&'
            }
            newurl=newurl+'Is_admin='+filterUser.Is_admin;
        }
        if(filterUser.Is_active!=""){
            if(newurl!=url){
                newurl=newurl+'&'
            }
            newurl=newurl+'Is_active='+filterUser.Is_active;
        }
        console.log(filterUser);
        console.log("here get request with filter", newurl);
        const getAllUsers=async ()=>{
            const response=await fetch(newurl);
            const json: userProperties[]=await response.json();
            // console.log(json);
            var arr: userProperties[]=[]
            Object.values(json).forEach((data:any)=>{
                data.forEach((d: any)=>{
                    // console.log(d);
                    arr.push(d);
                })
                
                // setUsers([...arr]);
            })
            // console.log(arr);
            setUsers(arr);
            setComponents(<ListAllUsers users={users}/>);
        }
        getAllUsers();
    }

    return(<>
    <input placeholder="username" ref={inputUsername}/><br/>
    <input placeholder="id" ref={inputID} /><br/>
    <input placeholder="first name"  ref={inputFirst_name} /><br/>
    <input placeholder="last name" ref={inputLast_name} /><br/>
    active
    &ensp; yes<input type="checkbox" checked={active === "true"} onChange={() => setActive("true")}/>&ensp;
    no <input type="checkbox" checked={active === "false"} onChange={() => setActive("false")}/><br/>
    admin
    &ensp; yes<input type="checkbox" checked={admin=== "true"} onChange={() => setAdmin("true")}/>
    no <input type="checkbox" checked={admin === "false"} onChange={() => setAdmin("false")}/>

    <button onClick={searchAtt}>search</button>
    <ListComponent text={components}/>

    </>)
}