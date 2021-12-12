import { useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { socket } from "../api/api";
import { StateStoreContext } from "../context/context";

import { Box } from "@chakra-ui/react";

import CreateEvent from "../Components/CreateEvent";
import JoinEvent from "../Components/JoinEvent";
import Event from "../Components/Event";

function Home() {
  const Context = useContext(StateStoreContext);
  let navigate = useNavigate();

  useEffect(() => {
    // if room

    const user = JSON.parse(localStorage.getItem("user"));

    let room;
    if (user && user.event && user.event.code) {
      room = user.event.code;
    }

    // Socket
    socket.on("connect", (err) => {
      // ROOM
      socket.emit("room", room);
    });

    //
    socket.on("event", function (data) {
      console.log("event:", data);
      Context.setGlobalState({...Context.globalState, event: data})
    });


  }, []);

  // Check info user...
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user.id) {
      navigate("/auth");
    }
  }, [navigate]);

  // useEffect(() => {

  //   if(Context.globalState.event){

  //   }

  // },[Context.globalState])

  return (
    <Box m={6}>
      {Context.globalState.event ? (
        <Event/>
      ) : (
        <>
          <CreateEvent />
          <JoinEvent />
        </>
      )}
    </Box>
  );
}

export default Home;
