// import { useContext, useEffect } from "react";
import "./App.css";

// import { StateStoreContext } from "./context/context";

import Home from "./pages/Home";
import Authentication from "./pages/Authentication";

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
      <Routes>
        <Route path="/auth" element={<Authentication />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
