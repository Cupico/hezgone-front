import { useState, useContext } from "react";
import { Button, Input, Box } from "@chakra-ui/react";

import { createEvent } from "../api/api";

import { StateStoreContext } from "../context/context";

function CreateEvent() {

  const [infosEvent, setInfosEvent] = useState({name: ""});
  const Context = useContext(StateStoreContext);

  const infoEvent = (e) => {
    setInfosEvent({ ...infosEvent, [e.target.name]: e.target.value });
  };

  const handleCreateEvent = () => {
    createEvent(infosEvent, Context.globalState.id)
    .then((res) => {
        let event = res.event;
        Context.setGlobalState({...Context.globalState, event: event});
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
