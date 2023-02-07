import { useRef, useState } from "react";
const url='http://localhost:8000/api/auth/login'

export default function LoginForm() {
  const inputUsername= useRef<HTMLInputElement>(null);
  const inputPassword=useRef<HTMLInputElement>(null);
  const [authorized, setAuthorized]=useState(false);
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
    setAuthorized(json.Is_admin);
    if(json.Is_admin){
      const ctime= new Date();
      // console.log(ctime);
      const token = localStorage.setItem("token", JSON.stringify(json));
      const endTime=localStorage.setItem("expire", JSON.stringify(ctime));
    }
  }
    return (
        <>
         <div id="login-form">
  <h2 className="header">Login</h2>
  <div>
    <form>
      <input type="text" name="Username" placeholder="Username" ref={inputUsername}/>
      <input type="Password" name="Password" placeholder="Password" ref={inputPassword}/>
      <button type="submit" onClick={loginuser}>Login</button>
    </form>
    
  </div>
  
</div>
{
      status
    }
        </>
    );
}