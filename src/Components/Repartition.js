import { useContext, useEffect, useState, } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    Button,
    InputGroup,
    Input,
    Heading,
    Link,
    Text,
    Image,
    Flex,
    Stack,
    Grid,
    GridItem,
} from "@chakra-ui/react";

import { socket } from "../api/api";

import { RepartitionContext } from "../context/Repartition";
import { UserContext } from "../context/User";


function Repartition({ Event }) {


    const [tache, setTache] = useState({
        name: "",
        tache: ""
    });

    const room = useParams();


    const repartition = useContext(RepartitionContext);
    const User = useContext(UserContext);

    useEffect(() => {
        // Get Repartition
        socket.emit("tache", { room: room.id || Event.eventGlobal.code })

        socket.on("repartition", function (data) {
            repartition.setRepartitionGlobal(data.taches);
        });

    }, [])


    const changeTache = (e) => {
        setTache({ name: User.userGlobal.name, tache: e.target.value })
    }

    const sendTache = () => {

        let reparitionData = {
            room: room.id,
            tache: tache,
        };

        socket.emit("tache", reparitionData);

    }



    return (
        <Box mt={"100px"}>

            <Text>Event : {Event.eventGlobal.name}</Text>
            <Text>Repartition page</Text>

            <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={{ base: "column", sm: "column" }}
            >
                <Input
                    name={"tache"}
                    value={tache.tache}
                    onChange={(e) => changeTache(e)}
                    placeholder="tache"
                    type={"text"}
                />
                <Button
                    color={"white"}
                    bg={"#69CEB7"}
                    mt={2}
                    onClick={sendTache}
                >
                    Créer une tâche
                </Button>
            </Stack>

            {repartition.repartitionGlobal.length > 0 && repartition.repartitionGlobal.map((e, i) => (
                <Box key={i}>
                    {e.name} - {e.tache}
                </Box>
            ))}

        </Box>
    );
}
export default Repartition;
