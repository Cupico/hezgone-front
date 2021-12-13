import React, { useState } from "react";
import { createContext } from "react";

export const EventContext = createContext();

export const GlobalEvent = ({ children }) => {
  const [eventGlobal, setEventGlobal] = useState({});


  return (
    <EventContext.Provider value={{ eventGlobal, setEventGlobal }}>
      {children}
    </EventContext.Provider>
  );
};

export default GlobalEvent;
