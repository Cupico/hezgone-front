import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Box,
  Button,
  InputGroup,
  Input,
  InputRightAddon,
  Heading, Link, Text
} from "@chakra-ui/react";
import { SearchIcon, DeleteIcon, SmallAddIcon } from "@chakra-ui/icons";

import axios from "axios";

import querystring from "query-string";

import { SpotifyContext } from "../context/Spotify";
import { UserContext } from "../context/User";

import { socket } from "../api/api";

import { REDIRECT_URI } from "../api/api";

function Spotify({ Event }) {
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [createNewPlaylist, setCreateNewPlaylist] = useState({
    name: "",
    description: "",
    public: true,
  });

  const [playlist, setPlaylist] = useState({});

  const room = useParams();

  const Spot = useContext(SpotifyContext);
  const User = useContext(UserContext);

  const CLIENT_ID = "6df25cbf97c84312b2d1499c49ff5611";
  //   const REDIRECT_URI = `http://localhost:3001/event/${Event.eventGlobal.code}`;
  // const REDIRECT_URI = `http://localhost:3001`;
  // const REDIRECT_URI = `http://localhost:3001`;
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
    (Spot.spotifyGlobal.token) ||
      (JSON.parse(localStorage.getItem("spotifyToken"))) || ""
    setToken(spotifyToken);

    // GET SPOTIFY
    let spotData = {
      room: room.id,
    };
    if (spotifyToken !== "") {
      spotData.token = spotifyToken;
    }

    socket.emit("spotify", spotData);
  }, []);

  const searchArtists = async (e) => {
    e.preventDefault();

    var config = {
      method: "get",
      url: `https://api.spotify.com/v1/search`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "track",
      },
    };

    await axios(config)
      .then((res) => {
        const response = res.data;
        console.log("response", response);
        setArtists(response.tracks.items);
      })
      .catch((err) => alert("Veuillez reconnectez le compte à Spotify"));
  };

  const addTrack = async (name, id, username) => {
    let spotData = {
      room: Spot.spotifyGlobal.room,
      music: { name: name, id: id, username: username },
    };
    socket.emit("spotify", spotData);

    // CREATE PLAYLIST
    var config = {
      method: "post",
      url: `https://api.spotify.com/v1/playlists/${Spot.spotifyGlobal.playlist_id}/tracks?uris=spotify:track:${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    // GET SPOTIFY
    await axios(config)
      .then((res) => {
        const response = res.data;
        console.log("response", response);
        // socket.emit("spotify", { room: Spot.spotifyGlobal.room, playlist_id: response });
      })
      .catch((err) => alert("Veuillez reconnectez le compte à Spotify"));
  };

  // DELETE TRRACK FROM PLAYLIST
  const deleteTrack = async (id) => {
    const tracks = { tracks: [{ uri: `spotify:track:${id}` }] };

    // CREATE PLAYLIST
    var config = {
      method: "delete",
      url: `https://api.spotify.com/v1/playlists/${Spot.spotifyGlobal.playlist_id}/tracks`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: tracks,
    };

    // GET SPOTIFY
    await axios(config)
      .then((res) => {
        let spotData = {
          room: Spot.spotifyGlobal.room,
          deleteMusic: { id: id },
        };
        socket.emit("spotify", spotData);
        // socket.emit("spotify", { room: Spot.spotifyGlobal.room, playlist_id: response });
      })
      .catch((err) => alert("Veuillez reconnectez le compte à Spotify"));
  };

  const renderArtists = () => {
    return artists.map((artist) => (
      <Box key={artist.id} marginBottom="50px">
        <img
          src={artist.album.images[0].url}
          alt=""
          style={{ height: "200px", width: "200px" }}
        />
        <p>
          {artist.name} - {artist.artists[0].name}
        </p>

        <Button
          colorScheme="teal"
          variant="solid"
          onClick={() =>
            addTrack(artist.name, artist.id, User.userGlobal.username)
          }
        >
          <SmallAddIcon/>
        </Button>
      </Box>
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
      socket
        .emit("spotify", {
          room: Spot.spotifyGlobal.room,
          playlist_id: response,
        })
        .catch((err) => alert("Veuillez reconnectez le compte à Spotify"));
    });
  };

  // useEffect(() => {
  //   if (Spot.spotifyGlobal.playlist_id) {
  //     const getPlaylist = async () => {
  //       if (Spot.spotifyGlobal.playlist_id) {
  //         var config = {
  //           method: "get",
  //           url: `https://api.spotify.com/v1/playlists/${Spot.spotifyGlobal.playlist_id}`,
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //           },
  //         };

  //         await axios(config)
  //           .then((res) => {
  //             const response = res.data;
  //             console.log("playlist get", response);
  //             setPlaylist(response);
  //             // socket.emit("spotify", {  room: Spot.spotifyGlobal.room, playlist_id: response });
  //           })
  //           .catch((err) => console.log("PLaylist non trouvé ou token expiré"));
  //       }
  //     };

  //     getPlaylist();
  //   }
  // }, [Spot.spotifyGlobal.playlist_id]);

  console.log("la ici global spot", Spot.spotifyGlobal.playlist_id);
  console.log("token", token)

  return (
    <Box px={"5%"}>
      <Link
        // href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${"token"}&scope=playlist-modify-public`}
        href={urlTokenSpotify}
      >
        <Box display="flex" alignItems={"center"} backgroundColor="green.400" width="fit-content" px={6} py={1} rounded={"lg"} color="white">
        <Text marginRight="10px">Se {(Spot.spotifyGlobal.token === "") ||
      (JSON.parse(localStorage.getItem("spotifyToken")) === "") ? "connecter" : "reconnecter"} avec spotify</Text>
        <svg style={{width:"40px", height:"40px"}}id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2931 2931" width="2931" height="2931"><path class="st0" d="M1465.5 0C656.1 0 0 656.1 0 1465.5S656.1 2931 1465.5 2931 2931 2274.9 2931 1465.5C2931 656.2 2274.9.1 1465.5 0zm672.1 2113.6c-26.3 43.2-82.6 56.7-125.6 30.4-344.1-210.3-777.3-257.8-1287.4-141.3-49.2 11.3-98.2-19.5-109.4-68.7-11.3-49.2 19.4-98.2 68.7-109.4C1242.1 1697.1 1721 1752 2107.3 1988c43 26.5 56.7 82.6 30.3 125.6zm179.3-398.9c-33.1 53.8-103.5 70.6-157.2 37.6-393.8-242.1-994.4-312.2-1460.3-170.8-60.4 18.3-124.2-15.8-142.6-76.1-18.2-60.4 15.9-124.1 76.2-142.5 532.2-161.5 1193.9-83.3 1646.2 194.7 53.8 33.1 70.8 103.4 37.7 157.1zm15.4-415.6c-472.4-280.5-1251.6-306.3-1702.6-169.5-72.4 22-149-18.9-170.9-91.3-21.9-72.4 18.9-149 91.4-171 517.7-157.1 1378.2-126.8 1922 196 65.1 38.7 86.5 122.8 47.9 187.8-38.5 65.2-122.8 86.7-187.8 48z"/></svg>
        </Box>
      </Link>
      {(Spot.spotifyGlobal.token !== "") ||
      (JSON.parse(localStorage.getItem("spotifyToken")) !== "") ? (
        <div>
          {Spot.spotifyGlobal.playlist_id === "" && (token !== "") && (
            <Box>
              <br />
              <input
                type="text"
                name="name"
                onChange={nouvellePlaylist}
                value={createNewPlaylist.name}
                placeholder="Nom de la playlist"
                style={{ color: "black", border: "1px solid black" }}
              ></input>
              <br />
              <input
                type="text"
                name="description"
                onChange={nouvellePlaylist}
                value={createNewPlaylist.description}
                placeholder="Description..."
              ></input>
              <Button
                colorScheme="teal"
                variant="solid"
                onClick={createPlaylist}
              >
                Créer une playlist
              </Button>
            </Box>
          )}
          <br />
          {Spot.spotifyGlobal.playlist_id && (
            <Box>
              <Box>
                <iframe
                  src={`https://open.spotify.com/embed/playlist/${Spot.spotifyGlobal.playlist_id}?utm_source=generator`}
                  width="100%"
                  height="1%"
                  frameBorder="0"
                  allowFullScreen=""
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                ></iframe>
              </Box>

              <Box marginBottom="50px" backgroundColor="black">
                {Spot.spotifyGlobal &&
                  Spot.spotifyGlobal.music &&
                  Spot.spotifyGlobal.music.length > 0 &&
                  Spot.spotifyGlobal.music.map((e, i) => (
                    <div
                      key={i}
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px 20px",
                        color: "white",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Button
                          variant="solid"
                          onClick={() => deleteTrack(e.id)}
                          style={{ backgroundColor: "#C53030" }}
                        >
                          <DeleteIcon/>
                        </Button>
                        <p style={{ marginLeft: "10px" }}>{e.name}</p>
                      </div>
                      <p>ajouté par {e.username}</p>
                    </div>
                  ))}
              </Box>

              <Box>
                <Heading size="lg" mb={4}>Ajouter une musique à la playlist</Heading>
                <form
                  onSubmit={searchArtists}
                  style={{
                    color: "black",
                    position: "relative",
                    marginBottom:"20px"
                  }}
                >
                  <InputGroup size="md">
                    <Input
                      onChange={(e) => setSearchKey(e.target.value)}
                      rounded="0"
                      placeholder="Rechercher une musique dans Spotify..."
                      focusBorderColor="blue.500"
                      variant="outline"
                      color="black"
                      backgroundColor="gray.400"
                    />
                    <InputRightAddon
                      children={
                        <Button
                          type={"submit"}
                          width="100%"
                          height="100%"
                          rightIcon={<SearchIcon />}
                        />
                      }
                    />
                  </InputGroup>
                </form>
              </Box>
            </Box>
          )}
        </div>
      ) : (
        <p>Please login</p>
      )}
      {renderArtists()}
    </Box>
  );
}

export default Spotify;