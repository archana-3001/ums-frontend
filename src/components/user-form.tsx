import { RefreshContext } from "@/state/RefreshContext";
import Link from "next/link";
import { useRef, useState } from "react";
import { FaArrowCircleLeft, FaCheckCircle, FaCircleNotch } from "react-icons/fa";

export default function UserForm() {
    const inputFirstName = useRef<HTMLInputElement>(null);
    const inputLastName=useRef<HTMLInputElement>(null);
    const inputUsername= useRef<HTMLInputElement>(null);
    const inputemail=useRef<HTMLInputElement>(null);
    const inputIsActive = useRef<HTMLInputElement>(null);
    const inputIsAdmin=useRef<HTMLInputElement>(null);
    const inputPhone_number = useRef<HTMLInputElement>(null);
    const inputPassword=useRef<HTMLInputElement>(null);
    const form=useRef<any>();
    const [firstName, setFirstName]=useState("");
    const [lastName, setLastName]=useState("");
    const [username, setUsername]=useState("");
    const [phonenumber, SetPhoneNumber]=useState("");
    const [password, setPassword]=useState("");
    const [email, setEmail]=useState("");
    const [createstatus, setCreateStatus]=useState<any>("");

    const formData={
        First_name: "",
        Last_name: "",
        Username: "",
        email: "",
        Is_active: "",
        Is_admin: "",
        Phone_number: "",
        Password: ""
    }

    const url='http://localhost:8000/app/test-arc/api/users';

    const createUser=async (event: any)=>{
        event?.preventDefault();       
        let token=localStorage.getItem("APItoken") || "";
            // console.log(inputFirstName.current?.value,"\n", 
            // inputIsActive.current?.checked , "\n" ,inputIsAdmin.current?.checked, "\n",inputLastName.current?.value, 
            
            //     inputPassword.current?.value, inputUsername.current?.value, inputemail.current?.value, inputPhone_number.current?.value);
            formData.First_name= inputFirstName.current?.value || "",
            formData.Last_name= inputLastName.current?.value || "",
            formData.Username=inputUsername.current?.value || "",
            formData.Password=inputPassword.current?.value || "",
            formData.Is_active=String(inputIsActive.current?.checked || "true"),
            formData.Is_admin=String(inputIsAdmin.current?.checked || "true"),
            formData.Phone_number=inputPhone_number.current?.value || "",
            formData.email=inputemail.current?.value || "",
            
            console.log(formData, typeof(formData))
            // const token=JSON.parse(localStorage.getItem('token') || "");
            const fetchOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    // Authorization: 'Bearer '+ token.token
                    
                },
                body: JSON.stringify(formData),
            };
            console.log(fetchOptions.body);
            const response = await fetch(url, fetchOptions).then(val=>{
                // alert('user created');
                if(val.status==201){
                    setCreateStatus('user created successfully!!');
                }else{
                    // console.log(val.json());
                    setCreateStatus(val.statusText+"("+val.status+")");
                    
                }
                console.log(val);
            }).catch(err=>{
                console.log(err);
            });

    }
    return (
        <>
        <div className="grid h-screen place-items-center">
        <form className="w-full max-w-lg" ref={form}>
  <div className="flex flex-wrap -mx-2 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
        First Name
      </label>
      <input onChange={()=>{setFirstName(inputFirstName.current?.value || "")}} ref={inputFirstName} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="First name"/>
        {document.getElementById("grid-first-name")?.click && firstName.length<=0 && <p className="text-red-500 text-xs italic">Please fill out First Name</p>}
    </div>
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
        Last Name
      </label>
      <input  onChange={()=>{setLastName(inputLastName.current?.value || "")}} ref={inputLastName} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-last-name" type="text" placeholder="Last name"/>
      {document.getElementById("grid-last-name")?.click && lastName.length<=0 &&<p className="text-red-500 text-xs italic">Please fill out Last Name</p>}
    </div>
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-user-name">
        Username
      </label>
      <input  ref={inputUsername} onChange={()=>{setUsername(inputUsername.current?.value || "")}}  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-user-name" type="text" placeholder="Username"/>
      {document.getElementById("grid-user-name")?.click && username.length<=0 &&<p className="text-red-500 text-xs italic">Please fill out Username</p>}
    </div>
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
        Email
      </label>
      <input  ref={inputemail} onChange={()=>{setEmail(inputemail.current?.value || "")}} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-email" type="email" placeholder="email"/>
      {document.getElementById("grid-email")?.click && email.length<=0 &&<p className="text-red-500 text-xs italic">Please fill out Email</p>}
    </div>
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-phone-number">
        Phone Number
      </label>
      <input  ref={inputPhone_number} onChange={()=>{SetPhoneNumber(inputPhone_number.current?.value || "")}} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-phone-number" type="text" placeholder="Phone Number"/>
      {document.getElementById("grid-phone-number")?.click &&  phonenumber.length<=0 &&<p className="text-red-500 text-xs italic">Please fill out Phone Number</p>}
    </div>
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
        Password
      </label>
      <input  ref={inputPassword} onChange={()=>{setPassword(inputPassword.current?.value || "")}} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-password" type="password" />
      {document.getElementById("grid-password")?.click && password.length<=0 &&<p className="text-red-500 text-xs italic">Please fill out Password</p>}
    </div>
        </div>
        <div className="md:flex md:items-center">
    <div className="md:w-1/3"></div>
    <div className="md:w-2/3">
      <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button"  onClick={createUser}>
        Create
      </button>
    </div>
    
  </div>
                
           
            </form>
            {
        (createstatus!="")?
            <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
                <div className="bg-white px-16 py-14 rounded-md text-center">
                  <h1 className="text-xl mb-4 font-bold text-slate-500">{createstatus}</h1>
                  {
                    (createstatus=="user created successfully!!")?<button className="bg-green-500 px-4 py-2 rounded-md text-md text-white" onClick={()=>{ form.current?.reset(), setCreateStatus("")}}>ok</button>:<button className="bg-red-500 px-4 py-2 rounded-md text-md text-white" onClick={()=>setCreateStatus("")}>ok</button>
                  }
                  
                </div>
              </div>
          : <></>
          
      }
        </div>
     
        </>
    )
}