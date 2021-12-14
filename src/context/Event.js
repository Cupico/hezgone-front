import React, { useState, useEffect } from "react";
import { createContext } from "react";

export const EventContext = createContext();

const event = JSON.parse(localStorage.getItem("event")) ? JSON.parse(localStorage.getItem("event")) : {};

export const GlobalEvent = ({ children }) => {
  const [eventGlobal, setEventGlobal] = useState(event);


  useEffect(() => {

    localStorage.setItem("event", JSON.stringify(eventGlobal));

  }, [eventGlobal])

  return (
    <EventContext.Provider value={{ eventGlobal, setEventGlobal }}>
      {children}
    </EventContext.Provider>
  );
};

export default GlobalEvent;
