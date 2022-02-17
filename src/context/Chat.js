import React, { useState } from "react";
import { createContext } from "react";

export const ChatContext = createContext();

export const GlobalChat = ({ children }) => {
  const [chatGlobal, setChatGlobal] = useState([]);

  return (
    <ChatContext.Provider value={{ chatGlobal, setChatGlobal }}>
      {children}
    </ChatContext.Provider>
  );
};

export default GlobalChat;
