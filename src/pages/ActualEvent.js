import { useContext, useEffect } from "react";
import { Box, Text, Avatar, Flex, Badge} from "@chakra-ui/react";

import { useParams } from "react-router";

import { UserContext } from "../context/User";
import { EventContext } from "../context/Event";

import { socket } from "../api/api";

import { getEvent } from "../api/api";

import MapWrapper from "../Components/Map/MapWrapper";

function ActualEvent() {
  const event_id = useParams();

  const User = useContext(UserContext);
  const Event = useContext(EventContext);

  useEffect(() => {
    getEvent(event_id.id)
      .then((res) => {
        const response = res.event;
        socket.emit("room", { room: response.code, user: User.userGlobal._id });
      })
      .catch((err) => console.log(err));

    //   if(Event && Event.eventGlobal && Event.eventGlobal.code)
    //   socket.emit("leaveRoom", {room:Event.eventGlobal.code, user:User.userGlobal._id})
    //   // console.log(socket.id); // undefined
    // });
  }, []);

  return (
    <Box>
      {Event && Object.keys(Event.eventGlobal).length > 0 && (
        <Box>
          <h1>Nom de l'évènement : {Event.eventGlobal.name}</h1>
          <h2>Code : {Event.eventGlobal.code}</h2>
          <h3>
            Organisateur : {Event.eventGlobal.members[0].name}{" "}
            {Event.eventGlobal.members[0].last_name}{" "}
          </h3>
          <h4>
            Adresse : {Event.eventGlobal.adresse}{" "}
          </h4>
          <h5>
          Heure : {Event.eventGlobal.time}{" "}
          </h5>
          <div style={{ display: "flex", flexDirection: "column" }}>
            participant :
            {Event.eventGlobal.members.map((e, i) => (
              <Flex key={i}>
              <Avatar src='https://bit.ly/sage-adebayo' />
              <Box ml='3'>
                <Text fontWeight='bold'>
                    {e.name}
                  <Badge ml='1' colorScheme={e.online === true ? "green" : "red"}>
                  {e.online === true ? "connecté" : "déconnecté"}
                  </Badge>
                </Text>
                <Text fontSize='sm'>UI Engineer</Text>
              </Box>
            </Flex>
            ))}
          </div>

          <Box
            display="flex"
            flexDirection="column"
            height="300px"
            width="700px"
          >
            <MapWrapper />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default ActualEvent;
