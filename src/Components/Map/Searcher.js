import { useContext, useEffect } from "react";

import { EventContext } from "../../context/Event";

const Searcher = (props) => {
  const geocoder = new window.google.maps.Geocoder();
  const { setCenter } = props;

  const Event = useContext(EventContext);

  const onSearch = (address) => {
    geocoder
      .geocode({ address })
      .then((result) => {
        const { results } = result;
        const firstResult = results[0];
        const location = firstResult.geometry.location;
        const lat = location.lat();
        const lng = location.lng();
        setCenter({ lat, lng });
      })
      .catch((e) => {
        alert("Geocode was not successful for the following reason: " + e);
      });
  };

  useEffect(() => {

    if (Event.eventGlobal.adresse){
        onSearch(Event.eventGlobal.adresse);
    } 

  }, [Event.eventGlobal.adresse]);

  return <>ded</>;
};

export default Searcher;
