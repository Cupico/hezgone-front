import React, { useState } from "react";
import { createContext } from "react";

export const RepartitionContext = createContext();

export const GlobalRepartition = ({ children }) => {
  const [repartitionGlobal, setRepartitionGlobal] = useState([]);

  return (
    <RepartitionContext.Provider value={{ repartitionGlobal, setRepartitionGlobal }}>
      {children}
    </RepartitionContext.Provider>
  );
};

export default GlobalRepartition;
