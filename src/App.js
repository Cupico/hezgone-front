import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";


import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ActualEvent from "./pages/ActualEvent";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {

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
      <Footer />
    </Router>
  );
}

export default App;
