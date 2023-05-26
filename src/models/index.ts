import { DocumentReference } from "firebase/firestore";

export interface Channels {
    name: string;
    description: string;
    createdBy: DocumentReference;
    photoUrl: "string";
}
