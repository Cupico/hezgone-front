import { useContext, useState, useEffect } from "react";

import { UserContext } from "../context/User";
import { EventContext } from "../context/Event";
import { ChatContext } from "../context/Chat";

import { socket } from "../api/api";
import { Box, Avatar, Text, Stack, Input, Button } from "@chakra-ui/react";

import { EmailIcon } from "@chakra-ui/icons";

function Chats() {
  const [text, setText] = useState("");

  const User = useContext(UserContext);
  const Event = useContext(EventContext);
  const Chat = useContext(ChatContext);

  const [chatVisible, setChatVisible] = useState(false);


  const sendMessage = () => {
    const message = {
      id: User.userGlobal._id,
      name: User.userGlobal.name,
      message: text,
    };
    socket.emit("chat", { room: Event.eventGlobal.code, message: message });
    setText("");
  };

  const handleText = (e) => {
    setText(e.target.value);
  };

  const openChat = () => {
    socket.emit("chat", { room: Event.eventGlobal.code });
    setChatVisible((prevState) => !prevState);
  };

  useEffect(() => {
    document.querySelector("#ui-chat").scrollTop =
      document.querySelector("#ui-chat").scrollHeight;
  }, [Chat.chatGlobal.chat]);

  return (
    <Box
      style={{
        position: "fixed",
        width: "100%",
        height: chatVisible ? "50%" : "50px",
        transition: "all 0.5s",
        bottom: 0,
        boxShadow: "0px 0px 6px 0px",
        overflowY: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          position: "relative",
          background: "white",
        }}
      >
        <Box
          height="50px"
          bg={"#69CEB7"}
          display="flex"
          alignItems="center"
          cursor="pointer"
          onClick={openChat}
        >
          <p style={{ paddingLeft: "10px" }}>{Event.eventGlobal.name} Chat</p>
        </Box>

        <div id="ui-chat" style={{ overflowY: "scroll", height: "70%" }}>
          {Chat &&
            Chat.chatGlobal &&
            Chat.chatGlobal.chat &&
            Chat.chatGlobal.chat.length > 0 &&
            Chat.chatGlobal.chat.map((e, i) => (
              <Box
                key={i}
                bg={"white"}
                color="black"
                width={"70%"}
                boxShadow={"md"}
                marginY={6}
                marginLeft={User.userGlobal._id === e.id ? "auto" : 3}
                marginRight={User.userGlobal._id !== e.id ? "auto" : 3}
                padding={3}
              >
                <Box display="flex" alignItems={"center"}>
                  <Avatar
                    size={"sm"}
                    src={"https://bit.ly/tioluwani-kolawole"}
                    alt={"Author"}
                    css={{
                      border: "2px solid white",
                    }}
                    marginRight={2}
                    fontWeight={"light"}
                  />
                  <Text fontWeight={"bold"}>{e.name}</Text>
                </Box>
                <p>{e.message}</p>
              </Box>
            ))}
        </div>
        <Box
          style={{
            display: "flex",
            background: "gray",
          }}
          paddingY={2}
          height={"100%"}
        >
          <Box width={"100%"}>
            <input
              style={{ height: "45px", width: "50%" }}
              value={text}
              onChange={handleText}
            />

            <Button
              leftIcon={<EmailIcon />}
              onClick={sendMessage}
              colorScheme="teal"
              variant="black"
            >
              Envoyer
            </Button>
          </Box>
          {/* <button onClick={sendMessage}>send</button> */}
        </Box>
      </div>
    </Box>
  );
}

export default Chats;
