import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

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
    getChannelMessages: async (channelId: string | undefined) => {
        if(channelId == undefined) return []
        const messagesRef = collection(db, "channels", channelId, "messages");
        const messagesSnapshot = await getDocs(messagesRef);
        return messagesSnapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        });
    },
};

api.getChannels();
