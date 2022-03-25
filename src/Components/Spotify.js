import { useContext, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import axios from "axios";

import querystring from "query-string";

import { SpotifyContext } from "../context/Spotify";

import { socket } from "../api/api";

function Spotify({ Event }) {
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [createNewPlaylist, setCreateNewPlaylist] = useState({
    name: "",
    description: "",
    public: true,
  });

  const Spot = useContext(SpotifyContext);

  const CLIENT_ID = "6df25cbf97c84312b2d1499c49ff5611";
  //   const REDIRECT_URI = `http://localhost:3001/event/${Event.eventGlobal.code}`;
  const REDIRECT_URI = `http://localhost:3001`;
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize?";
  const scope = "playlist-modify-public playlist-modify-private";

  const urlTokenSpotify =
    AUTH_ENDPOINT +
    querystring.stringify({
      response_type: "token",
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: REDIRECT_URI,
    });

  useEffect(() => {
    const spotifyToken =
      JSON.parse(localStorage.getItem("spotifyToken")) ||
      Spot.spotifyGlobal.token;
    setToken(spotifyToken);
  }, [Spot]);

  const searchArtists = async (e) => {
    console.log(e.target.value);
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "track",
      },
    });

    setArtists(data.tracks.items);
  };

  const renderArtists = () => {
    return artists.map((artist) => (
      <div key={artist.id} style={{ marginBottom: "10px" }}>
        {artist.artists[0].name}
        <br />
        {artist.name}
        <br />
        Music id : {artist.id}
      </div>
    ));
  };

  const nouvellePlaylist = (e) => {
    setCreateNewPlaylist({
      ...createNewPlaylist,
      [e.target.name]: e.target.value,
    });
  };

  const createPlaylist = async (e) => {
    e.preventDefault();

    // GET USER ID
    let user_id;

    const { data } = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    user_id = await data.id;

    // CREATE PLAYLIST
    var config = {
      method: "post",
      url: `https://api.spotify.com/v1/users/${user_id}/playlists`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: createNewPlaylist,
    };

    // GET SPOTIFY
    await axios(config).then((res) => {
      const response = res.data.id;
      socket.emit("spotify", {  room: Spot.spotifyGlobal.room, playlist_id: response });
    });
  };

  console.log("actual spotify global", Spot.spotifyGlobal);

  return (
    <Box px={"5%"}>
      <a
        // href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${"token"}&scope=playlist-modify-public`}
        href={urlTokenSpotify}
        style={{ color: "blue" }}
      >
        go spotify
      </a>
      {token ? (
        <div>
          <form onSubmit={searchArtists}>
            <input
              type="text"
              onChange={(e) => setSearchKey(e.target.value)}
              style={{ color: "black", border: "1px solid black" }}
            />
            <button type={"submit"}>Search</button>
          </form>
          <button onClick={createPlaylist}>create playlist</button>

          <div>
            Créer une playlist :
            <br />
            <input
              type="text"
              name="name"
              onChange={nouvellePlaylist}
              value={createNewPlaylist.name}
              placeholder="Nom de la playlist"
            ></input>
            <br />
            <input
              type="text"
              name="description"
              onChange={nouvellePlaylist}
              value={createNewPlaylist.description}
              placeholder="Description..."
            ></input>
          </div>
        </div>
      ) : (
        <h2>Please login</h2>
      )}
      {renderArtists()}
    </Box>
  );
}

export default Spotify;
