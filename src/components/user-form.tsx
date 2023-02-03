import { useRef } from "react";

export default function UserForm() {
    const inputFirst_name = useRef<HTMLInputElement>(null);
    const inputLast_name=useRef<HTMLInputElement>(null);
    const inputUsername= useRef<HTMLInputElement>(null);
    const inputemail=useRef<HTMLInputElement>(null);
    const inputIs_active = useRef<HTMLInputElement>(null);
    const inputIs_admin=useRef<HTMLInputElement>(null);
    const inputPhone_number = useRef<HTMLInputElement>(null);
    const inputPassword=useRef<HTMLInputElement>(null);

    const formData={
        First_name: "",
        Last_name: "",
        Username: "",
        email: "",
        Is_active: false,
        Is_admin: false,
        Phone_number: "",
        Password: ""
    }
    const url='http://localhost:8000/api/users';

    const createUser=async (event: any)=>{
        event?.preventDefault();       
            // console.log(inputFirst_name.current?.value,"\n", 
            // inputIs_active.current?.checked , "\n" ,inputIs_admin.current?.checked, "\n",inputLast_name.current?.value, 
            //     inputPassword.current?.value, inputUsername.current?.value, inputemail.current?.value, inputPhone_number.current?.value);
            formData.First_name= inputFirst_name.current?.value || "",
            formData.Last_name= inputLast_name.current?.value || "",
            formData.Username=inputUsername.current?.value || "",
            formData.Password=inputPassword.current?.value || "",
            formData.Is_active=inputIs_active.current?.checked || false,
            formData.Is_admin=inputIs_admin.current?.checked || false,
            formData.Phone_number=inputPhone_number.current?.value || "",
            formData.email=inputemail.current?.value || "",
            console.log(formData, typeof(formData))
            const fetchOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(formData),
            };
            console.log(fetchOptions.body);
            const response = await fetch(url, fetchOptions).then(val=>{
                alert('user created');
                console.log(val);
            }).catch(err=>{
                console.log(err);
            });

    }
    return (
        <>
         <form>
                <input id="username" type="text" ref={inputUsername} placeholder="Username" /><br/>
                <input id="First_name" type="text" ref={inputFirst_name} placeholder="First_name" />&ensp;
                <input id="Last_name" type="text" ref={inputLast_name} placeholder="Last_name"/>&ensp;
                <input id="email" type="email" ref={inputemail} placeholder="email" />&ensp;
                <input id="Phone_number" type="text" ref={inputPhone_number} placeholder="Phone_number" />&ensp;
                <br/>
                <label htmlFor="Is_active">
                    active
                <input id="Is_active" type="checkbox" ref={inputIs_active} placeholder="Is_active" />
                &ensp;
                </label>
                
                <label htmlFor="Is_admin"> admin
                <input id="Is_admin" type="radio" ref={inputIs_admin} placeholder="Is_admin" />
                </label>
                <br/>
                <input type="password"  id="password" ref={inputPassword} placeholder="Password" />
                <br/>
                <button type="submit" onClick={createUser}>Create</button>
                <button type="reset">Reset</button>
            </form>
        </>
    )
}