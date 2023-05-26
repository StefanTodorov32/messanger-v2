import { Avatar, Flex, Heading } from "@chakra-ui/react";

export const ChatNavigation = () => {
    return (
        <Flex
            flexBasis="20%"
            mr={4}
            p={10}
            borderRight={`1px solid hsl(0, 0%, 27%)`}
            flexDirection={`column`}
        >
            <Heading size={"lg"} mb={10}>
                Channels
            </Heading>
            {Array.from({ length: 5 }).map((_, i) => (
                <Flex
                    key={i}
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
                    <Avatar
                        name="Dan Abrahmov"
                        src="https://bit.ly/dan-abramov"
                        mr={5}
                    ></Avatar>
                    <Heading size={"md"}>Albert Johnson</Heading>
                </Flex>
            ))}
        </Flex>
    );
};
