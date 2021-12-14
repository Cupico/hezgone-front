import React, { useState, useEffect } from "react";
import { createContext } from "react";

export const UserContext = createContext();

const user = JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : {};

export const GlobalUser = ({ children }) => {


  const [userGlobal, setUserGlobal] = useState(user);

  useEffect(() => {

    localStorage.setItem("user", JSON.stringify(userGlobal));

  }, [userGlobal])



  return (
    <UserContext.Provider value={{ userGlobal, setUserGlobal }}>
      {children}
    </UserContext.Provider>
  );
};

export default GlobalUser;
