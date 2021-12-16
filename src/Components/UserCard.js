import {
  Heading,
  Avatar,
  Box,
  Flex,
  Text,
  Stack,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";

function UserCard(props) {
  const { user} = props;


  return (
    <Box
      maxW={"270px"}
      w={"400px"}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"2xl"}
      rounded={"md"}
      overflow={"hidden"}
      maxH={"400px"}
      mt={4}
    >
      <Box
        h={"120px"}
        w={"full"}
        objectFit={"cover"}
      />
      <Flex justify={"center"} mt={-12}>
        <Avatar
          size={"xl"}
          src={"https://bit.ly/tioluwani-kolawole"}
          alt={"Author"}
          css={{
            border: "2px solid white",
          }}
        />
      </Flex>

      <Box p={6}>
        <Stack spacing={0} align={"center"} mb={5}>
          <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"} textTransform={"capitalize"}>
            {user.name} {user.last_name}
          </Heading>
          <Text color={"gray.500"} pt={2}>Arrive à 20h</Text>
        </Stack>

        <Stack direction={"row"} justify={"center"} spacing={6}>
          <Stack spacing={0} align={"center"}>
          <Badge colorScheme='green'>{"En ligne"}</Badge>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default UserCard;
