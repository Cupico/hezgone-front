import { useContext, useEffect, useState } from "react";

import {
  Box,
  Button,
  Grid,
  Avatar,
  Badge,
  Text,
  Heading,
  Spacer,
  Flex,
  SimpleGrid,
  Center,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";

import {
  BsFillGeoAltFill,
  BsLink,
  BsFillCalendarWeekFill,
  BsEyeFill,
  BsMusicNoteBeamed,
} from "react-icons/bs";
import { BiDrink, BiCar, BiTimeFive } from "react-icons/bi";
import { FaWallet } from "react-icons/fa";

import { useParams } from "react-router";

import { UserContext } from "../context/User";
import { EventContext } from "../context/Event";
import { ChatContext } from "../context/Chat";
import { SpotifyContext } from "../context/Spotify";

import { socket } from "../api/api";

import MapWrapper from "../Components/Map/MapWrapper";
import Spotify from "../Components/Spotify";
import UserCard from "../Components/UserCard";
import ChatButton from "../Components/ChatButton";
import HomeButton from "../Components/HomeButton";

import { date } from "../constant/date";

function ActualEvent() {
  const [page, setPage] = useState({ event: true, spotify: false });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const room = useParams();

  const User = useContext(UserContext);
  const Event = useContext(EventContext);
  const Chat = useContext(ChatContext);
  const Spot = useContext(SpotifyContext);

  useEffect(() => {
    socket.on("message", function (data) {
      Chat.setChatGlobal(data);
    });

    socket.on("refreshSpotify", function (data) {
      Spot.setSpotifyGlobal(data);
    });

    // Enter in room
    socket.emit("room", { room: room.id, user: User.userGlobal._id });

    // Get CHAT
    socket.emit("chat", { room: room.id || Event.eventGlobal.code });

    return () => {
      socket.off("message");
      socket.off("room");
      socket.off("chat");
      socket.off("refreshSpotify");
    };
  }, []);

  //<Chats />
  return (
    <Box>
      {Event && Object.keys(Event.eventGlobal).length > 0 && (
        <Box>
          {/* <Box marginBottom="20px">
            <Button
              colorScheme="gray"
              onClick={() => setPage({ event: true, spotify: false })}
              marginRight="10px"
            >
              Evènement
            </Button>
            <Button
              colorScheme="green"
              onClick={() => setPage({ event: false, spotify: true })}
            >
              Music
            </Button>
          </Box> */}

          {page.spotify && (
            <Box m={6}>
              <Spotify Event={Event} />
            </Box>
          )}

          {page.event && (
            <Box m={6}>
              <Box p={0} display="flex" justifyContent={"space-between"}>
                <Box>
                  <Heading
                    fontWeight={"bold"}
                    fontSize={{ base: "4xl", sm: "4xl", md: "5xl" }}
                    mt={4}
                  >
                    {Event.eventGlobal.name}
                  </Heading>

                  <Box display="flex" alignItems={"center"}>
                    <BsFillGeoAltFill
                      style={{
                        display: "initial",
                        color: "#A7DACE",
                        marginRight: "5px",
                      }}
                    />
                    <span style={{ marginRight: "10px" }}>
                      {Event.eventGlobal.adresse},
                    </span>{" "}
                    <BiTimeFive
                      style={{
                        display: "initial",
                        color: "#A7DACE",
                        marginRight: "5px",
                      }}
                    />{" "}
                    {Event.eventGlobal.time}
                  </Box>
                  <Text mt={2}>
                    Code :{" "}
                    <Badge colorScheme="purple" fontSize={"lg"}>
                      {Event.eventGlobal.code}
                    </Badge>
                  </Text>
                </Box>
                <Box
                  height="100%"
                  p={4}
                  width={"100px"}
                  style={{ textAlign: "center" }}
                >
                  <Box
                    fontWeight={"bold"}
                    fontSize={"2xl"}
                    height="100%"
                    pt={4}
                    pb={4}
                    bg={"#69CEB7"}
                    style={{ textAlign: "center" }}
                    rounded={10}
                  >
                    <BsFillCalendarWeekFill
                      style={{ color: "#fff", display: "initial" }}
                    />
                    <Heading fontWeight={"500"} color={"#fff"} mt={-3}>
                      {Event.eventGlobal.date.substring(5).split("-")[1]}
                    </Heading>
                    <Text color={"#fff"} fontSize={"md"} mt={-2}>
                      {date[Event.eventGlobal.date.substring(5).split("-")[0]]}
                    </Text>
                  </Box>
                  <BsLink
                    fontSize={"24px"}
                    style={{ color: "#69CEB7", display: "initial" }}
                  />
                </Box>
              </Box>
              <Heading fontWeight={"bold"} fontSize={{ base: "xl" }} mb={2}>
                Invités
              </Heading>
              <Flex mb={5} onClick={onOpen}>
                <Box
                  height={"50px"}
                  width={"50px"}
                  bg={"#69CEB7"}
                  rounded={"50%"}
                  style={{ border: "3px solid #fff" }}
                ></Box>
                <Box
                  height={"50px"}
                  width={"50px"}
                  bg={"#69CEB7"}
                  rounded={"50%"}
                  style={{ border: "3px solid #fff" }}
                  ml={-3}
                ></Box>
                <Box
                  height={"50px"}
                  width={"50px"}
                  bg={"#69CEB7"}
                  rounded={"50%"}
                  style={{ border: "3px solid #fff", textAlign: "center" }}
                  ml={-3}
                >
                  <BsEyeFill
                    style={{
                      color: "#fff",
                      display: "initial",
                      marginTop: "14px",
                    }}
                  />
                </Box>
              </Flex>
              <SimpleGrid columns={2} spacingY={"20px"} spacingX={"10px"} >
                <Center
                  height={"150px"}
                  width={"150px"}
                  boxShadow="0px 0px 10px rgba(0, 0, 0, 0.2)"
                  rounded={"lg"}
                  flexDirection="column"
                  onClick={() => setPage({ event: false, spotify: true })}
                  cursor="pointer"
                >
                  <BsMusicNoteBeamed size={32} color="#69CEB7" />
                  <Text fontWeight="bold" mt={3}>
                    Playlist
                  </Text>
                </Center>
                <Center
                  height={"150px"}
                  width={"150px"}
                  boxShadow="0px 0px 10px rgba(0, 0, 0, 0.2)"
                  rounded={"lg"}
                  flexDirection="column"
                  cursor="pointer"
                >
                  <FaWallet size={32} color="#69CEB7" />
                  <Text fontWeight="bold" mt={3}>
                    Dépenses
                  </Text>
                </Center>
                <Center
                  height={"150px"}
                  width={"150px"}
                  boxShadow="0px 0px 10px rgba(0, 0, 0, 0.2)"
                  rounded={"lg"}
                  flexDirection="column"
                  cursor="pointer"
                >
                  <BiDrink size={32} color="#69CEB7" />
                  <Text fontWeight="bold" mt={3}>
                    Répartition
                  </Text>
                </Center>
                <Center
                  height={"150px"}
                  width={"150px"}
                  boxShadow="0px 0px 10px rgba(0, 0, 0, 0.2)"
                  rounded={"lg"}
                  flexDirection="column"
                  cursor="pointer"
                >
                  <BiCar size={32} color="#69CEB7" />
                  <Text fontWeight="bold" mt={3}>
                    Rentrer
                  </Text>
                </Center>
              </SimpleGrid>
              <Box height="300px" my={8}>
                <MapWrapper />
              </Box>
              <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader borderBottomWidth="1px">
                    Liste des invités
                  </DrawerHeader>
                  <DrawerBody>
                    <Grid>
                      {Event.eventGlobal.members.map((e, i) => (
                        <Box
                          display="flex"
                          alignItems={"center"}
                          justifyContent={"space-between"}
                          marginBottom={8}
                          key={i}
              
                        >
                          <Box display="flex" alignItems={"center"}>
                            <Avatar
                              name={`${e.name} ${e.last_name}`}
                              src="https://bit.ly/broken-link"
                              mr={6}
                            />
                            <Text>{`${e.name} ${e.last_name}`}</Text>
                          </Box>
                          <Text>
                            {e.online ? (
                              <Badge colorScheme="green">En ligne</Badge>
                            ) : (
                              <Badge colorScheme="red">Déconnecté</Badge>
                            )}
                          </Text>
                        </Box>
                      ))}
                    </Grid>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </Box>
          )}

          <Box height="100px">
            <Flex
              borderTop="1px solid #69CEB7"
              position="fixed"
              bottom="0px"
              height="100px"
              width={"100%"}
              my="auto"
              right="0"
              left="0"
              alignItems={"center"}
              justifyContent={"space-around"}
              backgroundColor="#1A202C"
            >
              {/* <Box width="50px" /> */}

              <HomeButton />

              <ChatButton />
            </Flex>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default ActualEvent;
