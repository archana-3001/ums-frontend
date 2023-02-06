import React, {useEffect, useState} from "react";
import {RefreshContext, UserContext} from "./RefreshContext";



const RefreshProvider=({children}: any)=>{
    const [refresh, setRefresh]=useState(false);
    const [user, setUser]=useState<any>({});
    
    return(
        <RefreshContext.Provider value={{ refresh, setRefresh }}>
            <UserContext.Provider value={{ user, setUser }}>
            {children}
            </UserContext.Provider>
            
        </RefreshContext.Provider>
    )
}

export default RefreshProvider;