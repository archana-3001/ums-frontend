import { AdminContext } from "@/state/RefreshContext";
import Router from "next/router";
import { useRef, useState, useContext, useEffect } from "react";
const url='http://localhost:8000/api/auth/login'
import {Button, Input, FormHeader} from "@delhivery/orca-ui";


export  const LoginFormComponent=()=>{
  const [username, setUsername] = useState<string>('');
    const [password, setPassword]=useState<string>('');
  const {IsAdmin, setAdmin}=useContext(AdminContext);
  const [status, setStatus]=useState("Enter details to login");
  const [initialRenderComplete, setInitialRenderComplete] =useState(false);
  
  useEffect(()=>{
    const tok=localStorage.getItem('token') || "";
    if(tok!=""){
      const token=JSON.parse(tok);
      if(token.IsAdmin){
        setAdmin(token.IsAdmin);
      }

    }else{
      setAdmin(false);
    }
    setInitialRenderComplete(true);
  }, [IsAdmin])
  


  const loginuser=async(event: any)=>{
    event?.preventDefault();
    console.log("login request....");
    const formData={
      Username: username,
      Password: password
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
    if(json.IsAdmin){
      setAdmin(json.IsAdmin);
      const ctime= new Date();
      // console.log(ctime);
      const token = localStorage.setItem("token", JSON.stringify(json));
      const endTime=localStorage.setItem("expire", JSON.stringify(ctime));
      // Router.push('/usersConfig');
    }
    
  }

  if(!initialRenderComplete){
      return null;
  }else{
    return (
        <>
        
         <div className="overflow:hidden grid h-screen place-items-center">
  <div className="flex items-center justify-center h-screen">
    
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <FormHeader description="Fill details to login" title="Login"/>
            <Input className="" type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
            <br/><Input className="" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
            <br/><Button className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={(e)=>{
                loginuser
            }}>
            <p>Submit</p></Button><br/>{status}
            
     
            </form>
      {
        (status!="Enter details to login")?
            <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
                <div className="bg-white px-16 py-14 rounded-md text-center">
                  <h1 className="text-xl mb-4 font-bold text-slate-500">{status}</h1>
                  <button className="bg-red-500 px-4 py-2 rounded-md text-md text-white" onClick={()=>{
                    localStorage.clear()
                    setStatus("Enter details to login")}}>Cancel</button>
                  <button className="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold" onClick={()=>{
                    if(IsAdmin){
                      Router.push('/usersConfig');
                    }else{
                      setStatus("Enter details to login")
                    }
                    }}>Ok</button>
                    
                </div>
              </div>
          : <></>
          
      }
  </div>
  
</div>

        </>
    );
  }
}