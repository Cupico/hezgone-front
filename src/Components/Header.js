import React from "react";
import { useContext } from "react";
import { Link, Box, Flex, Text, Button, Stack, Avatar } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import Logo from "./Logo";
import { useColorMode } from "@chakra-ui/react";
import { UserContext } from "../context/User";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const { colorMode, toggleColorMode } = useColorMode();




  return (
    <NavBarContainer {...props} borderBottom="1px solid #69CEB7">
      <Logo
        w="100px"
        color={["#69CEB7", "#69CEB7", "#69CEB7", "#69CEB7"]}
      />
      <Button
        onClick={toggleColorMode}
        display={{ base: "block", md: "none" }}
      >
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </Button>
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="#69CEB7"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="#69CEB7"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <Link href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};


const MenuLinks = ({ isOpen }) => {

  const { colorMode, toggleColorMode } = useColorMode();
  const User = useContext(UserContext)
  console.log("user", User)

  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        {User.userGlobal._id && <Box>
          <Avatar
            name={`${User.userGlobal.name} ${User.userGlobal.last_name}`}
            src="https://bit.ly/broken-link"
            mr={6}
          />
        </Box>}

        {User.userGlobal._id && <MenuItem to="/connexion">
          <Button
            size="sm"
            rounded="md"
            color={["white", "white", "white", "white"]}
            bg={["#69CEB7", "#69CEB7", "#69CEB7", "#69CEB7"]}
            _hover={{
              bg: ["#69CEB7", "#69CEB7", "#69CEB7", "#69CEB7"]
            }}
          >
            Déconnexion
          </Button>
        </MenuItem>}

        <MenuItem to="/">Accueil</MenuItem>
        {/*<MenuItem to="/comment-ca-marche">Comment ça marche</MenuItem>
        <MenuItem to="/fonctionnalites">Fonctionnalités</MenuItem>*/}
        {!User.userGlobal._id && <MenuItem to="/connexion">
          <Button
            size="sm"
            rounded="md"
            color={["white", "white", "white", "white"]}
            bg={["#69CEB7", "#69CEB7", "#69CEB7", "#69CEB7"]}
            _hover={{
              bg: ["#69CEB7", "#69CEB7", "#69CEB7", "#69CEB7"]
            }}
          >
            Connexion
          </Button>
        </MenuItem>}
        {!User.userGlobal._id && <MenuItem to="/inscription" isLast>
          <Button
            size="sm"
            rounded="md"
            color={["white", "white", "white", "white"]}
            bg={["#69CEB7", "#69CEB7", "#69CEB7", "#69CEB7"]}
            _hover={{
              bg: ["#69CEB7", "#69CEB7", "#69CEB7", "#69CEB7"]
            }}
          >
            Inscription
          </Button>
        </MenuItem>}


        <Button
          onClick={toggleColorMode}
          display={{ base: "none", md: "block" }}
        >
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={0}
      paddingLeft={"5%"}
      paddingRight={"5%"}
      paddingY={2}
      bg={["transparent", "transparent", "transparent", "transparent"]}
      color={["#69CEB7", "#69CEB7", "#69CEB7", "#69CEB7"]}
      {...props}
    >
      {children}
    </Flex>
  );
};


export default NavBar;