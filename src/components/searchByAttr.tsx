import { useContext, useRef, useState } from "react";
import { UserComponent } from "./userComponent";
const url='http://localhost:8004/app/test-arc/api/users';
import { UserContext } from "@/state/RefreshContext";
import { ErrorBoundary } from 'react-error-boundary';
import { cache } from 'react';


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

export const SearchByAttr=()=>{
    
    interface FormData{
        ID?: string,
        FirstName?: string,
        LastName?: string,
        IsActive?: boolean | string,
        IsAdmin?: boolean | string,
        Username?: string
    }
    const inputID=useRef<HTMLInputElement>(null)
    const inputFirstName = useRef<HTMLInputElement>(null);
    const inputLastName=useRef<HTMLInputElement>(null);
    const inputUsername = useRef<HTMLInputElement>(null);


    const [active, setActive] =useState("");
    const [admin, setAdmin]=useState("");

    const {user, setUser}=useContext<any>(UserContext);
    const [search, updateSearch]=useState<any>(user);
    const searchAtt=()=>{
        // console.log(inputID.current?.value);
        // console.log(inputFirstName.current?.value);
        // console.log(inputLastName.current?.value);
        // console.log(inputUsername.current?.value);
        // console.log("admin: ",admin, " , active: ", active)
        const filterUser: FormData={
            FirstName:inputFirstName.current?.value || "",
            LastName: inputLastName.current?.value || "",
            ID: inputID.current?.value||"",
            Username: inputUsername.current?.value || "",
            IsActive: active,
            IsAdmin: admin
        }   
        let token=localStorage.getItem("APItoken") || "";
        let newurl=url+'?';
        if(filterUser.FirstName!=""){
            if(newurl!=url){
                newurl=newurl+'&'
            }
            newurl=newurl+'FirstName='+`"`+filterUser.FirstName+`"`;
        }
        if(filterUser.ID!=""){
            if(newurl!=url){
                newurl=newurl+'&'
            }
            newurl=newurl+'ID='+`"`+filterUser.ID+`"`;
        }
        if(filterUser.LastName!=""){
            if(newurl!=url){
                newurl=newurl+'&'
            }
            newurl=newurl+'LastName='+`"`+filterUser.LastName+`"`;
        }
        if(filterUser.Username!=""){
            if(newurl!=url){
                newurl=newurl+'&'
            }
            newurl=newurl+'Username='+`"`+filterUser.Username+`"`;
        }
        if(filterUser.IsAdmin!=""){
            if(newurl!=url){
                newurl=newurl+'&'
            }
            newurl=newurl+'IsAdmin='+`"`+admin+`"`;
        }
        if(filterUser.IsActive!=""){
            if(newurl!=url){
                newurl=newurl+'&'
            }
            newurl=newurl+'IsActive='+`"`+active+`"`;
        }
        console.log(filterUser);
        console.log("here get request with filter", newurl);
        const getAllUsers=async ()=>{
            // const token=JSON.parse(localStorage.getItem('token') || "");
            const fetchOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    // Authorization: 'Bearer ' + token.token
                },
            };
            const response=await fetch(newurl, fetchOptions);
            // if(response.status==404){
            //     setUser([]);
            // }else{
            const json=await response.json();
            console.log(json)
            // var arr: userProperties[]=[]
            // Object.values(json).forEach((data: any)=>{
            //         arr.push(data);
            // })
            // setUser(arr);
            // }
            // setUser([...json?.data?.entityInstances]);
            updateSearch([...json?.data.entityInstances]);
            
        }
        getAllUsers();
    }

    return(<>

    <div className="shadow-md sm:rounded-lg">
    <input className="appearance-none bg-transparent border-4 border-b-indigo-600 text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="username" ref={inputUsername}/>
    <input className="appearance-none bg-transparent border-4 border-b-indigo-600 text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="id" ref={inputID} />
    <input className="appearance-none bg-transparent border-4 border-b-indigo-600 text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="first name"  ref={inputFirstName}/>
    <input className="appearance-none bg-transparent border-4 border-b-indigo-600 text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="last name" ref={inputLastName} />
    <label className="text-indigo-700">active</label>
    &ensp; <input className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" checked={active === "true"} onChange={() =>{ if(active=="true"){
        setActive("")
    } 
    else{setActive("true")}}}/> <label className="text-gray-700" htmlFor="IsActive">yes</label>&ensp;
    
    <input className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" checked={active === "false"} onChange={() => {
     if(active=="false"){
            setActive("");
        }else{
        setActive("false")}}
        }/> <label className="text-gray-700" htmlFor="IsActive">no </label>&ensp;&ensp;
    <label className="text-indigo-700" >admin</label>
    &ensp; <input className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" checked={admin=== "true"} onChange={() => {
        if(admin=="true"){
            setAdmin("");
        }else{
        setAdmin("true")}}}/> <label className="text-gray-700"  htmlFor="IsActive">yes</label>&ensp;
    <input className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" checked={admin === "false"} onChange={() => {
        if(admin=="false"){
            setAdmin("");
        }else{
        setAdmin("false")}
    }}/> <label className="text-gray-700"  htmlFor="IsAdmin">no </label>&ensp;&ensp;

    <button className="bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-full" onClick={searchAtt}>search</button>

        <UserComponent user={search}  />            

    </div>

    
    </>)
}

