import { useContext, useEffect } from "react";
import { Box, Grid, Avatar, Text, Heading, Badge, Flex, SimpleGrid, Center } from "@chakra-ui/react";
import {BsFillGeoAltFill, BsLink, BsFillCalendarWeekFill, BsEyeFill, BsMusicNoteBeamed, BsFillWalletFill} from 'react-icons/bs'
import { BiDrink, BiCar } from "react-icons/bi";
import { useParams } from "react-router";

import { UserContext } from "../context/User";
import { EventContext } from "../context/Event";
import { ChatContext } from "../context/Chat";

import { socket } from "../api/api";

import MapWrapper from "../Components/Map/MapWrapper";

import UserCard from "../Components/UserCard";
import Chats from "../Components/Chats";

function ActualEvent() {
  const room = useParams();

  const User = useContext(UserContext);
  const Event = useContext(EventContext);
  const Chat = useContext(ChatContext);

  useEffect(() => {
    socket.on("message", function (data) {
      Chat.setChatGlobal(data);
    });

    // Enter in room
    socket.emit("room", { room: room.id, user: User.userGlobal._id });

    // Get CHAT
    socket.emit("chat", { room: room.id || Event.eventGlobal.code });

    return () => {
      socket.off("message");
      socket.off("room");
      socket.off("chat");
    };
  }, [Event.eventGlobal.code, room.id]);

  return (
    <Box>
      <Chats />

      {Event && Object.keys(Event.eventGlobal).length > 0 && (
        <Box m={6}>
          <Box p={0} display="flex" justifyContent={"space-between"} mb={5}>
            <Box>
              <Heading fontWeight={"bold"} fontSize={{ base: "4xl", sm: "4xl", md: "5xl" }} mt={4}>
                      {Event.eventGlobal.name}
              </Heading>
              <BsFillGeoAltFill style={{display: "initial", color: "#A7DACE"}} /> Paris
            </Box>
            <Box height='100%' p={4} width={"100px"} style={{textAlign: "center"}}>
              <Box fontWeight={'bold'} fontSize={'2xl'} height='100%' pt={4} pb={4} bg={"#69CEB7"} style={{textAlign: "center"}} rounded={10} >
                <BsFillCalendarWeekFill style={{color: "#fff", display: 'initial'}} />
                <Heading fontWeight={"500"} color={'#fff'} mt={-3}>05</Heading>
                <Text color={'#fff'} fontSize={'md'} mt={-2}>Fev.</Text>
              </Box>
              <BsLink fontSize={'24px'} style={{color:'#69CEB7', display: 'initial'}}  />
            </Box>
          </Box>
          <Heading fontWeight={"bold"} fontSize={{ base: "xl"}} mb={2}>
            Invités
          </Heading>
          <Flex mb={5}>
            <Box height={'50px'} width={'50px'} bg={'#69CEB7'} rounded={'50%'} style={{border: '3px solid #fff'}}></Box>
            <Box height={'50px'} width={'50px'} bg={'#69CEB7'} rounded={'50%'} style={{border: '3px solid #fff'}} ml={-3}></Box>
            <Box height={'50px'} width={'50px'} bg={'#69CEB7'} rounded={'50%'} style={{border: '3px solid #fff', textAlign: "center"}} ml={-3}><BsEyeFill style={{color: "#fff", display: 'initial', marginTop:'14px'}} /></Box>
          </Flex>
          <SimpleGrid columns={2} spacingY={'20px'} spacingX={'10px'} >
            <Center height={'150px'} width={'150px'} boxShadow='0px 0px 10px rgba(0, 0, 0, 0.2)' rounded={'lg'}><BsMusicNoteBeamed  /></Center>
            <Center height={'150px'} width={'150px'} boxShadow='0px 0px 10px rgba(0, 0, 0, 0.2)' rounded={'lg'}><BsFillWalletFill /></Center>
            <Center height={'150px'} width={'150px'} boxShadow='0px 0px 10px rgba(0, 0, 0, 0.2)' rounded={'lg'}><BiDrink /></Center>
            <Center height={'150px'} width={'150px'} boxShadow='0px 0px 10px rgba(0, 0, 0, 0.2)' rounded={'lg'}><BiCar /></Center>
          </SimpleGrid>




          <Box p={0} mb={14}>
            <Box
              display="flex"
              flexDirection="column"
              w="50%"
              paddingRight={10}
              paddingY={2}
            >
              <Box display="flex" alignItems={"center"} marginBottom={8}>
                <Badge colorScheme="purple" fontSize={"1.5rem"} marginLeft="auto" marginTop={2}>
                  {Event.eventGlobal.code}
                </Badge>
              </Box>

              <Box display="flex" alignItems={"center"} marginBottom={8}>
                <Avatar
                  name={`${Event.eventGlobal.members[0].name} ${Event.eventGlobal.members[0].last_name}`}
                  src="https://bit.ly/broken-link"
                  mr={8}
                />
                <Text
                  mr={20}
                >{`${Event.eventGlobal.members[0].name} ${Event.eventGlobal.members[0].last_name}`}</Text>
              </Box>

              <Box
                display="flex"
                flexDirection="column"
                height="450px"
                width="100%"
              >
                <MapWrapper />
              </Box>
            </Box>

            <Box w="50%" paddingLeft={10} paddingY={0}>
              <Grid
                templateColumns={`repeat(${Event.eventGlobal.members.length}, 1fr)`}
                gap={20}
              >
                {Event.eventGlobal.members.map((e, i) => (
                  <UserCard key={i} user={e} />
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default ActualEvent;
