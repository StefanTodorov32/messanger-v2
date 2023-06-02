export interface Channel {
    name: string;
    description: string;
    createdBy: string;
    photoUrl: string;
}

export interface Message {
    text: string;
    createdBy: string;
    timestamp: number;
}
