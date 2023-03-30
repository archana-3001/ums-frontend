import { type } from "os";
import React from "react";


type userProperties={
  user:{
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  isActive: string | boolean,
  isAdmin: string | boolean,
  phone_number: string,
  id: string,
  username: string
  },
  setUser: React.Dispatch<React.SetStateAction<userProperties>>;
}

type tokenProperties={
  token:{
    value: string | undefined,
    generatedAt: number | undefined
  },
  setToken: React.Dispatch<React.SetStateAction<tokenProperties>>;
}

type AdminContextValue={
  IsAdmin: boolean;
  setAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}



type RefreshContextValue = {
    refresh: boolean;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

type UserContextValue={
  user: userProperties,
  setUser: React.Dispatch<React.SetStateAction<userProperties>>;
}

type TokenContextValue={
  token: tokenProperties,
  setToken: React.Dispatch<React.SetStateAction<tokenProperties>>;
}

const UserContext =React.createContext<userProperties | undefined>({
  user:{
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  isActive: "",
  isAdmin: "",
  phone_number: "",
  username: "",
  id: "",
  },
  setUser: ()=>{}

});

const TokenContext=React.createContext<tokenProperties | undefined>({
  token: {
    value: "",
    generatedAt: 0
  }, 
  setToken: ()=>{}
})

const RefreshContext = React.createContext<RefreshContextValue>({
    refresh: false,
    setRefresh: () => {},
  });
  
const AdminContext=React.createContext<AdminContextValue>({
  IsAdmin: false, 
  setAdmin: ()=>{},
})

export { RefreshContext, UserContext, AdminContext, TokenContext};