import { useState, useRef } from "react";
import {FaEdit} from  'react-icons/fa';
import uuid from 'uuid';

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
    const [editfirst, setEditfirst]=useState(false);
    const [editlast, setEditlast]=useState(false);
    const [editpass, setEditpass]=useState(false);
    const [editmail, setEditmail]=useState(false);
    const [editactive, setEditactive]=useState(false);
    const [editadmin, setEditadmin]=useState(false);
    const [editphone, setEditphone]=useState(false);
    const [uattribute, setuAttribute]=useState<string | boolean>("");
    const inputFirst_name = useRef<HTMLInputElement>(null);
    
    const init_users=()=>{
        formData.First_name= props.user.first_name,
        formData.Last_name= props.user.last_name,
        formData.Password= props.user.password,
        formData.email=props.user.email,
        formData.Phone_number=props.user.phone_number,
        formData.Is_active=props.user.is_active,
        formData.Is_admin=props.user.is_admin
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
        const key=inputFirst_name.current?.id;
        const val=inputFirst_name.current?.checked;
        console.log(key, val, typeof(key), typeof(val));
        formData.Is_active=val;
        // console.log(formData);
        setEditactive(false);
    }
    const saveEditadmin=async(event: any)=>{
        event?.preventDefault();
        // console.log(inputReference.current?.name);
        const key=inputFirst_name.current?.id;
        const val=inputFirst_name.current?.checked;
        console.log(key, val, typeof(key), typeof(val));
        formData.Is_admin=val;;
        // console.log(formData);
        setEditadmin(false);
    }

    const update=async(id: string)=>{
        // event?.preventDefault();
        console.log(id);
        if(formData.First_name=="" || formData.First_name==props.user.first_name){
            delete formData.First_name;
        }
        if(formData.Last_name=="" || formData.Last_name==props.user.last_name){
            delete formData.Last_name;
        }
        if(formData.Password=="" || formData.Password==props.user.password){
            delete formData.Password;
        }
        if(formData.email=="" || formData.email==props.user.email){
            delete formData.email;
        }
        if(formData.Phone_number=="" || formData.Phone_number==props.user.phone_number){
            delete formData.Phone_number;
        }
        if(formData.Is_active==props.user.is_active || formData.Is_active==""){
            delete formData.Is_active;
        }
        if(formData.Is_admin==props.user.is_admin || formData.Is_admin==""){
            delete formData.Is_admin;
        }
        const fetchOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(formData),
        };
        console.log("here", typeof(id), fetchOptions.body);
        const response = await fetch(url+'?ID='+id, fetchOptions).then(val=>{
            console.log(val);
            init_users();
        }).catch(err=>{
            console.log(err);
        });
        init_users();

    }

    const updateAll=async(id: string)=>{
        const fetchOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(formData),
        };
        console.log("here put request ", id, fetchOptions.body);
        const response = await fetch(url+'?ID='+id, fetchOptions).then(val=>{
            console.log(val);
            init_users();
        }).catch(err=>{
            console.log(err);
        });
        init_users();
        
        
    }

return(<>
    <tr className="users-list" key="{user.id}">
                    <td className="user-item">{(props.user.id).substring(0, 5)}</td>
                    <td className="user-item">{props.user.username}</td>
                    <td className="user-item">{props.user.first_name}
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
                    <td className="user-item">{props.user.last_name}<FaEdit onClick={()=>{setEditlast(!editlast)}}/>
                    {
                        (editlast)?
                        <form>
                            <input id="Last_name" type="text"  placeholder="enter value" ref={inputFirst_name}/>
                            <button  onClick={saveEditlast}>confirm</button>
                        </form>
                        
                        : <></>
                    }
                    </td>
                    <td className="user-item">{props.user.email}<FaEdit onClick={()=>{setEditmail(!editmail)}}/>
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
                    <td className="user-item">{props.user.phone_number}<FaEdit onClick={()=>{setEditphone(!editphone)}}/>
                    {
                        (editphone)?
                        <form>
                            <input id="Phone_number" type="text"  placeholder="enter value" ref={inputFirst_name}/>
                            <button  onClick={saveEditphone}>confirm</button>
                        </form>
                        
                        : <></>
                    }</td>
                    <td className="user-item">{String(props.user.is_active)}<FaEdit onClick={()=>{setEditactive(!editactive)}}/>
                    {
                        (editactive)?
                        <form>
                            <input id="Is_active" type="checkbox"  placeholder="enter value" ref={inputFirst_name}/>
                            <button  onClick={saveEditactive}>confirm</button>
                        </form>
                        
                        : <></>
                    }</td>
                    <td className="user-item">{String(props.user.is_active)}<FaEdit onClick={()=>{setEditadmin(!editadmin)}}/>
                    {
                        (editadmin)?
                        <form>
                            <input id="Is_admin" type="checkbox"  placeholder="enter value" ref={inputFirst_name}/>
                            <button  onClick={saveEditadmin}>confirm</button>
                        </form>
                        
                        : <></>
                    }</td>
                    <td className="user-item">
                        <button onClick={()=>{update(props.user.id)}}>update</button>
                    </td>
                    <td className="user-item">
                        <button onClick={()=>{updateAll(props.user.id)}}>update All</button>
                    </td>

                </tr>
</>);
}