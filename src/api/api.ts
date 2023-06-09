import { DocumentData, addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Channel, Message } from "../models";

export const api = {
    getChannels: async () => {
        const channelsRef = collection(db, "channels");
        const channelsSnapshot = await getDocs(channelsRef);
        return channelsSnapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        });
    },
    getChannel: async (
        channelId: string | undefined
    ): Promise<DocumentData | undefined> => {
        if (channelId == undefined) return {};
        const channels = await api.getChannels();
        return channels.find((channel) => channel.id === channelId);
    },
    createChannel: async (values: Channel): Promise<void> => {
        const channelsRef = collection(db, "channels");
        await addDoc(channelsRef, values);
    },
    getChannelMessages: async (
        channelId: string | undefined
    ): Promise<Message[] | undefined> => {
        if (!channelId) return [];
        const messagesRef = collection(db, "channels", channelId, "messages");
        const messagesSnapshot = await getDocs(messagesRef);
        return messagesSnapshot.docs
            .map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    text: data.text,
                    createdBy: data.createdBy,
                    timestamp: data.timestamp,
                };
            })
            .sort((a, b) => a.timestamp - b.timestamp);
    },
    sendMessage: async ({
        channelId,
        values,
    }: {
        channelId: string | undefined;
        values: Message;
    }) => {
        if (!channelId) return;
        const messagesRef = collection(db, "channels", channelId, "messages");
        await addDoc(messagesRef, values);
    },
};
