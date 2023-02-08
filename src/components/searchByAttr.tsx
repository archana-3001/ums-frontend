import { useContext, useRef, useState } from "react";
import { UserComponent } from "./userComponent";
const url='http://localhost:8000/api/users';
import { UserContext } from "@/state/RefreshContext";
import { Dropdown } from "flowbite";


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

export const SearchByAttr=()=>{
    
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


    const [active, setActive] =useState("");
    const [admin, setAdmin]=useState("");

    const {user, setUser}=useContext<any>(UserContext);

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
            const token=JSON.parse(localStorage.getItem('token') || "");
            const fetchOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: 'Bearer ' + token.token
                },
            };
            const response=await fetch(newurl, fetchOptions);
            if(response.status==404){
                setUser([]);
            }else{
            const json: userProperties[]=await response.json();
            console.log(json)
            var arr: userProperties[]=[]
            Object.values(json).forEach((data: any)=>{
                    arr.push(data);
            })
            setUser(arr);
            }
            
        }
        getAllUsers();
    }

    return(<>
    
    <div className="shadow-md sm:rounded-lg">
    <input className="appearance-none bg-transparent border-4 border-b-indigo-600 text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="username" ref={inputUsername}/>
    <input className="appearance-none bg-transparent border-4 border-b-indigo-600 text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="id" ref={inputID} />
    <input className="appearance-none bg-transparent border-4 border-b-indigo-600 text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="first name"  ref={inputFirst_name}/>
    <input className="appearance-none bg-transparent border-4 border-b-indigo-600 text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="last name" ref={inputLast_name} />
    <label className="text-indigo-700">active</label>
    &ensp; <input className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" checked={active === "true"} onChange={() =>{ if(active=="true"){
        setActive("")
    } 
    else{setActive("true")}}}/> <label className="text-gray-700" htmlFor="Is_active">yes</label>&ensp;
    
    <input className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" checked={active === "false"} onChange={() => {
     if(active=="false"){
            setActive("");
        }else{
        setActive("false")}}
        }/> <label className="text-gray-700" htmlFor="Is_active">no </label>&ensp;&ensp;
    <label className="text-indigo-700" >admin</label>
    &ensp; <input className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" checked={admin=== "true"} onChange={() => {
        if(admin=="true"){
            setAdmin("");
        }else{
        setAdmin("true")}}}/> <label className="text-gray-700"  htmlFor="Is_active">yes</label>&ensp;
    <input className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" checked={admin === "false"} onChange={() => {
        if(admin=="false"){
            setAdmin("");
        }else{
        setAdmin("false")}
    }}/> <label className="text-gray-700"  htmlFor="Is_admin">no </label>&ensp;&ensp;

    <button className="bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-full" onClick={searchAtt}>search</button>
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

    </div>
    
    </>)
}