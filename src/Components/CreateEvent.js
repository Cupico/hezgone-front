import { useState, useContext } from "react";
import { Button, Input, Box } from "@chakra-ui/react";

import { createEvent } from "../api/api";
import { socket } from "../api/api";
import { UserContext } from "../context/User";

function CreateEvent() {

  const [infosEvent, setInfosEvent] = useState({name: ""});
  const User = useContext(UserContext);

  const infoEvent = (e) => {
    setInfosEvent({ ...infosEvent, [e.target.name]: e.target.value });
  };

  const handleCreateEvent = () => {

    createEvent(infosEvent, User.userGlobal._id)
    .then((res) => {
        let event = res.event;
        // Context.setUserGlobal({...Context.userGlobal, event: event});
        socket.emit("room", event.code);
        socket.emit("users", User.userGlobal._id);
    })
    .catch((err) => console.log(err))
  }

  return (
    <Box mb={6}>
      <Input
        name={"name"}
        value={infosEvent.name}
        onChange={infoEvent}
        placeholder="Nom de l'évènement"
        type={"text"}
      />
      <Button mt={2} onClick={handleCreateEvent}>Créer un évènement</Button>
    </Box>
  );
}

export default CreateEvent;
