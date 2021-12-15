import { useState, useContext } from "react";
import { Button, Input, Box } from "@chakra-ui/react";

import { socket } from "../api/api";
import { joinEvent } from "../api/api";

import { UserContext } from "../context/User";

import { useNavigate } from "react-router-dom";


function JoinEvent() {

  const [codeEvent, setCodeEvent] = useState({code: ""});
  const User = useContext(UserContext);

  let navigate = useNavigate();

  const handleCodeEvent = (e) => {
    setCodeEvent({ [e.target.name]: e.target.value });
  };

  const handleJoinEvent = () => {

    joinEvent(codeEvent, User.userGlobal._id)
    .then((res) => {
        let event = res.event;
        socket.emit("room", event.code);
        socket.emit("users", User.userGlobal._id);
        navigate(`event/${event._id}`);
    })
    .catch((err) => console.log(err))
  }

  return (
    <Box>
      <Input
        name={"code"}
        value={codeEvent.code}
        onChange={handleCodeEvent}
        placeholder="Entrez votre code pour rejoindre l'évènement"
        type={"text"}
      />
      <Button mt={2} onClick={handleJoinEvent}>Rejoindre un évènement</Button>
    </Box>
  );
}

export default JoinEvent;
