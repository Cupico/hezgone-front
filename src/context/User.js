import React, { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext();

export const GlobalUser = ({ children }) => {
  const [userGlobal, setUserGlobal] = useState({});


  return (
    <UserContext.Provider value={{ userGlobal, setUserGlobal }}>
      {children}
    </UserContext.Provider>
  );
};

export default GlobalUser;
