import { useContext } from "react";
import { Box } from "@chakra-ui/react";


import { EventContext } from "../context/Event";

// import { useParams } from "react-router";
// import { UserContext } from "../context/User";

function ActualEvent() {

  // const event_id = useParams();

  // const User = useContext(UserContext);

  const Event = useContext(EventContext);

  console.log("event", Event)

  
  return (
    <Box>
      <h1>Nom de l'évènement : {Event.eventGlobal.name}</h1>
      <h2>Code : {Event.eventGlobal.code}</h2>
      <h3>Organisateur : {Event.eventGlobal.members[0].name} {Event.eventGlobal.members[0].last_name} </h3>
      <div style={{display:"flex"}}> participant : {Event.eventGlobal.members.map((e,i) => <p key={i} style={{marginRight:'10px'}}> {e.name},</p>)}</div>
      <div><p style={{color:"black"}}>LOL</p></div>
    </Box>
  );
}

export default ActualEvent;
