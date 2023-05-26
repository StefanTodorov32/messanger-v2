import {
    Avatar,
    Button,
    Flex,
    FormControl,
    Input,
    Stack,
    Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/api";
import { useParams } from "react-router-dom";

export const Chat = () => {
    const { channelId } = useParams();
    console.log(channelId)
    const { data: messages } = useQuery({
        queryKey: ["messages"],
        queryFn: () => api.getChannelMessages(channelId),
    });
    console.log(messages);
    return (
        <Flex
            flexBasis="80%"
            p={10}
            flexDirection={`column`}
            justifyContent={`space-between`}
        >
            <Flex>
                <Avatar
                    name="Dan Abrahmov"
                    src="https://bit.ly/dan-abramov"
                    mr={5}
                ></Avatar>
                <Text fontSize={`2xl`}>Математика</Text>
            </Flex>
            <Stack h={`100%`} m={4}>
                <Flex
                    alignSelf={`flex-start`}
                    flexDirection={`column`}
                    justifyContent={`flex-start`}
                    m={2}
                    p={3}
                    bg={`gray.500`}
                    borderRadius={10}
                >
                    <Text fontSize={`xl`}>Hi! How are you doing?</Text>
                </Flex>
                <Flex
                    alignSelf={`flex-end`}
                    flexDirection={`column`}
                    justifyContent={`flex-end`}
                    m={2}
                    p={3}
                    bg={`blue.500`}
                    borderRadius={10}
                >
                    <Text fontSize={`xl`}>I am fine, thank you!</Text>
                </Flex>
            </Stack>
            <FormControl>
                <Flex>
                    <Input />
                    <Button
                        ml={5}
                        bg={`blue.500`}
                        variant="solid"
                        color={`white`}
                    >
                        Send
                    </Button>
                </Flex>
            </FormControl>
        </Flex>
    );
};
