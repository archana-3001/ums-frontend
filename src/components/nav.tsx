import Link from "next/link"


export const Nav=()=>{
    return(
        <>
        <nav className="nav-bar">
            <ul className="nav-content">
                <li className="nav-list">
                    <Link className="nav-link" href='/'>Login</Link>
                </li>
                <li className="nav-list">
                    <Link className="nav-link" href='/usersConfig'>Manage users</Link>
                </li>
            </ul>
        </nav>
        </>
    )
}