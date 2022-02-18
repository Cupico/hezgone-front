import { useContext, useEffect } from "react";
import { Box, Grid, Avatar, Text, Heading, Badge } from "@chakra-ui/react";

import { useParams } from "react-router";

import { UserContext } from "../context/User";
import { EventContext } from "../context/Event";
import { ChatContext } from "../context/Chat";

import { socket } from "../api/api";

import MapWrapper from "../Components/Map/MapWrapper";

import UserCard from "../Components/UserCard";
import Chats from "../Components/Chats";

function ActualEvent() {
  const room = useParams();

  const User = useContext(UserContext);
  const Event = useContext(EventContext);
  const Chat = useContext(ChatContext);

  useEffect(() => {
    socket.on("message", function (data) {
      Chat.setChatGlobal(data);
    });

    // Enter in room
    socket.emit("room", { room: room.id, user: User.userGlobal._id });

    // Get CHAT
    socket.emit("chat", { room: room.id || Event.eventGlobal.code });

    return () => {
      socket.off("message");
      socket.off("room");
      socket.off("chat");
    };
  }, [Event.eventGlobal.code, room.id]);

  return (
    <Box px={"5%"}>
      <Chats />

      {Event && Object.keys(Event.eventGlobal).length > 0 && (
        <Box>
          <Box p={0} display="flex" justifyContent={"space-between"} mb={14}>
            <Box
              display="flex"
              flexDirection="column"
              w="50%"
              paddingRight={10}
              paddingY={2}
            >
              <Box display="flex" alignItems={"center"} marginBottom={8}>
                <Heading
                  fontWeight={600}
                  fontSize={{ base: "2xl", sm: "4xl", md: "5xl" }}
          
                >
                  {Event.eventGlobal.name}
                </Heading>

                <Badge colorScheme="purple" fontSize={"1.5rem"} marginLeft="auto" marginTop={2}>
                  {Event.eventGlobal.code}
                </Badge>
              </Box>

              <Box display="flex" alignItems={"center"} marginBottom={8}>
                <Avatar
                  name={`${Event.eventGlobal.members[0].name} ${Event.eventGlobal.members[0].last_name}`}
                  src="https://bit.ly/broken-link"
                  mr={8}
                />
                <Text
                  mr={20}
                >{`${Event.eventGlobal.members[0].name} ${Event.eventGlobal.members[0].last_name}`}</Text>
              </Box>

              <Box
                display="flex"
                flexDirection="column"
                height="450px"
                width="100%"
              >
                <MapWrapper />
              </Box>
            </Box>

            <Box w="50%" paddingLeft={10} paddingY={0}>
              <Grid
                templateColumns={`repeat(${Event.eventGlobal.members.length}, 1fr)`}
                gap={20}
              >
                {Event.eventGlobal.members.map((e, i) => (
                  <UserCard key={i} user={e} />
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default ActualEvent;
