import React from "react";
import { useContext } from "react";
import { UserContext } from "../context/User";
import EventCard from "../Components/EventCard";
import { Box, SimpleGrid, Heading, Flex, Spacer } from "@chakra-ui/react";
import HomeButton from "../Components/HomeButton";

const MyEvents = () => {
  const User = useContext(UserContext);

  return (
    <Box maxW="7xl" m={4}>
      <Heading mb={5} ml={5}>
        Evènements
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        {User.userGlobal.events &&
          User.userGlobal.events.length > 0 &&
          User.userGlobal.events.map((e, i) => <EventCard key={i} event={e} />)}
      </SimpleGrid>
      <Flex mt="4rem">
        <Spacer />
        <HomeButton />
        <Spacer />
      </Flex>
    </Box>
  );
};

export default MyEvents;
