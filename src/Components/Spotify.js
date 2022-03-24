import { useContext, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import axios from "axios";

import { UserContext } from "../context/User";
import { EventContext } from "../context/Event";
import { ChatContext } from "../context/Chat";
import { SpotifyContext } from "../context/Spotify";


function Spotify({ Event }) {
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);

  const Spot = useContext(SpotifyContext)

  const CLIENT_ID = "6df25cbf97c84312b2d1499c49ff5611";
  //   const REDIRECT_URI = `http://localhost:3001/event/${Event.eventGlobal.code}`;
  const REDIRECT_URI = `http://localhost:3001`;
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";

  useEffect(() => {
    const spotifyToken = JSON.parse(localStorage.getItem("spotifyToken")) || Spot.spotifyGlobal.token ;
    setToken(spotifyToken);
  }, [Spot]);

  const searchArtists = async (e) => {
      console.log(e.target.value)
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    });

    console.log("data", data)

    setArtists(data.artists.items);
  };

  console.log("OTKEN SPOT", searchKey);

  const renderArtists = () => {
    return artists.map((artist) => (
      <div key={artist.id}>
        {artist.images.length ? (
          <img width={"100%"} src={artist.images[0].url} alt="" />
        ) : (
          <div>No Image</div>
        )}
        {artist.name}
      </div>
    ));
  };

  return (
    <Box px={"5%"}>
      <a
        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${"token"}`}
      >
        go spotify
      </a>
      lala

      {token ? (
        <form onSubmit={searchArtists}>
          <input type="text" onChange={(e) => setSearchKey(e.target.value)} style={{color:"black"}} />
          <button type={"submit"}>Search</button>
        </form>
      ) : (
        <h2>Please login</h2>
      )}
      {renderArtists()}
    </Box>
  );
}

export default Spotify;
