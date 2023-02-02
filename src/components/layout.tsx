import { Nav } from "./nav";

export const Layout=({children}: any)=>{
    return(<>
    <div>
        <Nav/>
        <div className="container">{children}</div>
    </div>
       
    </>);
}