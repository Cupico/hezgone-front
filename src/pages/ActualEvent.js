import { useState, useContext, useEffect } from "react";
import { Box } from "@chakra-ui/react";

import { useParams } from "react-router";

// import { UserContext } from "../context/User";
import { EventContext } from "../context/Event";

import { socket } from "../api/api";

import { getEvent } from "../api/api";

function ActualEvent() {
  const event_id = useParams();

  // const User = useContext(UserContext);
  const Event = useContext(EventContext);
  

  useEffect(() => {
    getEvent(event_id.id)
      .then((res) => {
        const response = res.event;
        Event.setEventGlobal(response)
        socket.emit("room", response.code);
      })
      .catch((err) => console.log(err));

  }, []);


  return (
    <Box>
      {Event && Object.keys(Event.eventGlobal).length > 0 && (
        <div>
          <h1>Nom de l'évènement : {Event.eventGlobal.name}</h1>
          <h2>Code : {Event.eventGlobal.code}</h2>
          <h3>
            Organisateur : {Event.eventGlobal.members[0].name}{" "}
            {Event.eventGlobal.members[0].last_name}{" "}
          </h3>
          <div style={{ display: "flex" }}>
            participant :
            {Event.eventGlobal.members.map((e, i) => (
              <p key={i} style={{ marginRight: "10px" }}>
                {e.name},
              </p>
            ))}
          </div>
        </div>
      )}
    </Box>
  );
}

export default ActualEvent;
