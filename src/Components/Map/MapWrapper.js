import { Wrapper, Status } from "@googlemaps/react-wrapper";

import MyMapComponent from "./MyMapComponent";

/*
  key : AIzaSyAs0HhkYNG6tqBluG6wG0VlV2oNc1VWJC4;

  final key : AIzaSyAohBsg_hdqEI8MYsoj_yV6qdseghMIzu4
*/

const render = (status) => {
  if (status === Status.LOADING) return "Loading...";
  if (status === Status.FAILURE) return "Error";
  return null;
};

const MapWrapper = () => {
  return (
    <Wrapper apiKey={"AIzaSyAohBsg_hdqEI8MYsoj_yV6qdseghMIzu4"} render={render}>
      <MyMapComponent />
    </Wrapper>
  );
};

export default MapWrapper;
