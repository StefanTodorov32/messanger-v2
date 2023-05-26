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
import { Message } from "../models";
import { User } from "firebase/auth";

export const Chat = ({ auth }: { auth: User }) => {
    const { channelId } = useParams();
    const { data: messages } = useQuery({
        queryKey: ["messages"],
        queryFn: (): Promise<Message[] | undefined> =>
            api.getChannelMessages(channelId),
    });
    const { data: channel } = useQuery({
        queryKey: ["channel"],
        queryFn: () => api.getChannel(channelId),
    });
    return (
        <Flex
            flexBasis="80%"
            p={10}
            flexDirection={`column`}
            justifyContent={`space-between`}
        >
            <Flex>
                <Avatar
                    name={channel?.name}
                    src={channel?.photoUrl}
                    mr={5}
                ></Avatar>
                <Text fontSize={`2xl`}>{channel?.name}</Text>
            </Flex>
            <Stack h={`100%`} m={4}>
                {messages?.map((message: Message) => {
                    console.log(message.sendBy.id);
                    console.log(auth.uid);
                    return (
                        <Flex
                            key={message.id}
                            alignSelf={`flex-start`}
                            flexDirection={`column`}
                            justifyContent={`flex-start`}
                            m={2}
                            p={3}
                            bg={`gray.500`}
                            borderRadius={10}
                        >
                            <Text fontSize={`xl`}>{message.text}</Text>
                        </Flex>
                    );
                })}
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
