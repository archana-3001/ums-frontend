import { AdminContext } from "@/state/RefreshContext";
import Router from "next/router";
import { useRef, useState, useContext } from "react";
const url='http://localhost:8000/api/auth/login'

export default function LoginForm() {
  const inputUsername= useRef<HTMLInputElement>(null);
  const inputPassword=useRef<HTMLInputElement>(null);
  const {IsAdmin, setAdmin}=useContext(AdminContext);

  const [status, setStatus]=useState("");
  const loginuser=async(event: any)=>{
    event?.preventDefault();
    console.log("login request....");
    const formData={
      Username: inputUsername.current?.value || "",
      Password: inputPassword.current?.value || ""
    }
    const fetchOptions = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
      },
      body: JSON.stringify(formData),
  };
    const response=await fetch(url, fetchOptions);
    const json=await response.json();
    setStatus(json.msg);
    console.log(json);
    if(json.Is_admin){
      setAdmin(json.Is_admin);
      const ctime= new Date();
      // console.log(ctime);
      const token = localStorage.setItem("token", JSON.stringify(json));
      const endTime=localStorage.setItem("expire", JSON.stringify(ctime));
      Router.push('/usersConfig');
    }
    
  }
    return (
        <>
         <div className="overflow:hidden grid h-screen place-items-center">

  <div className="flex items-center justify-center h-screen">
    
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <input className="appearance-none bg-transparent border-2 border-t-transparent border-r-transparent border-l-transparent border-b-indigo-600 text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" name="Username" placeholder="Username" ref={inputUsername}/>
      <input className="appearance-none bg-transparent border-2 border-t-transparent border-r-transparent border-l-transparent border-b-indigo-600 text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="Password" name="Password" placeholder="Password" ref={inputPassword}/>
      <button className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={loginuser}>Login</button>
      {
      (IsAdmin)?<h2>{status} </h2>:<>try login again!!!</>
    }
    </form>
    
  </div>
  
</div>

        </>
    );
}