import { Wrapper, Status } from "@googlemaps/react-wrapper";

import MyMapComponent from "./MyMapComponent";

/*
  key : AIzaSyAs0HhkYNG6tqBluG6wG0VlV2oNc1VWJC4;
*/

const render = (status) => {
  if (status === Status.LOADING) return "Loading...";
  if (status === Status.FAILURE) return "Error";
  return null;
};

const MapWrapper = () => {
  return (
    <Wrapper apiKey={""} render={render}>
      <MyMapComponent />
    </Wrapper>
  );
};

export default MapWrapper;
