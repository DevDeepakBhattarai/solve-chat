import { MessagesSquare, Pin } from "lucide-react";
import { ReactElement } from "react";
import Search from "./Search";
import User from "./User";
import * as admin from "firebase-admin";
import { initializeFirebaseAdmin } from "@/lib/initializeFirebaseAdmin";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/nextAuthConfig";
import { redirect } from "next/navigation";
import { Timestamp } from "firebase/firestore";
import { FieldPath } from "firebase-admin/firestore";
interface Props {}

interface Room {
  id: string;
  latestMessageSentAt: Timestamp;
  latestMessageSentBy: string;
  members: string[];
  latestMessage: string;
  roomName: string;
  roomImage: string;
}
async function getUser() {
  initializeFirebaseAdmin();
  const db = admin.firestore();
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    redirect("/");
  }
  const { user } = session;
  const { id } = user;

  const roomsSnapShot = await db
    .collection("rooms")
    .where("members", "array-contains", id)
    .orderBy("latestMessageSentAt")
    .limit(10)
    .get();

  const rooms: Room[] = await Promise.all(
    roomsSnapShot.docs.map(async (doc) => {
      const room = doc.data() as Room;

      // ! For two user room
      if (!room?.roomName) {
        //! Getting the other user
        const [otherUser] = room.members.filter((value) => value !== id);

        // ! Getting all the other user's data
        const user = (
          await db
            .collection("users")
            .where(FieldPath.documentId(), "==", otherUser)
            .get()
        ).docs[0]?.data();

        return {
          roomImage: user.image,
          roomName: user.name,
          id: doc.id,
          ...doc.data(),
        } as Room;
      }

      //! For multi user room
      return {
        id: doc.id,
        ...doc.data(),
      } as Room;
    })
  );

  return rooms;
}
export default async function Sidebar({}: Props) {
  const rooms = await getUser();
  console.log(rooms);
  return (
    <section className="flex flex-col shrink-0 h-screen gap-4 max-w-md w-full border-r-white/20 border border-transparent">
      <div>
        <div className="flex justify-between items-center px-4 h-24 border-b border-white/20">
          <span className="text-2xl font-bold text-primary">Messages</span>

          <Search></Search>
        </div>
      </div>
      <div className="px-4">
        {/* This is the pinned message section */}
        {/* Show this only when there are pinned messages */}
        <div>
          <h6 className="flex items-center gap-1  text-sm text-white/50 mb-3">
            <Pin className="h-3.5 w-3.5" /> Pinned Message
          </h6>
        </div>

        {/* This is the actual user message section */}
        <div>
          <h6 className="flex items-center gap-1  text-sm text-white/50 my-3">
            <MessagesSquare className="h-3.5 w-3.5" /> All messages
          </h6>
          {rooms.map((room) => {
            return (
              <User
                latestMessage={room.latestMessage}
                time={room.latestMessageSentAt.toDate()}
                ownImage={""}
                hasBeenSent={false}
                isBeingSent={false}
                hasBeenSeen={false}
                noOfMessageToSee={1}
                peerImage={room.roomImage}
                peerName={room.roomName}
                roomId={room.id}
                key={room.id}
              ></User>
            );
          })}
        </div>
      </div>
    </section>
  );
}
