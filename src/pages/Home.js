import { useEffect, useContext } from "react";
import { useNavigate } from "react-router";

import { socket } from "../api/api";
import { StateStoreContext } from "../context/context";

function Home() {
  const Context = useContext(StateStoreContext);
  let navigate = useNavigate();

  useEffect(() => {
    // Socket
    socket.on("connect", (err) => {});

    // socket.emit("user", Context.globalState);
    socket.emit("hello", "world");
  }, []);

  // Check info user...
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (Context.globalState.id === "" && !user) {
      navigate("/auth");
    } else {
      if (user) {
        Context.setGlobalState({
          name: user.name,
          last_name: user.last_name,
          token: user.token,
          id: user.id,
        });
      } else {
        if (Context.globalState.id) {
          localStorage.setItem("user", JSON.stringify(Context.globalState));
        }
      }
    }
  }, []);

  return <div>Salut home</div>;
}

export default Home;
