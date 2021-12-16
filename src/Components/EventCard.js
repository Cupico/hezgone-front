import { Link } from "react-router-dom";

import { Stat, StatLabel, StatNumber } from "@chakra-ui/react";

function EventCard(props) {

    const { event } = props

  return (
    <Link to={`event/${event._id}`}>
      <Stat
      px={{ base: 4, md: 8 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={('gray.800', 'gray.500')}
      rounded={'lg'}>
      <StatLabel fontWeight={'bold'} fontSize={'2xl'}>
      {event.name}
      </StatLabel>
      <StatLabel fontSize={'large'} fontWeight={'medium'}>
        12000 pers.
      </StatLabel>
    </Stat>
    </Link>
  );
}

export default EventCard;
