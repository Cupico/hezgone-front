import { useEffect } from "react";
import socketIOClient from "socket.io-client";
import { endpoint } from "../api/api";

function Home() {
  console.log(endpoint);

  useEffect(() => {
    const socket = socketIOClient(endpoint);
    // socket.on("connection", (data) => {
    //   console.log("yess");
    // });
  }, []);

  return <div>Salut home</div>;
}

export default Home;
