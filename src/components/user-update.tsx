import { useRef } from "react";

export default function UserUpdate() {
    const inputFirst_name = useRef<HTMLInputElement>(null);
    const inputLast_name=useRef<HTMLInputElement>(null);
    const inputemail=useRef<HTMLInputElement>(null);
    const inputIs_active = useRef<HTMLInputElement>(null);
    const inputIs_admin=useRef<HTMLInputElement>(null);
    const inputPhone_number = useRef<HTMLInputElement>(null);
    const inputPassword=useRef<HTMLInputElement>(null);
    interface FormData{
        First_name?: string,
        Last_name?: string,
        email?: string,
        Password?: string,
        Is_active: boolean,
        Is_admin: boolean,
        Phone_number?: string
    }
    
    const url='http://localhost:8000/api/users';
    const updateAllAttributes=async(event: any)=>{
        event?.preventDefault();
        const formData: FormData={
            First_name: "",
            Last_name: "",
            email: "",
            Is_active: false,
            Is_admin: false,
            Phone_number: "",
            Password: ""
        }
        formData.First_name= inputFirst_name.current?.value || "",
        formData.Last_name= inputLast_name.current?.value || "",
        formData.Password=inputPassword.current?.value || "",
        formData.Is_active=inputIs_active.current?.checked || false,
        formData.Is_admin=inputIs_admin.current?.checked || false,
        formData.Phone_number=inputPhone_number.current?.value || "",
        formData.email=inputemail.current?.value || "",   
        console.log(formData)
        const fetchOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(formData),
        };
        console.log("here", fetchOptions.body);
        const response = await fetch(url, fetchOptions).then(val=>{
            console.log(val);
        }).catch(err=>{
            console.log(err);
        });

    }
    const updateSelectedAttributes=async(event: any)=>{
        event?.preventDefault();
        const formData: FormData={
            First_name: "",
            Last_name: "",
            email: "",
            Is_active: false,
            Is_admin: false,
            Phone_number: "",
            Password: ""
        }
        formData.First_name= inputFirst_name.current?.value || "",
        formData.Last_name= inputLast_name.current?.value || "",
        formData.Password=inputPassword.current?.value || "",
        formData.Is_active=inputIs_active.current?.checked || false,
        formData.Is_admin=inputIs_admin.current?.checked || false,
        formData.Phone_number=inputPhone_number.current?.value || "",
        formData.email=inputemail.current?.value || "",     
        console.log(formData)
        if(formData.First_name==""){
            delete formData.First_name;
        }
        if(formData.Last_name==""){
            delete formData.Last_name;
        }
        if(formData.Password==""){
            delete formData.Password;
        }
        if(formData.email==""){
            delete formData.email;
        }
        if(formData.Phone_number==""){
            delete formData.Phone_number;
        }
        const fetchOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(formData),
        };
        console.log("here", fetchOptions.body);
        const response = await fetch(url, fetchOptions).then(val=>{
            console.log(val);
        }).catch(err=>{
            console.log(err);
        });


    }

    return (
        <>
         <form>
                <input id="First_name" type="text" name="First_name"placeholder="First_name" />&ensp;
                <input id="Last_name" type="text" name="Last_name"placeholder="Last_name"/>&ensp;
                <input id="email" type="email" name="email" placeholder="email" />&ensp;
                <input id="Phone_number" type="text" name="Phone_number" placeholder="Phone_number" />&ensp;
                <br/>
                <label htmlFor="Is_active">
                    active
                <input id="Is_active" type="checkbox" name="Is_active" placeholder="Is_active" />
                &ensp;
                </label>
                
                <label htmlFor="Is_admin"> admin
                <input id="Is_admin" type="checkbox" name="Is_admin" placeholder="Is_admin" />
                </label>
                <br/>
                <input type="password"  id="password" name="password" placeholder="Password" />
                <br/>
                <button type="submit" onClick={updateSelectedAttributes}>Update</button> &ensp;
                <button type="submit" onClick={updateAllAttributes}>Update All</button>
            </form>
        </>
    )
}