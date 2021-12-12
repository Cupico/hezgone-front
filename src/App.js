import { useContext, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header";
import { StateStoreContext } from "./context/context";

import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const Context = useContext(StateStoreContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      Context.setGlobalState(user);
    }
  }, []);

  useEffect(() => {
    console.log(Context.globalState);
    if(Context.globalState){
      localStorage.setItem("user", JSON.stringify(Context.globalState));
    }
  }, [Context]);

  // localStorage.clear()

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/auth" element={<Authentication />} />
        <Route path="/" element={<Home />} />
        <Route path="/inscription" element={<RegisterPage />} />
        <Route path="/connexion" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
