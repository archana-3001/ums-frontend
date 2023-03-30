import { useEffect, useState, useContext } from "react";
import { Label,FormHeader, Switch, Input, Button, DottedPill } from "@delhivery/orca-ui";
import { RefreshContext } from "@/state/RefreshContext";

export const UserUpdateForm=(props: any)=>{
    const [FirstName, setFirstName]=useState(props.user?.FirstName);
    const [LastName, setLastName]=useState(props.user?.LastName);
    const [Password, setPassword]=useState(props.user?.Password);
    const [active, setActive]=useState(props.user?.IsActive);
    const [admin, setAdmin]=useState(props.user?.IsAdmin);
    const {refresh, setRefresh}=useContext(RefreshContext);
    useEffect(()=>{
            setActive(props.user?.IsActive);
            setAdmin(props.user?.IsAdmin);
            setPassword(props.user?.Password);
            setLastName(props.user?.LastName);
            setFirstName(props.user?.FirstName);
    },[props?.user])
    const saveUserDetails=async(event:any)=>{
        event?.preventDefault();
        console.log(props.id);
        const formData:any={}
        if(FirstName.length>3 && FirstName!=props.user.FirstName){
            formData['First_name']=FirstName
        }
        if(LastName.length>3 && FirstName!=props.user.FirstName){
            formData['Last_name']=FirstName
        }
        if(Password.length>8 && Password!=props.user.Password){
            formData['Password']=Password
        }
        if(active!=props.user.IsActive){
            formData['Is_active']=Boolean(active)
        }
        if(admin!=props.user.IsAdmin){
            formData['Is_admin']=Boolean(admin)
        }
        console.log(Object.keys(formData).length);
        if(Object.keys(formData).length>0){
            const update=async()=>{
            const fetchOptions = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                        Accept: "application/json",
                        // Authorization: 'Bearer '+ token.token
                },
                body: JSON.stringify(formData),
            };
            console.log("here patch request", fetchOptions.body);
            const url='http://localhost:8004/api/users/'+props?.id;
            console.log(url)
            await fetch(url,fetchOptions).then(val=>{
                console.log(val);
                console.log("user details updated!!");
            }).catch(err=>{
                console.log(err);
            });
            }
            setRefresh(!refresh)
;            await update();
            console.log("user details updated!!");
        }else{
            console.log("nothing to update");
            alert("please make some changes to save");
        }
        

        
    }
 
    return(
        <>
         <div className="grid h-screen place-items-center">
        <form className="w-full max-w-lg">
        <FormHeader description="Fill details to update user" title="User Details"/>
        <Label><p>Username : {props.id}</p></Label>
        <Label><p>Username : {props.user?.Username}</p></Label>
        <Label><p>email : {props.user?.email}</p></Label>
        <Label><p>PhoneNumber : {props.user?.PhoneNumber}</p></Label>
        <Label><p>FirstName : <Input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-red-500 rounded py-3 px-3 mb-2 leading-tight focus:outline-none focus:bg-white" value={FirstName} onChange={(e)=>{setFirstName(e.target.value)}}/></p></Label>
        <Label><p>LastName : <Input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-red-500 rounded py-3 px-3 mb-2 leading-tight focus:outline-none focus:bg-white" value={LastName} onChange={(e)=>{setLastName(e.target.value)}}/></p></Label>
        <Label><p>Password : <Input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-red-500 rounded py-3 px-3 mb-2 leading-tight focus:outline-none focus:bg-white" value={Password} onChange={(e)=>{setPassword(e.target.value)}}/></p></Label>
        
        <Label><p>Active : {(active=="true")?<DottedPill className="" size="sm" theme="success"/>:<DottedPill className="" size="sm" theme="casual"/>} {active}<Switch value={active=="true"?true:false} onChange={(e)=>{setActive(String(e)); console.log(String(e))}}/></p></Label>
        <Label><p>Admin : {(admin=="true")?<DottedPill className="" size="sm" theme="success"/>:<DottedPill className="" size="sm" theme="casual"/>} {admin}<Switch value={admin=="true"?true:false}  onChange={(e)=>{setAdmin(String(e)); console.log(String(e))}}/></p></Label>
        <Button className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={(e)=>{
                saveUserDetails(e)
            }}>
            <p>Submit</p></Button><br/>
        </form> 
        </div>
        </>
    )
}