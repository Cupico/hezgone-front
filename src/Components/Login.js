import { React, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { login } from "../api/api";
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
  FormHelperText,
  InputRightElement,
  Icon
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { StateStoreContext } from "../context/context";


const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

function Login() {
  const [userLogin, setUserLogin] = useState({
    username: "",
    password: "",
  });

  const Context = useContext(StateStoreContext);

  let navigate = useNavigate();

  const pageNavigate = () => {
    navigate("/");
  };

  const handleLogin = (e) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };

  const sendLogin = () => {
    login(userLogin)
      .then((res) => {
        const response = res.data;
        if (response) {
          Context.setGlobalState({
            name: response.user.name,
            last_name: response.user.last_name,
            token: response.token,
            id: response.user._id
          });
          pageNavigate();
        }
        // console.log(response)
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
        <Avatar bg="#5E5CE6" />
        <Heading color="#5E5CE6">Connexion</Heading>
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
                    name={"username"}
                    value={userLogin.username}
                    onChange={handleLogin}
                    placeholder="Nom d'utilisateur" />
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
                    value={userLogin.password}
                    onChange={handleLogin}
                    placeholder="Mot de passe"
                    type={showPassword ? "text" : "password"}
                  />
                  <InputRightElement width="4.5rem">
                    <Button bg="white" h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Cacher" : "Voir"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link color="white">mot de passe oublié ?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                onClick={sendLogin}
                borderRadius={0}
                variant="solid"
                bg="white"
                width="full"
                color="#5E5CE6"
              >
                Connexion
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Vous êtes nouveau ?{" "}
        <Link color="#5E5CE6" href="#">
          Insciption
        </Link>
      </Box>
    </Flex>
  );
}

export default Login;
