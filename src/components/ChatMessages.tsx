import {
    Avatar,
    Box,
    Button,
    Flex,
    FormControl,
    Input,
    Kbd,
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
        onSuccess: () => {
            return refetchMessages();
        },
    });
    const messageContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        refetchMessages();
        refetchChannel();
    }, [channelId, refetchMessages, refetchChannel]);

    useEffect(() => {
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
                    const isOwner = message.createdBy == auth.uid;
                    const date = new Date(message.timestamp);
                    return (
                        <Flex
                            key={i}
                            alignSelf={isOwner ? `flex-end` : `flex-start`}
                            flexDirection={`row`}
                            justifyContent={`flex-start`}
                            m={2}
                            p={3}
                            bg={
                                isOwner
                                    ? `blue.500`
                                    : `rgba(255, 255, 255, 0.08)`
                            }
                            borderRadius={10}
                            alignItems={`center`}
                        >
                            {isOwner ? (
                                <>
                                    <Text fontSize={`xl`}>{message.text}</Text>
                                    <Box bg={`whiteAlpha.200`} ml={2}>
                                        {date.getHours()}:{date.getHours()}
                                    </Box>
                                </>
                            ) : (
                                <>
                                    <Box mr={2}>
                                        {date.getHours()}:{date.getHours()}
                                    </Box>
                                    <Text fontSize={`xl`}>{message.text}</Text>
                                </>
                            )}
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
                        value={message}
                    />
                    <Button
                        ml={5}
                        bg={`blue.500`}
                        variant="solid"
                        color={`white`}
                        onClick={() => {
                            if (!message || message == "") return;
                            mutation.mutate({
                                values: {
                                    text: message,
                                    createdBy: auth.uid,
                                    timestamp: Date.now(),
                                },
                            });
                            setMessage("");
                        }}
                    >
                        Send
                    </Button>
                </Flex>
            </FormControl>
        </Flex>
    );
};
