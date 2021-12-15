import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "../context/User";
import { EventContext } from "../context/Event";

// import { socket } from "../api/api";

import { Box } from "@chakra-ui/react";

import CreateEvent from "../Components/CreateEvent";
import JoinEvent from "../Components/JoinEvent";

import { socket } from "../api/api";

function Home() {

  const User = useContext(UserContext);
  const Event = useContext(EventContext);
  let navigate = useNavigate();

  useEffect(() => {
    // here we san use socket events and listeners
    if (User.userGlobal._id !== "" || User.userGlobal._id !== undefined) {
      socket.on("connect", (err) => {
        console.log("CONNECT")
        socket.emit("users", User.userGlobal._id);
      });
      socket.on("user", function (data) {
        User.setUserGlobal(data)
      });

      socket.on("event", function (data) {
        Event.setEventGlobal(data)
        console.log("event emitted : ", data)
      });
    }

    // return () => socket.disconnect(); //cleanup
  }, []);

  useEffect(() => {
    if (User.userGlobal._id === "" || User.userGlobal._id === undefined) {
      navigate("auth");
    }
  }, [navigate, User]);

  return (
    <Box m={6}>
      {/* {Context.userGlobal && Context.userGlobal.user && Context.userGlobal.user.events.length  > 0 ? (
        <Event />
      ) : (
        <> */}
      <>
        <CreateEvent />
        <JoinEvent />
        <Box mt={6}>
          {User.userGlobal &&
            User.userGlobal.events &&
            User.userGlobal.events.length > 0 &&
            User.userGlobal.events.map((e, i) => (
              <Link key={i} to={`event/${e._id}`} style={{marginRight:'100px'}}>
                {e.name}
              </Link>
            ))}
        </Box>
      </>
    </Box>
  );
}

export default Home;
