import { useState, useRef, useContext } from "react";
import {FaEdit} from  'react-icons/fa';
import uuid from 'uuid';
import {RefreshContext} from "@/state/RefreshContext";
import { tokenToString } from "typescript";


interface FormData{
    First_name?: string,
    Last_name?: string,
    email?: string,
    Password?: string,
    Is_active?: string | boolean,
    Is_admin?: string | boolean,
    Phone_number?: string
}

const formData: FormData={
    First_name: "",
    Last_name: "",
    email: "",
    Is_active: "",
    Is_admin: "",
    Phone_number: "",
    Password: ""
}


const url='http://localhost:8000/api/users';

export const UserComponent=(props: any)=>{
    const {refresh, setRefresh}=useContext(RefreshContext);
    const [editfirst, setEditfirst]=useState(false);
    const [editlast, setEditlast]=useState(false);
    const [editpass, setEditpass]=useState(false);
    const [editmail, setEditmail]=useState(false);
    const [editactive, setEditactive]=useState(false);
    const [editadmin, setEditadmin]=useState(false);
    const [editphone, setEditphone]=useState(false);

    const inputFirst_name = useRef<HTMLInputElement>(null);
    const [active, setActive] =useState("");
    const [admin, setAdmin]=useState("");
    const init_users=()=>{
        formData.First_name= ""
        formData.Last_name= ""
        formData.Password= ""
        formData.email=""
        formData.Phone_number=""
        formData.Is_active=""
        formData.Is_admin=""
    }

    const saveEditfirst=async(event: any)=>{
        event?.preventDefault();
        // console.log(inputReference.current?.name);
        const key=inputFirst_name.current?.id;
        const val=inputFirst_name.current?.value;
        console.log(key, val, typeof(key), typeof(val));
        formData.First_name=val;
        // console.log(formData);
        setEditfirst(false);
        
    }
    const saveEditlast=async(event: any)=>{
        event?.preventDefault();
        // console.log(inputReference.current?.name);
        const key=inputFirst_name.current?.id;
        const val=inputFirst_name.current?.value;
        console.log(key, val, typeof(key), typeof(val));
        formData.Last_name=val;
        // console.log(formData);
        setEditlast(false);
    }
    
    const saveEditemail=async(event: any)=>{
        event?.preventDefault();
        // console.log(inputReference.current?.name);
        const key=inputFirst_name.current?.id;
        const val=inputFirst_name.current?.value;
        console.log(key, val, typeof(key), typeof(val));
        formData.email=val;
        // console.log(formData);
        setEditmail(false);
    }

    const saveEditpass=async(event: any)=>{
        event?.preventDefault();
        // console.log(inputReference.current?.name);
        const key=inputFirst_name.current?.id;
        const val=inputFirst_name.current?.value;
        console.log(key, val, typeof(key), typeof(val));
        formData.Password=val;
        // console.log(formData);
        setEditpass(false);
    }

    const saveEditphone=async(event: any)=>{
        event?.preventDefault();
        // console.log(inputReference.current?.name);
        const key=inputFirst_name.current?.id;
        const val=inputFirst_name.current?.value;
        console.log(key, val, typeof(key), typeof(val));
        formData.Phone_number=val;
        // console.log(formData)
        setEditphone(false);
    }

    const saveEditactive=async(event: any)=>{
        event?.preventDefault();
        // console.log(inputReference.current?.name);
        if(active!=""){
            console.log(active);
            formData.Is_admin=admin
        }
        // console.log(formData);
        setEditactive(false);

    }
    const saveEditadmin=async(event: any)=>{
        event?.preventDefault();
        // console.log(inputReference.current?.name)
        if(admin!=""){
            console.log(admin, typeof(admin));
            formData.Is_admin=admin
        }
        // console.log(formData);
        setEditadmin(false);
    }

    const deleteuser=async(id: string)=>{
        const token=JSON.parse(localStorage.getItem('token') || "");
        const fetchOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: 'Bearer '+ token.token
            },
        };
        console.log("here put request ", id);
        await fetch(url+'?ID='+id, fetchOptions).then(val=>{
            console.log(val);
            init_users();
            setRefresh(!refresh);
        }).catch(err=>{
            console.log(err);
        });
        init_users();
        
    }


    const update=async(id: string)=>{
        // event?.preventDefault();
        console.log(id, formData);
        if(formData.First_name==""){
            delete formData.First_name;
        }
        if(formData.Last_name=="" ){
            delete formData.Last_name;
        }
        if(formData.Password=="" ){
            delete formData.Password;
        }
        if(formData.email==""){
            delete formData.email;
        }
        if(formData.Phone_number=="" ){
            delete formData.Phone_number;
        }
        if(formData.Is_active==""){
            delete formData.Is_active;
        }
        if(formData.Is_admin==""){
            delete formData.Is_admin;
        }
        const token=JSON.parse(localStorage.getItem('token') || "");
    
        const fetchOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: 'Bearer '+ token.token
                
            },
            body: JSON.stringify(formData),
        };
        console.log("here", typeof(id), fetchOptions.body);
        await fetch(url+'?ID='+id, fetchOptions).then(val=>{
            console.log(val);
            setRefresh(!refresh);
            init_users();
        }).catch(err=>{
            console.log(err);
        });
        init_users();

    }

    const updateAll=async(id: string)=>{
        const token=JSON.parse(localStorage.getItem('token') || "");
        const fetchOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: 'Bearer '+ token.token
            },
            body: JSON.stringify(formData),
        };
        console.log("here put request ", id, fetchOptions.body);
        await fetch(url+'?ID='+id, fetchOptions).then(val=>{
            console.log(val);
            init_users();
            setRefresh(!refresh);
        }).catch(err=>{
            console.log(err);
        });
        init_users();
        
        
    }

