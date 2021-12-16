import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../context/User";
// import { EventContext } from "../context/Event";

import { Box, Heading, Text } from "@chakra-ui/react";
import Hero from "../Components/Hero";

import CreateEvent from "../Components/CreateEvent";
import JoinEvent from "../Components/JoinEvent";
import EventCard from "../Components/EventCard";


function Home() {
  const User = useContext(UserContext);
  // const Event = useContext(EventContext);
  let navigate = useNavigate();

  // useEffect(() => {
  //   if (Event.eventGlobal.code && User.userGlobal._id) {
  //     // socket.emit("leaveRoom", {
  //     //   room: Event.eventGlobal.code,
  //     //   user: User.userGlobal._id,
  //     // });
  //   }
  // }, []);

  useEffect(() => {
    if (User.userGlobal._id === "" || User.userGlobal._id === undefined) {
      navigate("connexion");
    }
  }, [User]);

  return (
    <Box m={6}>
      <Hero />
      <CreateEvent />
      <JoinEvent />

      <Box w="75%" margin="0 auto">
        <Heading
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          textAlign="center"
        >
          <Text as={"span"} position={"relative"}>
            Vos évènements
          </Text>
          <br />
        </Heading>
      </Box>

      <Box
        display="flex"
        flexWrap="wrap"
        flexDirection="row"
        justifyContent={"space-between"}
        w="75%"
        margin="0 auto"
        mt={12}
        pb={6}
      >
        {User.userGlobal.events &&
          User.userGlobal.events.length > 0 &&
          User.userGlobal.events.map((e, i) => <EventCard key={i} event={e} />)}
      </Box>
    </Box>
  );
}

export default Home;
