import { useState, useContext } from "react";
import { Button, Input, Box } from "@chakra-ui/react";

import { socket } from "../api/api";
import { joinEvent } from "../api/api";

import { StateStoreContext } from "../context/context";


function JoinEvent() {

  const [codeEvent, setCodeEvent] = useState({code: ""});
  const Context = useContext(StateStoreContext);

  const handleCodeEvent = (e) => {
    setCodeEvent({ [e.target.name]: e.target.value });
  };

  const handleJoinEvent = () => {
    joinEvent(codeEvent, Context.globalState.id)
    .then((res) => {
        let event = res.event;
        Context.setGlobalState({...Context.globalState, event: event});
        socket.emit("room", event.code);
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
