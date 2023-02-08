import { Layout } from "@/components/layout";
import { ManageUsers } from "@/components/manageUsers";
import { useEffect, useState } from "react";


export default function UsersConfig() {
  const [authorized, setAuthorized]=useState<String | Boolean>(false);
  useEffect(()=>{
    const tok=localStorage.getItem("token")|| "";
    if(tok!=""){
      const token=JSON.parse(tok);
      const time=JSON.parse(localStorage.getItem('expire') || "");
      // console.log(time);
      // console.log(Date.now(), Date.parse(time));
      
      if(tok!=""){
        const token = JSON.parse(tok);
        // console.log(token);
        setAuthorized(token.Is_admin);
      }
      
      if(time!=""){
        const val=(Date.now()-Date.parse(time));
        console.log(val/1000);
        if((val/1000)>=3600){
          console.log(val, "login again");
          localStorage.clear();
        }
      }
    }    
  }, [])
    return (
        <>
  
          {
          (authorized)?
            <ManageUsers/>
          :<><h2>Login to continue</h2></>
          }
          
         
        </>
      )
}
