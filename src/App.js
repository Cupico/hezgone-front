import { useEffect, useContext } from "react";
import "./App.css";
import Header from "./Components/Header";
// import Footer from "./Components/Footer";


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
        console.log("bien recu mes info user")
        User.setUserGlobal(data);
        console.log("user", data)
      });

    });

  }, [])


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
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
