import { Avatar, Flex, Heading, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import { Link } from "react-router-dom";

export const ChatNavigation = ({
    auth,
    channels,
}: {
    auth: User;
    channels: DocumentData[] | undefined;
}) => {
    // const navigate = useNavigate();
    return (
        <Flex
            flexBasis="20%"
            mr={4}
            p={10}
            borderRight={`1px solid hsl(0, 0%, 27%)`}
            flexDirection={`column`}
            justifyContent={`space-between`}
        >
            <Heading size={"lg"} mb={10}>
                Channels
            </Heading>
            <Flex flexDirection={`column`}>
                {channels?.map((channel, i) => (
                    <Link to={`/channel/${channel.id}`} key={i}>
                        <Flex
                            w={"100%"}
                            bg={"hsl(0, 0%, 15%)"}
                            p={5}
                            mb={5}
                            borderRadius={5}
                            alignItems={`center`}
                            _hover={{
                                cursor: "pointer",
                                bg: "hsl(0, 0%, 20%)",
                            }}
                            transition={`background-color 0.2s ease-in-out`}
                            // onClick={() => navigate("/chat/" + channel.id)}
                        >
                            <Avatar
                                name={channel.name}
                                src={channel.photoUrl}
                                mr={5}
                            ></Avatar>
                            <Heading size={"md"}>{channel.name}</Heading>
                        </Flex>
                    </Link>
                ))}
            </Flex>
            <Flex
                w={"100%"}
                bg={"hsl(0, 0%, 15%)"}
                p={5}
                mb={5}
                borderRadius={5}
                alignItems={`center`}
                _hover={{
                    cursor: "pointer",
                    bg: "hsl(0, 0%, 20%)",
                }}
                transition={`background-color 0.2s ease-in-out`}
            >
                <Avatar name="avatar" src={`${auth.photoURL}`} mr={5}></Avatar>
                <Flex flexDir={`column`}>
                    <Heading size={"md"}>{auth.displayName}</Heading>
                    <Text>{auth.email}</Text>
                </Flex>
            </Flex>
        </Flex>
    );
};
