import { createContext, useState, useEffect, useContext } from "react";

import {
    collection,
    getDocs,
    getDoc,
    doc,
    addDoc,
    deleteDoc,
    updateDoc,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";

import { db } from "../utils/firebase/firebase.utils";
import io from "socket.io-client";
import useLocalStorage from "use-local-storage";

import { UserContext } from "./user.context";

import shortid from "shortid";

export const ChatContext = createContext();
const socket = io("https://hobbys-chat-engine.herokuapp.com");
export const ChatProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [roomID, setRoomID] = useState(null);
    const [room, setRoom] = useState(null);
    const [receiver, setReceiver] = useState(null);
    const [sender, setSender] = useState(null);
    const [unread, setUnread] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [chatDocs, setChatDocs] = useState(null);
    const { currentUser } = useContext(UserContext);

    // for message notifications

    const getChatDocs = async () => {
        const chatDocs = await collection(db, "chats");
        const chatSnapshot = await getDocs(chatDocs);
        const room = chatSnapshot.docs.map((doc) => {
            const docID = doc.id;
            return { doc: doc.data(), docID };
        });
        setChatDocs(room);
    };
    useEffect(() => {
        socket.on("receive_message", (data) => {
            setRoom((state) => {
                return {
                    ...state,
                    messages: [...state.messages, data],
                };
            });
        });
        getChatDocs();
    }, []);
    const joinRoom = async (receiver) => {
        const chatsCol = collection(db, "chats");
        setReceiver(receiver);
        const chatSnapshot = await getDocs(chatsCol);
        const room = chatSnapshot.docs
            .map((doc) => {
                const docID = doc.id;
                return { doc: doc.data(), docID };
            })
            .find(
                (doc) =>
                    (doc.doc?.receiver === receiver &&
                        doc.doc?.sender === currentUser.email) ||
                    (doc.doc?.receiver === currentUser.email &&
                        doc.doc?.sender === receiver)
            );

        if (room) {
            const messages = room.doc.messages.map((message) => {
                if (message.isRead === false) {
                    message.isRead = true;
                }
                return message;
            });
            const chatsCol = await doc(db, "chats", room.docID);
            await updateDoc(chatsCol, { messages });

            console.log(chatDocs, "chatDocs");
            const updateChatDocs = chatDocs.map((chatDoc) => {
                if (chatDoc.doc.id === room.doc.id) {
                    chatDoc.doc.messages = messages;
                }
                return chatDoc;
            });

            setRoom(room.doc);
            setRoomID(room.docID);
            await socket.emit("send_message", {});
            socket.emit("join_room", room.id);
            setChatDocs(updateChatDocs);
        } else {
            const id = shortid.generate();
            const newChat = {
                messages: [
                    {
                        content: "",
                        sender: "Bot",
                        date: new Date().toString(),
                        isRead: false,
                    },
                ],
                receiver: receiver,
                sender: currentUser.email,
                id,
            };
            await addDoc(collection(db, "chats"), newChat);
            joinRoom(receiver);
        }
    };
    useEffect(() => {
        if (currentUser) {
            const docRef = doc(db, "users", currentUser.uid);
            const gettingUser = async () => {
                const data = await getDoc(docRef);
                setUserData(data.data());
            };
            gettingUser();
        }
    }, [currentUser]);

    const sendMessage = async (e) => {
        e.preventDefault();
        const content = e.target.message.value;

        const data = {
            room: room.id,
            content,
            date: new Date().toDateString(),
            sender: currentUser?.email,
            isRead: false,
        };
        setRoom((state) => ({ ...state, messages: [...state.messages, data] }));
        e.target.reset();
        const chatsCol = await doc(db, "chats", roomID);
        await updateDoc(chatsCol, { messages: [...room.messages, data] });
        await socket.emit("send_message", data);
    };

    const value = {
        receiver,
        setReceiver,
        sender,
        setSender,
        joinRoom,
        room,
        sendMessage,
        setRoom,
        unread,
        setUnread,
        notifications,
        setNotifications,
        chatDocs,
    };
    return (
        <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
    );
};
