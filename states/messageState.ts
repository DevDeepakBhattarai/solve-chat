import { create } from "zustand";
interface Rooms {
  messages: Message[];
  id: string;
  latestMessage: string;
  latestMessageSentBy: string;
  latestMessageSentAt: string;
  noOfMessageToSee: number;
  latestEvent: string;
}

type setRoom = {
  setMessages: (messages: Message) => void;
  setRoomId: (roomId: string) => void;
  setLatestMessage: (latestMessage: string) => void;
  setSentBy: (sentBy: string) => void;
  setSentAt: (sentAt: string) => void;
  setNoOfMessageToSee: (noOfMessageToSee: number) => void;
  setLatestEvent: (latestEvent: string) => void;
};

export const useMessage = create<Rooms & setRoom>((set) => ({
  messages: [],
  id: "",
  latestMessage: "",
  latestMessageSentBy: "",
  latestMessageSentAt: "",
  noOfMessageToSee: 0,
  latestEvent: "",
  setMessages: (message) =>
    set((state) => ({ ...state, messages: [...state.messages, message] })),
  setRoomId: (roomId) => {
    set({ id: roomId });
  },
  setLatestMessage: (latestMessage) => {
    set({ latestMessage: latestMessage });
  },
  setSentBy: (sentBy) => {
    set({ latestMessageSentBy: sentBy });
  },
  setSentAt: (sentAt) => {
    set({ latestMessageSentAt: sentAt });
  },
  setNoOfMessageToSee: (noOfMessageToSee) => {
    set({ noOfMessageToSee: noOfMessageToSee });
  },
  setLatestEvent: (latestEvent) => {
    set({ latestEvent: latestEvent });
  },
}));
