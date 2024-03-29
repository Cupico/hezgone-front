import { React, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  Avatar,
  FormControl,
  InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { UserContext } from "../context/User"

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

function Login() {
  const [userLogin, setUserLogin] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const User = useContext(UserContext);

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
          User.setUserGlobal(response.user);
          pageNavigate();
        }
      })
      .catch((err) => console.log(err));
  };

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
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
        <Heading color="#69CEB7">Connexion</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
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
                    name={"username"}
                    value={userLogin.username}
                    onChange={handleLogin}
                    placeholder="Nom d'utilisateur"
                  />
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
                    <Button
                      bg="white"
                      h="1.75rem"
                      size="sm"
                      onClick={handleShowClick}
                      color={"#000"}
                    >
                      {showPassword ? "Cacher" : "Voir"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                onClick={sendLogin}
                borderRadius={0}
                variant="solid"
                bg="white"
                width="full"
                color="#69CEB7"
              >
                Connexion
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Vous êtes nouveau ?{" "}
        <Link to={"/inscription"}>
          <span style={{color: "#69CEB7"}}>Insciption</span>
        </Link>
      </Box>
    </Flex>
  );
}

export default Login;