return(<>
        {/* {console.log(props.user)} */}
    <tbody className="users-list" key="{user.id}">
        <tr>
                    <td className="user-item">{(props.user?.id)?.substring(0, 5)}</td>
                    <td className="user-item">{props.user?.username}</td>
                    <td className="user-item">{props.user?.first_name}
                    <FaEdit onClick={()=>{setEditfirst(!editfirst)}}/>
                    {
                        (editfirst)?
                        <form>
                            <input id="First_name" type="text"  placeholder="enter value" ref={inputFirst_name}/>
                            <button  onClick={saveEditfirst}>confirm</button>
                        </form>
                        
                        : <></>
                    }
                    </td>
                    <td className="user-item">{props.user?.last_name}<FaEdit onClick={()=>{setEditlast(!editlast)}}/>
                    {
                        (editlast)?
                        <form>
                            <input id="Last_name" type="text"  placeholder="enter value" ref={inputFirst_name}/>
                            <button  onClick={saveEditlast}>confirm</button>
                        </form>
                        
                        : <></>
                    }
                    </td>
                    <td className="user-item">{props.user?.email}<FaEdit onClick={()=>{setEditmail(!editmail)}}/>
                    {
                        (editmail)?
                        <form>
                            <input id="email" type="email"  placeholder="enter value" ref={inputFirst_name}/>
                            <button  onClick={saveEditemail}>confirm</button>
                        </form>
                        
                        : <></>
                    }
                    </td>
                    <td className="user-item">{"*****"}<FaEdit onClick={()=>{setEditpass(!editpass)}}/>
                    {
                        (editpass)?
                        <form>
                            <input id="Password" type="password"  placeholder="enter value" ref={inputFirst_name}/>
                            <button  onClick={saveEditpass}>confirm</button>
                        </form>
                        
                        : <></>
                    }
                    </td>
                    <td className="user-item">{props.user?.phone_number}<FaEdit onClick={()=>{setEditphone(!editphone)}}/>
                    {
                        (editphone)?
                        <form>
                            <input id="Phone_number" type="text"  placeholder="enter value" ref={inputFirst_name}/>
                            <button  onClick={saveEditphone}>confirm</button>
                        </form>
                        
                        : <></>
                    }</td>
                    <td className="user-item">{String(props.user?.is_active)}<FaEdit onClick={()=>{setEditactive(!editactive)}}/>
                    {
                        (editactive)?
                        <form>
                            yes<input type="checkbox" checked={active === "true"} onChange={() => setActive("true")}/>&ensp;
                            no <input type="checkbox" checked={active === "false"} onChange={() => setActive("false")}/><br/>
                            <button  onClick={saveEditactive}>confirm</button>
                        </form>
                        
                        : <></>
                    }</td>
                    <td className="user-item">{String(props.user?.is_admin)}<FaEdit onClick={()=>{setEditadmin(!editadmin)}}/>
                    {
                        (editadmin)?
                        <form>
                            yes<input type="checkbox" checked={admin=== "true"} onChange={() => setAdmin("true")}/>&ensp;
                            no <input type="checkbox" checked={admin === "false"} onChange={() => setAdmin("false")}/><br/>
                            <button  onClick={saveEditadmin}>confirm</button>
                        </form>
                        
                        : <></>
                    }</td>
                    <td className="user-item">
                        <button onClick={()=>{update(props.user?.id)}}>update</button>
                    </td>
                    <td className="user-item">
                        <button onClick={()=>{updateAll(props.user?.id)}}>update All</button>
                    </td>
                    <td className="user-item">
                        <button onClick={()=>{deleteuser(props.user?.id)}}>delete</button>
                    </td>
                    </tr>
                </tbody>
</>);
}