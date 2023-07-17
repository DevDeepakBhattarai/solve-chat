import { create } from "zustand";
interface Rooms {
  messages: Message[];
  roomId: string;
  latestMessage: string;
  sentBy: string;
  sentAt: string;
  noOfMessageToSee: number;
  latestEvent: string;
  setMessages: (messages: Message) => void;
  setRoomId: (roomId: string) => void;
  setLatestMessage: (latestMessage: string) => void;
  setSentBy: (sentBy: string) => void;
  setSentAt: (sentAt: string) => void;
  setNoOfMessageToSee: (noOfMessageToSee: number) => void;
  setLatestEvent: (latestEvent: string) => void;
}

export const useMessage = create<Rooms>((set) => ({
  messages: [],
  roomId: "",
  latestMessage: "",
  sentBy: "",
  sentAt: "",
  noOfMessageToSee: 0,
  latestEvent: "",
  setMessages: (message) =>
    set((state) => ({ ...state, messages: [...state.messages, message] })),
  setRoomId: (roomId) => {
    set({ roomId: roomId });
  },
  setLatestMessage: (latestMessage) => {
    set({ latestMessage: latestMessage });
  },
  setSentBy: (sentBy) => {
    set({ sentBy: sentBy });
  },
  setSentAt: (sentAt) => {
    set({ sentAt: sentAt });
  },
  setNoOfMessageToSee: (noOfMessageToSee) => {
    set({ noOfMessageToSee: noOfMessageToSee });
  },
  setLatestEvent: (latestEvent) => {
    set({ latestEvent: latestEvent });
  },
}));
