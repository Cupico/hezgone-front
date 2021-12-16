import { Link } from "react-router-dom";

import { Box, Text } from "@chakra-ui/react";

function EventCard(props) {

    console.log(props)

    const { event } = props

  return (
    <Link to={`event/${event._id}`}>
    <Box
      display="flex"
      flexDirection="column"
      background="white"
      alignItems="center"
      gap={6}
      padding={8}
      borderRadius="xl"
      boxShadow="xl"
      w='100%'
    >
      <Box><Text textTransform={"capitalize"}>{event.name}</Text></Box>
    </Box>
    </Link>
  );
}

export default EventCard;
