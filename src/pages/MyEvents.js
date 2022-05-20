import React from "react";
import { useContext } from "react";
import { UserContext } from "../context/User";
import EventCard from "../Components/EventCard";
import { Box, SimpleGrid, Heading, Flex, Spacer, Image, Text } from "@chakra-ui/react";
import HomeButton from "../Components/HomeButton";
import aucun_evenement from "../assets/Aucun_evenement.png";
import aucun_evenement_dark from "../assets/Aucun_evenement_dark.png";
import NavBar from "../Components/Header"


const MyEvents = (props) => {
  const User = useContext(UserContext);
console.log("colormode: " + props.colorMode)
//<Image src={useColorModeValue(aucun_evenement, aucun_evenement_dark)} alt="aucun evenement" />
  return (
    <Box maxW="7xl" m={4}>
      <Heading mb={5} ml={5}>
        Evènements
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        {User.userGlobal.events &&
          User.userGlobal.events.length > 0 &&
          User.userGlobal.events.map((e, i) => <EventCard key={i} event={e} />)}
          {User.userGlobal.events.length === 0 &&
            <>
            {props.colorMode === "dark" ? <Image src={aucun_evenement} alt="aucun evenement" /> :  <Image src={aucun_evenement_dark} alt="aucun evenement" /> }
            <Box mb={5}>
                <Text fontWeight="bold" fontSize="large" align="center">Aucun évenement ici</Text>
                <Text align="center">Tapez l'icône + pour créer ou rejoindre un évenement</Text>
            </Box>
            </>
          }
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
