import { Link } from "react-router-dom";
import {BsFillGeoAltFill, BsClock, BsFillCalendarWeekFill} from 'react-icons/bs'

import { Text, Box, Heading, Flex } from "@chakra-ui/react";

import { date } from "../constant/date";

function EventCard(props) {

    const { event } = props

    console.log("event", event);

  return (
    <Link to={`/event/${event.code}`}>
      <Flex
      columns={3}
      spacing={'40px'}
      boxShadow='0px 0px 10px rgba(0, 0, 0, 0.2)' 
      rounded={'lg'}>
      <Box height='100%' p={4} width={"100px"}>
        <Box fontWeight={'bold'} fontSize={'2xl'} height='100%' pt={4} pb={4} bg={"#69CEB7"} style={{textAlign: "center"}} rounded={10} >
          <BsFillCalendarWeekFill style={{color: "#fff", display: 'initial'}} />
          <Heading color={'#fff'}>{event.date && event.date.substring(5).split("-")[1]} </Heading>
          <Text color={'#fff'} fontSize={'md'}>{event.date && date[event.date.substring(5).split("-")[0]]} </Text>
        </Box>
      </Box>
      <Box fontSize={'md'} fontWeight={'medium'} p={4} pl={5} width={'60%'}>
        <Heading fontSize={"18px"} mb={4} noOfLines={2} height={'48px'}>
          {event.name}
        </Heading>
        <BsFillGeoAltFill style={{display: "initial", color: "#A7DACE"}} /> Paris
        <Flex mt={4}>
          <Box height={'30px'} width={'30px'} bg={'#69CEB7'} rounded={'50%'} style={{border: '3px solid #fff'}}></Box>
          <Box height={'30px'} width={'30px'} bg={'#69CEB7'} rounded={'50%'} style={{border: '3px solid #fff'}} ml={-3}></Box>
          <Box height={'30px'} width={'30px'} bg={'#69CEB7'} rounded={'50%'} style={{border: '3px solid #fff'}} ml={-3}></Box>
        </Flex>
      </Box>
      <Box fontSize={'2xl'} fontWeight={'medium'} height='100%' p={4} mt={8} style={{textAlign: "center"}}>
        <BsClock style={{display: "initial", color: "#A7DACE", height: "30px"}} />
        <Text fontSize={'md'} color={'#A7DACE'}>{event.time}</Text>
      </Box>
    </Flex>
    </Link>
  );
}

export default EventCard;
