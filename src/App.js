import { useEffect, useContext } from "react";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";


import Home from "./pages/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import ActualEvent from "./pages/ActualEvent";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { socket } from "./api/api";

import { UserContext } from "./context/User";
import { EventContext } from "./context/Event";


function App() {

  const User = useContext(UserContext)
  const Event = useContext(EventContext)


  useEffect(() => {

    socket.on("connect", (err) => {
      socket.emit("users", User.userGlobal._id);

      socket.on("event", function (data) {
        Event.setEventGlobal(data);
        console.log("event emitted : ", data);
      });
  
      socket.on("user", function (data) {
        User.setUserGlobal(data);
      });
    });




    //   if(Event && Event.eventGlobal && Event.eventGlobal.code)
    //   socket.emit("leaveRoom", {room:Event.eventGlobal.code, user:User.userGlobal._id})
    //   // console.log(socket.id); // undefined
    // });
  }, []);


  // useEffect(() => {
  //   if (User.userGlobal._id === "" || User.userGlobal._id === undefined) {
  //     navigate("auth");
  //   }
  // }, [navigate, User]);

  // localStorage.clear()

  return (
    <Router>
      <Header />
      <Routes>
        {/* <Route path="/auth" element={<Authentication />} /> */}
        <Route path="/inscription" element={<Register />} />
        <Route path="/connexion" element={<Login />} />

        <Route path="/event/:id" element={<ActualEvent />} />

        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
