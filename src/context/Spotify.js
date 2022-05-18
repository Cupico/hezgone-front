import React, { useState } from "react";
import { createContext } from "react";

export const SpotifyContext = createContext();

export const GlobalSpotify = ({ children }) => {
  const [spotifyGlobal, setSpotifyGlobal] = useState([]);

  return (
    <SpotifyContext.Provider value={{ spotifyGlobal, setSpotifyGlobal }}>
      {children}
    </SpotifyContext.Provider>
  );
};

export default GlobalSpotify;