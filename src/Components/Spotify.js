import { useContext, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import axios from "axios";

import querystring from "query-string";

import { UserContext } from "../context/User";
import { EventContext } from "../context/Event";
import { ChatContext } from "../context/Chat";
import { SpotifyContext } from "../context/Spotify";

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
        type: "artist",
      },
    });

    console.log("data", data);

    setArtists(data.artists.items);
  };

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

  const nouvellePlaylist = (e) => {
    setCreateNewPlaylist({
      ...createNewPlaylist,
      [e.target.name]: e.target.value,
    });
  };

  const createPlaylist = async (e) => {
    e.preventDefault();

    let user_id;

    const { data } = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    user_id = await data.id;

    // 	https://api.spotify.com/v1/me
    const newPlaylist = {
      name: "New Playlist",
      description: "New playlist description",
      public: true,
    };

    var config = {
      method: "post",
      url: `https://api.spotify.com/v1/users/${user_id}/playlists`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: createNewPlaylist,
    };

    await axios(config).then((res) => console.log(res));
  };

  console.log("actual token spotify : ", token);

  return (
    <Box px={"5%"}>
      <a
        // href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${"token"}&scope=playlist-modify-public`}
        href={urlTokenSpotify}
        style={{color: "blue"}}
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
