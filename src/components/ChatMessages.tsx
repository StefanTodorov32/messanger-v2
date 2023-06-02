import {
    Avatar,
    Button,
    Flex,
    FormControl,
    Input,
    Stack,
    Text,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../api/api";
import { useParams } from "react-router-dom";
import { Message } from "../models";
import { User } from "firebase/auth";
import { useEffect, useRef, useState } from "react";

export const Chat = ({ auth }: { auth: User }) => {
    const { channelId } = useParams<string>();
    const { data: messages, refetch: refetchMessages } = useQuery({
        queryKey: ["messages"],
        queryFn: (): Promise<Message[] | undefined> =>
            api.getChannelMessages(channelId),
        enabled: !!channelId,
    });
    const { data: channel, refetch: refetchChannel } = useQuery({
        queryKey: ["channel"],
        queryFn: () => api.getChannel(channelId),
        enabled: !!channelId,
    });
    const [message, setMessage] = useState<string>("");
    const mutation = useMutation({
        mutationFn: (values: {
            values: {
                text: string;
                createdBy: string;
                timestamp: number;
            };
        }) => {
            if (!channelId) return Promise.reject(undefined);
            return api.sendMessage({ ...values, channelId });
        },
        onSuccess: () => refetchMessages(),
    });
    const messageContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        refetchMessages();
        refetchChannel();
    }, [channelId, refetchMessages, refetchChannel]);

    useEffect(() => {
        // Scroll to the bottom of the message container whenever new messages are added
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop =
                messageContainerRef.current.scrollHeight;
        }
    }, [messages]);

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
            <Stack
                h={`calc(100% - 90px)`}
                m={4}
                ref={messageContainerRef}
                overflowY="auto"
            >
                {messages?.map((message: Message, i: number) => {
                    return (
                        <Flex
                            key={i}
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
                <Flex position="sticky" bottom={0} p={2}>
                    <Input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setMessage(e.target.value);
                        }}
                    />
                    <Button
                        ml={5}
                        bg={`blue.500`}
                        variant="solid"
                        color={`white`}
                        onClick={() => {
                            mutation.mutate({
                                values: {
                                    text: message,
                                    createdBy: auth.uid,
                                    timestamp: Date.now(),
                                },
                            });
                        }}
                    >
                        Send
                    </Button>
                </Flex>
            </FormControl>
        </Flex>
    );
};
