import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { BsHurricane } from "react-icons/bs";


export default function Logo(props) {
  return (
    <Box {...props}>
      <Text fontSize="md" fontWeight="bold">
        <BsHurricane size="md"/>
      </Text>
    </Box>
  );
}