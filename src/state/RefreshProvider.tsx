import React, {useEffect, useState} from "react";
import {AdminContext, RefreshContext, UserContext} from "./RefreshContext";



const RefreshProvider=({children}: any)=>{
    const [refresh, setRefresh]=useState(false);
    const [user, setUser]=useState<any>({});
    const [IsAdmin, setAdmin]=useState(false);
    
    return(
        <AdminContext.Provider value={{IsAdmin, setAdmin}}>
            <RefreshContext.Provider value={{ refresh, setRefresh }}>
            <UserContext.Provider value={{ user, setUser }}>
            {children}
            </UserContext.Provider>
            
        </RefreshContext.Provider>
        </AdminContext.Provider>
        
    )
}

export default RefreshProvider;