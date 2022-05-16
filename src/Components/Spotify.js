import { useContext, useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import axios from "axios";

import querystring from "query-string";

import { SpotifyContext } from "../context/Spotify";
import { UserContext } from "../context/User";

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

  const [playlist, setPlaylist] = useState({});

  const Spot = useContext(SpotifyContext);
  const User = useContext(UserContext);

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

    // // console.log("laaaaaaaaaaa", Spot.spotifyGlobal)

    // if (Spot.spotifyGlobal && Spot.spotifyGlobal.playlist_id && (spotifyToken || token)) {

    //   console.log("toke", spotifyToken)
    //   const getPlaylist = async () => {

    //     var config = {
    //       method: "get",
    //       url: `https://api.spotify.com/v1/playlists/${Spot.spotifyGlobal.playlist_id}`,
    //       headers: {
    //         Authorization: `Bearer ${spotifyToken || token}`,
    //         "Content-Type": "application/json",
    //       },
    //     };

    //     await axios(config).then((res) => {
    //       const response = res.data;
    //       console.log("playlist get", response)
    //       setPlaylist(response);
    //       // socket.emit("spotify", {  room: Spot.spotifyGlobal.room, playlist_id: response });
    //     });
    //   }

    //   getPlaylist();
    // }
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

    console.log("tracks : ", data.tracks.items);
  };

  const addTrack = async (name, id, username) => {
    let spotData = {
      room: Spot.spotifyGlobal.room,
      music: { name: name, id: id, username: username },
    };
    socket.emit("spotify", spotData);

    // spotify:track:1301WleyT98MSxVHPZCA6M
    // add to playlisrt

    // let url = Spot.spotifyGlobal

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
    await axios(config).then((res) => {
      const response = res.data;
      console.log("response", response);
      // socket.emit("spotify", { room: Spot.spotifyGlobal.room, playlist_id: response });
    });
  };

  // DELETE TRRACK FROM PLAYLIST
  const deleteTrack = async (id) => {
    let spotData = { room: Spot.spotifyGlobal.room, deleteMusic: { id: id } };
    socket.emit("spotify", spotData);

    // spotify:track:1301WleyT98MSxVHPZCA6M
    // add to playlisrt

    // let url = Spot.spotifyGlobal

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
    await axios(config).then((res) => {
      const response = res.data;
      console.log("response", response);
      // socket.emit("spotify", { room: Spot.spotifyGlobal.room, playlist_id: response });
    });
  };

  const renderArtists = () => {
    return artists.map((artist) => (
      <div key={artist.id} style={{ marginBottom: "50px" }}>
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
          Ajouter à la playlist
        </Button>
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
      socket.emit("spotify", {
        room: Spot.spotifyGlobal.room,
        playlist_id: response,
      });
    });
  };

  console.log("actual spotify global", Spot.spotifyGlobal);
  console.log("user", User);

  useEffect(() => {
    if (token) {
      const getPlaylist = async () => {
        if (Spot.spotifyGlobal.playlist_id) {
          var config = {
            method: "get",
            url: `https://api.spotify.com/v1/playlists/${Spot.spotifyGlobal.playlist_id}`,
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          };

          await axios(config).then((res) => {
            const response = res.data;
            console.log("playlist get", response);
            setPlaylist(response);
            // socket.emit("spotify", {  room: Spot.spotifyGlobal.room, playlist_id: response });
          });
        }
      };

      getPlaylist();
    }
  }, [token]);

  console.log("la playlist", playlist);

  return (
    <Box px={"5%"}>
      <a
        // href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${"token"}&scope=playlist-modify-public`}
        href={urlTokenSpotify}
        style={{ color: "blue" }}
      >
        connexion à spotify
      </a>
      {token && token !== "" ? (
        <div>
          <Button colorScheme="teal" variant="solid" onClick={createPlaylist}>
            Créer une playlist
          </Button>
          {Spot.spotifyGlobal.playlist_id === "" && (
            <div>
              Créer une playlist :
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
            </div>
          )}
          <br />
          {playlist && Spot.spotifyGlobal.playlist_id && (
            <div>
              <h1>nom playlist : {playlist.name}</h1>
              {/* <div>
                <h2>musics :</h2>
                {Spot.spotifyGlobal &&s Spot.spotifyGlobal.music.length > 0 && Spot.spotifyGlobal.music.map((e, i) => (
                  <p>{e.name}</p>
                ))}
              </div> */}

              <iframe
                src={`https://open.spotify.com/embed/playlist/${Spot.spotifyGlobal.playlist_id}?utm_source=generator`}
                width="100%"
                height="1%"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              ></iframe>

              <div style={{ background: "black" }}>
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
                          delete
                        </Button>
                        <p style={{ marginLeft: "10px" }}>{e.name}</p>
                      </div>
                      <p>ajouté par {e.username}</p>
                    </div>
                  ))}
              </div>

              <div
                 style={{
                  color: "black",
                  position: "relative",
                  marginTop: "50px",
                }}>
                <p>Ajouter une musique à la playlist</p>
                <form
                  onSubmit={searchArtists}
                  style={{
                    color: "black",
                    position: "relative",
                    marginTop: "50px",
                  }}
                >
                  <input
                    type="text"
                    onChange={(e) => setSearchKey(e.target.value)}
                    style={{
                      color: "black",
                      border: "1px solid black",
                      padding: "4px 0px",
                    }}
                  />
                  <Button
                    colorScheme="teal"
                    variant="solid"
                    type={"submit"}
                    rightIcon={<SearchIcon />}
                  />
                </form>
              </div>

            </div>
          )}
        </div>
      ) : (
        <h2>Please login</h2>
      )}
      {renderArtists()}
    </Box>
  );
}

export default Spotify;
