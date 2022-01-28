import { useState, useContext } from "react";
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  useColorModeValue,
  Input,
} from "@chakra-ui/react";

import { socket } from "../api/api";
// import { joinEvent } from "../api/api";

import { UserContext } from "../context/User";
// import { EventContext } from "../context/Event";

import { useNavigate } from "react-router-dom";

function JoinEvent() {
  const [codeEvent, setCodeEvent] = useState({ code: "" });
  const User = useContext(UserContext);
  // const Event = useContext(EventContext);

  let navigate = useNavigate();

  const handleCodeEvent = (e) => {
    setCodeEvent({ [e.target.name]: e.target.value });
  };

  const handleJoinEvent = () => {
    socket.emit("room", { room: codeEvent.code, user: User.userGlobal._id });
    socket.emit("users", User.userGlobal._id);

    socket.on("event", function (data) {
      navigate(`event/${data._id}`);
    });
  };

  // useEffect(() => {
  //   if (Event && Event.eventGlobal._id)
  //     navigate(`event/${Event.eventGlobal._id}`);

  // }, [Event]);

  return (
    <Container maxW={"7xl"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "#69CEB7",
                zIndex: -1,
              }}
            >
              Rejoins l'Evenement
            </Text>
            <br />
            <Text as={"span"} color={"#69CEB7"}>
              Avec le code
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            Notre application Hez'gone va vous faciliter la tache dans
            l'organisation de vos soirées entre amis pour laisser place a plus
            de fun. Pour alléger la charge mentale de l'organisateur et de ses
            invités.
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "column" }}
          >
            <Input
              name={"code"}
              value={codeEvent.code}
              onChange={handleCodeEvent}
              placeholder="Entrez votre code pour rejoindre l'évènement"
              type={"text"}
            />
            <Button
              color={"white"}
              bg={"#69CEB7"}
              mt={2}
              onClick={handleJoinEvent}
            >
              Rejoindre un évènement
            </Button>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          <Blob
            w={"150%"}
            h={"150%"}
            position={"absolute"}
            top={"-20%"}
            left={0}
            zIndex={-1}
            color={useColorModeValue("#69CEB7", "red.400")}
          />
          <Box
            position={"relative"}
            height={"300px"}
            rounded={"2xl"}
            boxShadow={"2xl"}
            width={"full"}
            overflow={"hidden"}
          >
            <Image
              alt={"Hero Image"}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={"100%"}
              src={
                "https://burst.shopifycdn.com/photos/smiling-friends-clink-champagne-glasses-at-midnight.jpg?width=1850&format=pjpg&exif=1&iptc=1 2x"
              }
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
}

export const Blob = (props) => {
  return (
    <Icon
      width={"100%"}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </Icon>
  );
};

export default JoinEvent;
