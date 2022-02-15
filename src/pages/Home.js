import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../context/User";
// import { EventContext } from "../context/Event";

import { Box, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import Hero from "../Components/Hero";

import CreateEvent from "../Components/CreateEvent";
import JoinEvent from "../Components/JoinEvent";
import EventCard from "../Components/EventCard";


function Home() {
  const User = useContext(UserContext);
  // const Event = useContext(EventContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (User.userGlobal._id === "" || User.userGlobal._id === undefined) {
      navigate("connexion");
    }
  }, [User]);

  return (
    <Box maxW="7xl" mx={'auto'} pt={5} mb={100} px={{ base: 2, sm: 12, md: 17 }}>
      <Hero />
      <CreateEvent />
      <JoinEvent />

        <Heading
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          textAlign="center"
        >
          <Text as={"h2"} position={"relative"}>
            Vos évènements
          </Text>
          <br />
        </Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        {User.userGlobal.events &&
          User.userGlobal.events.length > 0 &&
          User.userGlobal.events.map((e, i) => <EventCard key={i} event={e} />)}
      </SimpleGrid>
    </Box>
  );
}

export default Home;
