import { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "../context/User";

import { socket } from "../api/api";

import { Box } from "@chakra-ui/react";

import CreateEvent from "../Components/CreateEvent";
import JoinEvent from "../Components/JoinEvent";

function Home() {
  const User = useContext(UserContext);
  let navigate = useNavigate();

  // const user = JSON.parse(localStorage.getItem("user"));

  // Check info user...
  useEffect(() => {
    console.log(User)
    if (Object.keys(User.userGlobal).length === 0 || User.userGlobal._id === "") {
      navigate("/auth");
    }
  }, [User, navigate]);

  useEffect(() => {
    // let room;
    // if (user && user.event && user.event.code) {
    //   room = user.event.code;
    // }
    // Socket
    // socket.on("connect", (err) => {
    //   socket.emit("users", user.id);
    //   // ROOM
    //   socket.emit("room", room);
    // });
  });

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
              <Link key={i} to={`event/${e._id}`}>
                <button onClick={() => socket.emit("room", e.code)}>
                  {e.name}
                </button>
              </Link>
            ))}
        </Box>
      </>
    </Box>
  );
}

export default Home;
