import UserForm from "./user-form";
import UserUpdate from "./user-update";
import { useState } from 'react'; 
import { ListComponent } from "./listComponet";
import { ListAllUsers } from "./listAllUsers";

export const ManageUsers=()=>{
    const [components, setComponents] = useState(<UserForm/>); 

const createUsers=()=>{
    console.log("create users");
    setComponents(<UserForm/>);

}

const updateUsers=()=>{
    console.log("update users")
    setComponents(<ListAllUsers/>);
}
    return(<>
    <nav className="user-bar">
            <ul className="user-content">
                <li className="user-list">
                    <button className="user-link" onClick={createUsers}>Create users </button>
                </li>
                <li className="user-list">
                    <button className="user-link" onClick={updateUsers}>Update users</button>
                </li>
            </ul>
        </nav>
        <ListComponent text={components}/>
    </>);
}