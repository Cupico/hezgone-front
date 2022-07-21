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
    SimpleGrid,
    Avatar,
    Tag
} from "@chakra-ui/react";

import { socket } from "../api/api";

import { RepartitionContext } from "../context/Repartition";
import { UserContext } from "../context/User";


function Repartition({ Event }) {

    const [depense, setDepense] = useState(false)

    const [total, setTotal] = useState({ total: null, moneyToGive: null, depenses: {} })

    const [echange, setEchange] = useState([])


    const [tache, setTache] = useState({
        name: "",
        last_name: "",
        tache: "",
        prix: ""
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


    useEffect(() => {

        console.log("check", repartition.repartitionGlobal)

        // Toutes les personnes présentes
        let getPeople = Event.eventGlobal.members;

        // Total dépenses
        let getTotal = null;

        // Depense par personne
        let getDepensesByPerson = [];

        // Filtrer éléments avec un prix
        let getDepenses = repartition.repartitionGlobal.filter(e => e.prix);

        for (let i = 0; i < getPeople.length; i++) {

            let findPersonDepense = getDepenses.filter(e => e.name === getPeople[i].name)
            let totalPersonDepense = null;

            if (findPersonDepense.length > 0) {
                for (let y = 0; y < findPersonDepense.length; y++) {
                    totalPersonDepense += parseInt(findPersonDepense[y].prix)
                }
            }
            else {
                totalPersonDepense = 0
            }

            getDepensesByPerson.push([getPeople[i].name, totalPersonDepense])

        }

        console.log("la", getDepensesByPerson)

        for (let i = 0; i < getDepensesByPerson.length; i++) {
            getTotal += getDepensesByPerson[i][1]
        }

        const moyenne = getTotal / getPeople.length;

        setTotal({ total: getTotal, moneyToGive: moyenne, depenses: getDepensesByPerson })


        var rats = [];
        var souris = [];

        getDepensesByPerson.forEach((person) => {
            person.push((person[1] - moyenne));
            if (person[2] < 0) {
                rats.push(person);
            } else {
                souris.push(person);
            }
        });


        let dude = [];

        {
            rats.forEach((rat) => {
                while (rat[2] !== 0) {
                    souris.forEach((souri) => {
                        if (souri[2] !== 0 && rat[2] !== 0) {
                            if (Math.abs(rat[2]) >= souri[2]) {
                                // console.log("Rats" + rat[0] + " à une dette de " + Math.abs(rat[2]).toFixed(2))

                                dude.push([rat[0], souri[2].toFixed(2), souri[0]])

                                rat[rat.indexOf(rat[2])] = Math.abs(rat[2]) - souri[2];
                                souri[souri.indexOf(souri[2])] = 0;
                                // console.log("Rats" + rat[0] + " doit encore " + rat[2].toFixed(2));
                                // console.log("Souris" + souri[0] + " doit encore obtenir " + souri[2].toFixed(2));

                            } else {
                                // console.log("Rats" + rat[0] + " à une dette de " + Math.abs(rat[2]).toFixed(2));
                                // console.log("Souris" + souri[0] + " doit encore obtenir " + souri[2].toFixed(2));

                                dude.push([rat[0], Math.abs(rat[2].toFixed(2)), souri[0]])

                                var detteEnMoins = Math.abs(rat[2]);
                                var detteRestanteSouri = (souri[2] - detteEnMoins);
                                console.log(detteRestanteSouri);
                                souri[souri.indexOf(souri[2])] = detteRestanteSouri;
                                rat[rat.indexOf(rat[2])] = 0;
                                // console.log("Rats" + rat[0] + " doit encore " + rat[2].toFixed(2));
                                // console.log("Souris" + souri[0] + " doit encore obtenir " + (souri[2] - rat[2]).toFixed(2));
                            }
                        }
                    });
                }
            })
        }

        setEchange(dude)




    }, [repartition.repartitionGlobal, Event.eventGlobal.members.length])


    const changeTache = (e) => {

        if (e.target.name === "tache")
            setTache(prevState => ({ ...prevState, name: User.userGlobal.name, last_name: User.userGlobal.last_name, tache: e.target.value }))

        if (e.target.name === "prix")
            setTache(prevState => ({ ...prevState, name: User.userGlobal.name, last_name: User.userGlobal.last_name, prix: e.target.value }))
    }

    const sendTache = async () => {

        let reparitionData = {
            room: room.id,
            tache: tache,
        };

        socket.emit("tache", reparitionData);


        setTache({
            name: "",
            tache: "",
            prix: ""
        })

    }

    console.log("eché,", echange)


    return (
        <Box mt={"0px"}>

            <Text fontSize="3xl" fontWeight={"bold"}>{Event.eventGlobal.name}</Text>
            <Text fontSize="3xl">{depense ? "Dépense" : "Repartition"}</Text>

            <Button onClick={() => setDepense(false)}>répartition</Button>
            <Button onClick={() => setDepense(true)}>depense</Button>



            <Box mt={6}>
                {!depense && <Box mt={"20px"}>
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>

                        <Input
                            name={"tache"}
                            value={tache.tache}
                            onChange={(e) => changeTache(e)}
                            placeholder="tache"
                            type={"text"}
                            w={"full"}
                            backgroundColor={"gray.200"}
                        />


                        <Input
                            name={"prix"}
                            value={tache.prix}
                            onChange={(e) => changeTache(e)}
                            placeholder="prix"
                            type={"text"}
                            w={"full"}
                            backgroundColor={"gray.200"}
                        />

                        <Button
                            color={"white"}
                            bg={"#69CEB7"}
                            onClick={sendTache}
                            w={"full"}
                        >
                            Créer une tâche
                        </Button>

                    </SimpleGrid>

                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mt={6}>
                        {repartition.repartitionGlobal.length > 0 && repartition.repartitionGlobal.map((e, i) => (
                            <Box key={i} boxShadow={"lg"} py={4} px={2} display={"flex"} alignItems={"center"} borderRadius={"lg"} css={{
                                border: "1px solid white",
                            }}>
                                {e.prix && <Tag fontSize={"lg"} py={2} px={2} mr={4}>{e.prix} €</Tag>}
                                <Text>{e.tache}</Text>
                                <Avatar
                                    name={`${e.name} ${e.last_name}`}
                                    src="https://bit.ly/broken-link"
                                    mr={6}
                                    size={"sm"}
                                    alt={"Author"}
                                    css={{
                                        border: "2px solid white",
                                    }}
                                    marginRight={2}
                                    fontWeight={"light"}
                                    ml={"auto"}
                                />
                            </Box>
                        ))}
                    </SimpleGrid>
                </Box>}

                {depense &&
                    <Box>
                        <Box>
                            <Text backgroundColor={"#A7DACF"} borderRadius={"2xl"} py={6} px={10} w={"max-content"} mx={"auto"} fontSize={"4xl"} fontWeight={"bold"}>{total.total} €</Text>
                        </Box>
                        {/* <br />
                        Moyenne : {total.moneyToGive}
                        <br /> */}
                        <Box mt={6}>
                            {echange.length > 0 && echange.map((e, i) => (
                                <Box key={i} px={10} py={6} borderTop={"2px solid #A7DACF"} borderBottom={"2px solid #A7DACF"} my={8} display={"flex"} alignItems='center' justifyContent={"space-between"}>
                                    <Box >
                                        <Avatar
                                            name={`${e[0]}`}
                                            src="https://bit.ly/broken-link"
                                            size={"lg"}
                                            alt={`${e[0]}`}
                                            css={{
                                                border: "2px solid white",
                                            }}
                                            fontWeight={"light"}
                                            mb={2}
                                        />
                                        <Text fontWeight={"bold"}>{e[0]}</Text>
                                    </Box>
                                    <Box display="flex" flexDirection={"column"} alignItems="center" justifyContent={"center"} justifyItems="center">
                                        <Text textColor={"gray.500"} fontSize={"lg"}>doit à</Text>
                                        <Text my={1} textColor="#A7DACF" fontSize={"2xl"}> {">>>"}</Text>
                                        <Tag fontWeight={"bold"} fontSize={"xl"} py={2} px={2}>{e[1]} €</Tag>
                                    </Box>
                                    <Box>
                                        <Avatar
                                            name={`${e[2]}`}
                                            src="https://bit.ly/broken-link"
                                            size={"lg"}
                                            alt={`${e[0]}`}
                                            css={{
                                                border: "2px solid white",
                                            }}
                                            fontWeight={"light"}
                                            mb={2}
                                        />
                                        <Text textAlign={"center"} fontWeight={"bold"}>{e[2]}</Text>
                                    </Box>
                                    {/* <Text>{`${e[0]} doit ${e[1]} à ${e[2]}`}</Text> */}
                                </Box>
                            ))}
                        </Box>

                    </Box>
                }
            </Box>
        </Box>
    );
}
export default Repartition;
