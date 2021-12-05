import React, { useState } from "react";
import { createContext } from "react";

export const StateStoreContext = createContext();

export const GlobalState = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    name: "",
    last_name: "",
    token: "",
    id: ""
  });


  return (
    <StateStoreContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </StateStoreContext.Provider>
  );
};

export default GlobalState;
