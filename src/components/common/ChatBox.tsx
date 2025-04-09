import { createSocketConnection } from "../../utils/socket/socket";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { apiUserInstance } from "../../api/axiosInstance/axiosUserInstance";
import { apiClientInstance } from "../../api/axiosInstance/axiosClientRequest";
import { ClientState, UserState } from "../../config/state/allState";
import { Socket } from "socket.io-client";

interface ChatBoxProps {
    roleType: string
    targetId: string
};

interface Messages {
    name: string
    roleType: string
    text: string
};

const ChatBox: React.FC<ChatBoxProps> = ({ roleType, targetId }) => {

    const [messages, setMessages] = useState<Messages[]>([]);
    const [newMessage, setNewMessage] = useState<string>("");
    const socketRef = useRef<Socket | null>(null);

    let name, roleId;

    if (roleType === "user") {
        name = useSelector((state: UserState) => state?.user?.currentUser?.name);
        roleId = useSelector((state: UserState) => state?.user?.currentUser?._id);
    } else {
        name = useSelector(
            (state: ClientState) => state?.client?.currentClient?.companyName
        );
        roleId = useSelector(
            (state: ClientState) => state?.client?.currentClient?._id
        );
    }


    const fetchChatMessages = async () => {
        let response;
        if (roleType === "user") {
            response = await apiUserInstance.get(
                `/chat/view/${roleType}/${roleId}/${targetId}`,
                {
                    withCredentials: true,
                }
            );
        } else {
            console.log('Target id', targetId)
            response = await apiClientInstance.get(
                `/chat/view/${roleType}/${roleId}/${targetId}`,
                {
                    withCredentials: true,
                }
            );
        }

        console.log(response.data.messages.messages);
        setMessages(response.data.messages?.messages);
    };

    useEffect(() => {
        fetchChatMessages();
    }, [targetId]);

    useEffect(() => {
        if (!roleId || !targetId) return;
        if (!socketRef.current) {
            socketRef.current = createSocketConnection();
        }

        const socket = socketRef.current;
        socket.emit("joinChat", { name, roleId, targetId });

        socket.on("messageReceived", ({ name, text, roleType }) => {
            setMessages((messages) => [...messages, { name, text, roleType }]);
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.off("messageReceived");
            }
        };
    }, [roleId, targetId]);

    const sendMessage = () => {
        if (!socketRef.current) return;

        socketRef.current.emit("sendMessage", {
            name,
            roleType,
            roleId,
            targetId,
            text: newMessage,
        });
        setNewMessage("");
    };

    return (
        <div className="flex flex-col sm:p-4 rounded-xl shadow-2xl h-[70vh] border border-gray-800">
            {/* Messages Container */}
            <div
                id="messages"
                className="flex flex-col space-y-4 p-3 overflow-y-auto flex-grow scrollbar-hide"
            >
                <div className="chat-message">
                    {messages.map((message: Messages, index) => (
                        <div key={index}>
                            {roleType === "user" ? (
                                <div
                                    className={`grid gap-3 ${message.roleType === "user" ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                                        <span className="font-medium">{message.name}</span>
                                        <span className="px-4 py-2 rounded-large bg-gray-300 text-gray-600">
                                            {message.text}
                                        </span>
                                    </div>
                                    <img
                                        src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb"
                                        alt="Profile"
                                        className="w-6 h-6 rounded-full order-1"
                                    />
                                </div>
                            ) : (
                                <div
                                    className={`grid gap-3 ${message.roleType === "client" ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2">
                                        <span className="font-medium">{message.name}</span>
                                        <span className="px-4 py-2 rounded-large bg-gray-300 text-gray-600">
                                            {message.text}
                                        </span>
                                    </div>
                                    <img
                                        src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb"
                                        alt="Profile"
                                        className="w-6 h-6 rounded-full order-1"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Input Section */}
            <div className="border-t-2 border-gray-200 px-4 pt-4">
                <div className="relative flex">
                    <input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        type="text"
                        placeholder="Write your message!"
                        className="w-full focus:outline-none placeholder-gray-600 pl-4 bg-gray-200 rounded-small py-2.5 text-sm"
                    />
                    <button
                        onClick={sendMessage}
                        type="button"
                        className="ml-2 px-4 py-2 text-sm font-bold text-white bg-[#0000ff] rounded-large hover:bg-blue-400"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>

    );
};

export default ChatBox;
