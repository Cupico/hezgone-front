import { useContext, useEffect, useState } from "react";


import { UserContext } from "../context/User";
import { EventContext } from "../context/Event";
import { ChatContext } from "../context/Chat";

import { socket } from "../api/api";

function Chats() {


  const [text, setText] = useState("");

  const User = useContext(UserContext);
  const Event = useContext(EventContext);
  const Chat = useContext(ChatContext);

  const sendMessage = () => {
    const message = {
      name: User.userGlobal.username,
      message: text,
    };
    socket.emit("chat", { room: Event.eventGlobal.code, message: message });
    setText("");
  };

  const handleText = (e) => {
    setText(e.target.value);
  };

  console.log("CHAT", Chat);

  return (
    <div
      style={{
        position: "fixed",
        width: "30%",
        height: "30%",
        right: "10%",
        bottom: 0,
        boxShadow: "0px 0px 6px 0px",
      }}
    >
      <div
        style={{
          height: "100%",
          position: "relative",
          background: "gray",
        }}
      >
        <p style={{ background: "black", color: "white" }}>
          {Event.eventGlobal.name} chat
        </p>
        <div style={{overflowY: "scroll", height:'70%'}}>
          {Chat &&
            Chat.chatGlobal &&
            Chat.chatGlobal.chat &&
            Chat.chatGlobal.chat.length > 0 &&
            Chat.chatGlobal.chat.map((e, i) => (
              <div key={i}>
                <p>
                  {e.name} : {e.message}
                </p>
              </div>
            ))}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "1",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            paddingBottom: "10px",
          }}
        >
          <input type="text" onChange={handleText} value={text} />
          <button onClick={sendMessage}>send</button>
        </div>
      </div>
    </div>
  );
}

export default Chats;
