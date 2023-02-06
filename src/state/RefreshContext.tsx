import React from "react";


type userProperties={
  user:{
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  is_active: string | boolean,
  is_admin: string | boolean,
  phone_number: string,
  id: string,
  username: string
  },
  setUser: React.Dispatch<React.SetStateAction<userProperties>>;
}

type RefreshContextValue = {
    refresh: boolean;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

type UserContextValue={
  user: userProperties,
  setUser: React.Dispatch<React.SetStateAction<userProperties>>;
}
const UserContext =React.createContext<userProperties | undefined>({
  user:{
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  is_active: "",
  is_admin: "",
  phone_number: "",
  username: "",
  id: "",
  },
  setUser: ()=>{}

});

const RefreshContext = React.createContext<RefreshContextValue>({
    refresh: false,
    setRefresh: () => {},
  });
  

export { RefreshContext, UserContext};