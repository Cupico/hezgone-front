import { useContext, useEffect } from "react";
import { Box, Grid, Container} from "@chakra-ui/react";

import { useParams } from "react-router";

import { UserContext } from "../context/User";
import { EventContext } from "../context/Event";

import { socket } from "../api/api";

import { getEvent } from "../api/api";

import MapWrapper from "../Components/Map/MapWrapper";

import UserCard from "../Components/UserCard";

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
    <Box px={"10%"}>
      {Event && Object.keys(Event.eventGlobal).length > 0 && (
        <Box>
          <h1>Nom de l'évènement : {Event.eventGlobal.name}</h1>
          <h2>Code : {Event.eventGlobal.code}</h2>
          <h3>
            Organisateur : {Event.eventGlobal.members[0].name}{" "}
            {Event.eventGlobal.members[0].last_name}{" "}
          </h3>
          <h4>Adresse : {Event.eventGlobal.adresse} </h4>
          <h5>Heure : {Event.eventGlobal.time} </h5>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent={"space-between"}
            flexWrap='wrap'
          >
            <Box
              display="flex"
              flexDirection="column"
              height="450px"
              width="450px"
              mb={{base: 10, lg: 0}}
            >
              <MapWrapper />
            </Box>

            <Grid templateColumns={`repeat(${Event.eventGlobal.members.length}, 1fr)`} gap={20}>
              {Event.eventGlobal.members.map((e, i) => (
                <UserCard key={i} user={e} />
              ))}
            </Grid>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default ActualEvent;
