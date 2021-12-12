// import { useContext, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header";
// import { StateStoreContext } from "./context/context";

import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import RegisterPage from "./pages/Register"
import LoginPage from "./pages/Login";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  // const Context = useContext(StateStoreContext);
  // console.log(Context);

  // useEffect(() => {
  //   if (Context.globalState.token === "") {
  //     console.log("state change");
  //   }
  // }, [Context.globalState]);;

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
