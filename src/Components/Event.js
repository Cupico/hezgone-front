import { useEffect, useContext } from "react";
import { Box } from "@chakra-ui/react";

import { StateStoreContext } from "../context/context";

function Event() {
  const Context = useContext(StateStoreContext);

  console.log(Context);

  return (
    <Box>
      <h1>Nom de l'évènement : {Context.globalState.event.name}</h1>
      <h2>Code : {Context.globalState.event.code}</h2>
      <h3>Organisateur : {Context.globalState.event.members[0].name} {Context.globalState.event.members[0].last_name} </h3>
      {Context.globalState.event.members.map((e) => <p>{e.name}</p>)}
    </Box>
  );
}

export default Event;
