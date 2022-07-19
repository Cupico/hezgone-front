import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import GlobalUser from "./context/User";
import GlobalEvent from "./context/Event";

import customTheme from "./utils/theme";
import colorMode from "./utils/colormode";
import { ColorModeScript } from "@chakra-ui/react";

import GlobalChat from "./context/Chat";
import GlobalSpotify from "./context/Spotify";
import GlobalRepartition from "./context/Repartition"

ReactDOM.render(
  <React.StrictMode>
    <GlobalUser>
      <GlobalEvent>
        <GlobalChat>
          <GlobalSpotify>
            <GlobalRepartition>
              <ChakraProvider theme={customTheme}>
                {/* <Wrapper apiKey={"AIzaSyAs0HhkYNG6tqBluG6wG0VlV2oNc1VWJC4"}> */}
                <App />
                {/* </Wrapper> */}
              </ChakraProvider>
            </GlobalRepartition>
          </GlobalSpotify>
        </GlobalChat>
      </GlobalEvent>
    </GlobalUser>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
