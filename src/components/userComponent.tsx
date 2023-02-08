import { useState, useRef, useContext } from "react";
import {FaCheck, FaClipboardCheck, FaEdit} from  'react-icons/fa';
import {RefreshContext} from "@/state/RefreshContext";



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
            formData.Is_active=active
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
        const token=JSON.parse(localStorage.getItem('token') || "");
        console.log(id, formData);
        if(formData.First_name!="" && formData.Last_name!="" && formData.Is_active!="" && formData.Phone_number!="" && formData.Is_admin!="" && formData.Password!="" && formData.email!=""){
            //make put request
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
            // init_users();
        }
        else{
            if(formData.First_name==""){
                delete formData.First_name
            }
            if(formData.Last_name==""){
                delete formData.Last_name
            }
            if(formData.Is_active==""){
                delete formData.Is_active
            }
            if(formData.Is_admin==""){
                delete formData.Is_admin
            }
            if(formData.Password==""){
                delete formData.Password
            }
            if(formData.Phone_number==""){
                delete formData.Phone_number
            }
            if(formData.email==""){
                delete formData.email
            }
        const fetchOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: 'Bearer '+ token.token
            },
            body: JSON.stringify(formData),
        };
        console.log("here patch request", fetchOptions.body);
        await fetch(url+'?ID='+id, fetchOptions).then(val=>{
            console.log(val);
            setRefresh(!refresh);
            init_users();
        }).catch(err=>{
            console.log(err);
        });
        // init_users();
    }
        

    }


return(<>
        {/* {console.log(props.user)} */}
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4">{(props.user?.id)?.substring(0, 5)}</td>
                    <td className="px-6 py-4">{props.user?.username}</td>
                    <td className="px-6 py-4">{props.user?.first_name}
                    <FaEdit onClick={()=>{setEditfirst(!editfirst)}}/>
                    {
                        (editfirst)?
                        <form>
                            <input className="appearance-none bg-transparent border-1 border-t-transparent border-l-transparent border-b-indigo-600 text-gray-700 mr-1 py-1 px-1 leading-tight focus:outline-none" id="First_name" type="text"  placeholder="enter value" ref={inputFirst_name}/>
                            <button  onClick={saveEditfirst}>confirm</button>
                        </form>
                        
                        : <></>
                    }
                    </td>
                    <td className="px-6 py-4">{props.user?.last_name}<FaEdit onClick={()=>{setEditlast(!editlast)}}/>
                    {
                        (editlast)?
                        <form>
                            <input className="appearance-none bg-transparent border-1 border-t-transparent border-l-transparent border-b-indigo-600 text-gray-700 mr-1 py-1 px-1 leading-tight focus:outline-none" id="Last_name" type="text"  placeholder="enter value" ref={inputFirst_name}/>
                            <button  onClick={saveEditlast}>confirm</button>
                        </form>
                        
                        : <></>
                    }
                    </td>
                    <td className="px-6 py-4">{props.user?.email}<FaEdit onClick={()=>{setEditmail(!editmail)}}/>
                    {
                        (editmail)?
                        <form>
                            <input className="appearance-none bg-transparent border-1 border-t-transparent border-l-transparent border-b-indigo-600 text-gray-700 mr-1 py-1 px-1 leading-tight focus:outline-none" id="email" type="email"  placeholder="enter value" ref={inputFirst_name}/>
                            <button  onClick={saveEditemail}>confirm</button>
                        </form>
                        
                        : <></>
                    }
                    </td>
                    <td className="px-6 py-4">{"*****"}<FaEdit onClick={()=>{setEditpass(!editpass)}}/>
                    {
                        (editpass)?
                        <form>
                            <input className="appearance-none bg-transparent border-1 border-t-transparent border-l-transparent border-b-indigo-600 text-gray-700 mr-1 py-1 px-1 leading-tight focus:outline-none" id="Password" type="password"  placeholder="enter value" ref={inputFirst_name}/>
                            <button  onClick={saveEditpass}>confirm</button>
                        </form>
                        
                        : <></>
                    }
                    </td>
                    <td className="px-6 py-4">{props.user?.phone_number}<FaEdit onClick={()=>{setEditphone(!editphone)}}/>
                    {
                        (editphone)?
                        <form>
                            <input className="appearance-none bg-transparent border-1 border-t-transparent border-l-transparent border-b-indigo-600 text-gray-700 mr-1 py-1 px-1 leading-tight focus:outline-none" id="Phone_number" type="text"  placeholder="enter value" ref={inputFirst_name}/>
                            <button  onClick={saveEditphone}>confirm</button>
                        </form>
                        
                        : <></>
                    }</td>
                    <td className="px-6 py-4">{String(props.user?.is_active)}<FaEdit onClick={()=>{setEditactive(!editactive)}}/>
                    {
                        (editactive)?
                        <form>
                            <input className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" checked={active === "true"} onChange={() => {
                                if(active=="true"){
                                    setActive("")
                                }else{
                                setActive("true")}}}/><label className="text-gray-700"  htmlFor="Is_active">yes</label>&ensp;
                            <input className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" checked={active === "false"} onChange={() => {
                                if(active=="false"){
                                    setActive("")
                                }else{
                                setActive("false")}}}/><label className="text-gray-700"  htmlFor="Is_active">no</label><br/>
                            <button  onClick={saveEditactive}>confirm</button>
                        </form>
                        
                        : <></>
                    }</td>
                    <td className="px-6 py-4">{String(props.user?.is_admin)}<FaEdit onClick={()=>{setEditadmin(!editadmin)}}/>
                    {
                        (editadmin)?
                        <form>
                            <input className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" checked={admin=== "true"} onChange={() => {
                                if(admin=="true"){
                                    setAdmin("");
                                }else{
                                    setAdmin("true")}}}/><label className="text-gray-700"  htmlFor="Is_admin">yes</label>&ensp;
                            <input className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" checked={admin === "false"} onChange={() => {
                                if(admin=="false"){
                                    setAdmin("");
                                }else{
                                setAdmin("false")}}}/><label className="text-gray-700"  htmlFor="Is_admin">no</label><br/>
                            <button  onClick={saveEditadmin}>confirm</button>
                        </form>
                        
                        : <></>
                    }</td>
                    <td className="px-6 py-4">
                        <button onClick={()=>{update(props.user?.id)}}>update</button>
                    </td>
                    <td className="px-6 py-4">
                        <button onClick={()=>{deleteuser(props.user?.id)}}>delete</button>
                    </td>
                    </tr>
                
</>);
}