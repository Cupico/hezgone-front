import { React } from "react";
import { Link } from "react-router-dom";

import { Center} from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
import { BiVerticalCenter } from "react-icons/bi";

function HomeButton() {
  return (
    <Link to={"/myevents"}>
      <Center
        rounded={"50%"}
        bg={["#69CEB7", "#69CEB7"]}
        width="50px"
        height="50px"
        alignItems="center"
      >
        <FaHome size={24} color="#fff" />
      </Center>
    </Link>
  );
}

export default HomeButton;
