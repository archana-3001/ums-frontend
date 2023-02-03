import Link from "next/link"
import { useState, useEffect } from "react";


export const Nav=()=>{
    const [authorized, setAuthorized]=useState<String | Boolean>(false);
  useEffect(()=>{
    const tok=localStorage.getItem("token")|| "";
    if(tok!=""){
      const token = JSON.parse(tok);
      console.log(token);
      setAuthorized(token.Is_admin);
    }
  }, [])
    const logout=()=>{
        localStorage.clear();
    }
    return(
        <>
        <nav className="nav-bar">
            <ul className="nav-content">
                <li className="nav-list">
                    <Link className="nav-link" href='/'>Login</Link>
                </li>
                {
                (authorized)?<>
                <li className="nav-list">
                   <Link className="nav-link" href='/usersConfig'>Manage users</Link>
                </li>
                <li className="nav-list">
                <Link className="nav-link" href="/" onClick={logout}>Logout</Link>
                </li>
                </>
                :<></>
                }
                
            </ul>
        </nav>
        </>
    )
}