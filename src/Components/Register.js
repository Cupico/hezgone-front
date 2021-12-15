import { React, useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { register } from "../api/api";


const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);


function Register() {
  const [userRegister, setUserRegister] = useState({
    name: "",
    last_name: "",
    username: "",
    password: "",
  });

  const handleRegister = (e) => {
    setUserRegister({ ...userRegister, [e.target.name]: e.target.value });
  };

  const sendRegister = () => {
    register(userRegister)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);



  return (
    <div>
      <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="white"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="#5E5CE6" />
        <Heading color="#5E5CE6">Inscription</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="#5E5CE6"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="white"
                    children={<CFaUserAlt color="white" />}
                  />
                  <Input  
                    type="text"
                    name={"name"}
                    value={userRegister.name}
                    onChange={handleRegister}
                    placeholder="Prénom"
                    mr="4" />
                  <Input  
                    type="text"
                    name={"last_name"}
                    value={userRegister.last_name}
                    onChange={handleRegister}
                    placeholder="Nom" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="white"
                    children={<CFaUserAlt color="white" />}
                  />
                  <Input  
                    type="text"
                    name={"username"}
                    value={userRegister.username}
                    onChange={handleRegister}
                    placeholder="Nom d'utilisateur / Email" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="white"
                    children={<CFaLock color="white" />}
                  />
                  <Input
                    name={"password"}
                    value={userRegister.password}
                    onChange={handleRegister}
                    placeholder="Mot de passe"
                    type={showPassword ? "text" : "password"}
                  />
                  <InputRightElement width="4.5rem">
                    <Button bg="white" h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Cacher" : "Voir"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                 onClick={sendRegister}
                borderRadius={0}
                type="submit"
                variant="solid"
                bg="white"
                width="full"
                color="#5E5CE6"
              >
                Insciption
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Vous avez déjà un comtpe ?{" "}
        <Link color="#5E5CE6" href="#">
          Connexion
        </Link>
      </Box>
    </Flex>
      <Input
        type="text"
        name={"name"}
        value={userRegister.name}
        onChange={handleRegister}
        placeholder="Nom"
      />
      <Input
        type="text"
        name={"last_name"}
        value={userRegister.last_name}
        onChange={handleRegister}
        placeholder="Nom de famille"
      />
      <Input
        type="text"
        name={"username"}
        value={userRegister.username}
        onChange={handleRegister}
        placeholder="Nom d'utilisateur"
      />
      <Input
        type="password"
        name={"password"}
        value={userRegister.password}
        onChange={handleRegister}
        placeholder="Mot de passe"
      />
      <Button onClick={sendRegister}>Register </Button>
    </div>
  );
}

export default Register;
