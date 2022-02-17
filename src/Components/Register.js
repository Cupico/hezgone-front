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
  Avatar,
  FormControl,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { register } from "../api/api";

import { useNavigate, Link} from "react-router-dom";


const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);


function Register() {
  const [userRegister, setUserRegister] = useState({
    name: "",
    last_name: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate()

  const handleRegister = (e) => {
    setUserRegister({ ...userRegister, [e.target.name]: e.target.value });
  };

  const sendRegister = (e) => {
    register(userRegister)
      .then((res) => {

        if(res){
          navigate("connexion")
        }
      })
      .catch((err) => console.log(err));
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);



  return (
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
        <Avatar bg="#69CEB7" />
        <Heading color="#69CEB7">Inscription</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="#69CEB7"
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
                variant="solid"
                bg="white"
                width="full"
                color="#69CEB7"
              >
                Insciption
              </Button>
            </Stack>
        </Box>
      </Stack>
      <Box>
        Vous avez déjà un comtpe ?{" "}
        <Link to={"connexion"}>
          <span style={{color: "#69CEB7"}}>Connexion</span>
        </Link>
      </Box>
    </Flex>
  );
}

export default Register;
