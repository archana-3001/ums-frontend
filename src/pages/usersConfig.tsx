import { getToken } from "@/state/getToken";
import { TokenContext } from "@/state/RefreshContext";
import { useContext, useEffect, useState } from "react";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { FaArrowCircleLeft } from "react-icons/fa";

const ManageUsers=(dynamic(async ()=>  (await import('@/components/manageUsers')).ManageUsers, {
  ssr: false,
})); 

export default function UsersConfig() {

  const [authorized, setAuthorized]=useState<String | Boolean>(false);
  const [initialRenderComplete, setInitialRenderComplete]=useState(false);
  const {token, setToken}=useContext<any>(TokenContext);
  
  // async function getTokens(){
  //   const res=await fetch('https://alpha.preprod.fxtrt.io:443/core/api/v1/aaa/auth/client-credentials', {
  //       method: 'POST',
  //       headers: {
  //           'X-COREOS-REQUEST-ID': '123',
  //           'Content-Type': 'application/json'
  //       },
  // // body: '{\n  "clientId":"2r5hDxz6J2W5a0wMbJFpjwkg6fOGj8C2",\n    "clientSecret":"J7mHrEaq6usqUmPIM6ns94o47Ksw2c5MXbbIMeOKxu-48rbR-cEVjlMj_oF8RwrR",\n  "audience": "platform:app:coreos"\n}',
  //       body: JSON.stringify({
  //           'clientId': '2r5hDxz6J2W5a0wMbJFpjwkg6fOGj8C2',
  //           'clientSecret': 'J7mHrEaq6usqUmPIM6ns94o47Ksw2c5MXbbIMeOKxu-48rbR-cEVjlMj_oF8RwrR',
  //           'audience': 'platform:app:coreos'
  //       })
  //   });
  //   if(res.status==200){
  //     res.text().then(val=>{
  //       const va=JSON.parse(val)
  //       console.log(va)
  //       setToken({
  //         "value": va.data.accessToken, 
  //         "generatedAt": (new Date()).getTime()
  //       })
  //       if(JSON.stringify(token)!="{}"){
  //         localStorage.setItem("APItoken", JSON.stringify({
  //           "token": va.data.accessToken, 
  //           "generatedAt": (new Date()).getTime()
  //         }));
  //       }
  //     })
  //   }
  //   // console.log(res)
    
  // }

  useEffect(()=>{
    // const tok=localStorage.getItem("token")|| "";
    // if(tok!=""){
    //   const token=JSON.parse(tok);
    //   const time=JSON.parse(localStorage.getItem('expire') || "");
    //   // console.log(time);
    //   // console.log(Date.now(), Date.parse(time));
      
    //   if(tok!=""){
    //     const token = JSON.parse(tok);
    //     // console.log(token);
    //     setAuthorized(token.IsAdmin);
    //   }
      
    //   if(time!=""){
    //     const val=(Date.now()-Date.parse(time));
    //     console.log(val/1000);
    //     if((val/1000)>=3600){
    //       console.log(val, "login again");
    //       localStorage.clear();
    //     }
    //   }
    // }    
    
    // // console.log(token)
    // if( localStorage.getItem("APItoken")=="{}" || localStorage.getItem("APItoken")=="" || localStorage.getItem("APItoken")==undefined){
    //     getTokens();
    // }else{
    //     let val: any=localStorage.getItem("APItoken");
    //     if(val!="{}" || val!=""){
    //       val=JSON.parse(val);
    //       console.log(val);
    //       if(val.length>3 && val?.generatedAt+86400<=((new Date()).getTime())){
    //         localStorage.removeItem("APItoken");
    //       }
    //     }
    // }
    setInitialRenderComplete(true);

  }, [token])
  if(initialRenderComplete && typeof(window) !== "undefined"
  ){
    return (
        <>
  
          {/* {
          (authorized)? */}
           <Suspense fallback={<div>Loading...</div>}>
           <ManageUsers/>
           <Link href={`/`}><FaArrowCircleLeft className="text-3xl font-bold text-blue-700"/></Link>
           </Suspense>
            
          {/* : */}
 
         
        </>
 
        )
  }
}
