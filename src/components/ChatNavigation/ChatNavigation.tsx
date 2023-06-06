import {
    Avatar,
    Button,
    Flex,
    Heading,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import { Link } from "react-router-dom";
import { CreateChannel } from "./CreateChannel";

export const ChatNavigation = ({
    auth,
    channels,
    refetchChannels
}: {
    auth: User;
    channels: DocumentData[] | undefined;
    refetchChannels: () => void;
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Flex
            flexBasis="20%"
            mr={4}
            p={10}
            borderRight={`1px solid hsl(0, 0%, 27%)`}
            flexDirection={`column`}
            justifyContent={`space-between`}
        >
            <Button onClick={onOpen} h={50} fontSize={18}>
                Create Channel
            </Button>
            <CreateChannel onClose={onClose} isOpen={isOpen} refetchChannels={refetchChannels} />
            <Flex flexDirection={`column`}
                overflowY="auto"
                marginTop={4}
                marginBottom={4}
            >
                {channels?.map((channel, i) => (
                    <Link to={`/channel/${channel.id}`} key={i}>
                        <Flex
                            w={"100%"}
                            bg={"rgba(255, 255, 255, 0.08)"}
                            p={5}
                            mb={5}
                            borderRadius={5}
                            alignItems={`center`}
                            _hover={{
                                cursor: "pointer",
                                bg: "rgba(255, 255, 255, 0.2)",
                            }}
                            transition={`background-color 0.2s ease-in-out`}
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
                bg={"rgba(255, 255, 255, 0.08)"}
                p={5}
                mb={5}
                borderRadius={5}
                alignItems={`center`}
                _hover={{
                    cursor: "pointer",
                    bg: "rgba(255, 255, 255, 0.2)",
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
