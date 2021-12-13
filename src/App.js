import { useContext, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header";

import { UserContext } from "./context/User";
import { EventContext } from "./context/Event";

import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ActualEvent from "./pages/ActualEvent";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { socket } from "./api/api";

function App() {

  const User = useContext(UserContext);
  const Event = useContext(EventContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      User.setUserGlobal(user);

      socket.on("connect", (err) => {
        socket.emit("users", user._id);
      });
    }
  }, []);

  useEffect(() => {
    socket.on("user", function (user) {
      User.setUserGlobal(user);
    });

    socket.on("event", function (event) {
      Event.setEventGlobal(event);
    });

  }, [socket]);



  useEffect(() => {
    if (User.userGlobal) {
      localStorage.setItem("user", JSON.stringify(User.userGlobal));
    }

    if (Event.eventGlobal) {
      localStorage.setItem("event", JSON.stringify(Event.eventGlobal));
    }
  }, [User, Event]);

  // localStorage.clear()

  return (
    <Router>
      <Header />
      <Routes>

        <Route path="/auth" element={<Authentication />} />
        <Route path="/inscription" element={<RegisterPage />} />
        <Route path="/connexion" element={<LoginPage />} />
        
        <Route path="/event/:id" element={<ActualEvent />} />

        <Route path="/" element={<Home />} />

      </Routes>
    </Router>
  );
}

export default App;
