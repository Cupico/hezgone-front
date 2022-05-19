import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/User";
import { EventContext } from "../context/Event";
import { ChatContext } from "../context/Chat";
import { socket } from "../api/api";
import {
  Box,
  Avatar,
  Text,
  Stack,
  Input,
  Button,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";

import { IoSend } from "react-icons/io5";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
import { BsFillChatLeftDotsFill } from "react-icons/bs";

function HomeButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [text, setText] = useState("");

  const User = useContext(UserContext);
  const Event = useContext(EventContext);
  const Chat = useContext(ChatContext);

  const [chatVisible, setChatVisible] = useState(false);

  console.log("CHAT", Chat.chatGlobal);

  const sendMessage = () => {
    const message = {
      id: User.userGlobal._id,
      name: User.userGlobal.username,
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
    onOpen();
  };

  useEffect(() => {
    if (document.querySelector("#ui-chat")) {
      document.querySelector("#ui-chat").scrollTop =
        document.querySelector("#ui-chat").scrollHeight;
    }
  }, [Chat.chatGlobal.chat]);

  return (
    <>
      <Center
        rounded={"50%"}
        bg={["#69CEB7", "#69CEB7"]}
        width="50px"
        height="50px"
        alignItems="center"
        onClick={() => openChat()}
      >
        <BsFillChatLeftDotsFill size={24} color="#fff" />
      </Center>
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose} size="full">
        <DrawerOverlay />
        <DrawerContent bg={["#1A202C", "#1A202C"]}>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" align="center">
            Chat
          </DrawerHeader>
          <DrawerBody>
            <div
              id="ui-chat"
              style={{
                overflowY: "scroll",
                height: "90%",
                overflowX: "hidden",
              }}
            >
              {Chat &&
                Chat.chatGlobal &&
                Chat.chatGlobal.chat &&
                Chat.chatGlobal.chat.length > 0 &&
                Chat.chatGlobal.chat.map((e, i) => (
                  <Box
                    key={i}
                    bg={"white"}
                    color="black"
                    width={"100%"}
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
            <Box display="flex" height={"50px"} bg={"#1A202C"}>
              <Box width={"100%"} bg={"#1A202C"}>
                <InputGroup>
                  <Input
                    name={"message"}
                    height={"50px"}
                    width={"100%"}
                    value={text}
                    onChange={handleText}
                    color={"#000"}
                    bg={"#fff"}
                  />
                  <InputRightElement width="4rem" height="3rem">
                    <Button onClick={sendMessage}>
                      <IoSend size={32} fill={"69CEB7"} />
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>
              {/* <button onClick={sendMessage}>send</button> */}
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default HomeButton;