import { useContext, useEffect } from "react";
import { Box } from "@chakra-ui/react";

import { useParams } from "react-router";

import { UserContext } from "../context/User";
import { EventContext } from "../context/Event";

import { socket } from "../api/api";

import { getEvent } from "../api/api";

function ActualEvent() {
  const event_id = useParams();

  const User = useContext(UserContext);
  const Event = useContext(EventContext);

  useEffect(() => {
    socket.on("event", function (data) {
      Event.setEventGlobal(data);
      console.log("event emitted : ", data);
    });

    if (User.userGlobal._id) {
      socket.emit("users", User.userGlobal._id);
    }

    socket.on("user", function (data) {
      User.setUserGlobal(data);
    });

    getEvent(event_id.id)
      .then((res) => {
        const response = res.event;
        // Event.setEventGlobal(response)
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
        <div>
          <h1>Nom de l'évènement : {Event.eventGlobal.name}</h1>
          <h2>Code : {Event.eventGlobal.code}</h2>
          <h3>
            Organisateur : {Event.eventGlobal.members[0].name}{" "}
            {Event.eventGlobal.members[0].last_name}{" "}
          </h3>
          <div style={{ display: "flex", flexDirection: "column" }}>
            participant :
            {Event.eventGlobal.members.map((e, i) => (
              <p key={i} style={{ marginRight: "100px" }}>
                {e.name}, online:{" "}
                {e.online === true ? "connecté" : "déconnecté"}
              </p>
            ))}
          </div>
        </div>
      )}
    </Box>
  );
}

export default ActualEvent;
