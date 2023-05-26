import { DocumentReference } from "firebase/firestore";

export interface Channel {
    name: string;
    description: string;
    createdBy: DocumentReference;
    photoUrl: "string";
}

export interface Message {
    text: string;
    createdBy: DocumentReference;
    id: string;
    timestamp: number;
    sendBy: DocumentReference;
}
