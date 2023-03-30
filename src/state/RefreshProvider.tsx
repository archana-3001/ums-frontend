import React, {useEffect, useState} from "react";
import {AdminContext, RefreshContext, TokenContext, UserContext} from "./RefreshContext";



const RefreshProvider=({children}: any)=>{
    const [refresh, setRefresh]=useState(false);
    const [user, setUser]=useState<any>({});
    const [IsAdmin, setAdmin]=useState(false);
    const [token, setToken]=useState<any>({});
    
    return(
        <AdminContext.Provider value={{IsAdmin, setAdmin}}>
            <RefreshContext.Provider value={{ refresh, setRefresh }}>
            <UserContext.Provider value={{ user, setUser }}>
                <TokenContext.Provider value={{token, setToken}}>
                {children}
                </TokenContext.Provider>
            
            </UserContext.Provider>
            
        </RefreshContext.Provider>
        </AdminContext.Provider>
        
    )
}

export default RefreshProvider;