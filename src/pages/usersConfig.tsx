import UserForm from "@/components/user-form";
import { Layout } from "@/components/layout";
import { ManageUsers } from "@/components/manageUsers";
import { useEffect, useState } from "react";


export default function UsersConfig() {
  const [authorized, setAuthorized]=useState<String | Boolean>(false);
  useEffect(()=>{
    const tok=localStorage.getItem("token")|| "";
    if(tok!=""){
      const token = JSON.parse(tok);
      console.log(token);
      setAuthorized(token.Is_admin);
    }
  }, [])
    return (
        <>
        <Layout>
          {
          (authorized)?
          <ManageUsers/>:<></>
          }
        </Layout>
          
         
        </>
      )
}
