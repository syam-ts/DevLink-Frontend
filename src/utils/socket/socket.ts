import { io } from "socket.io-client";

const SOCKET_URL: string = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

export const createSocketConnection = () => {
    return io(SOCKET_URL, {
        transports: ["websocket", "polling"],
        withCredentials: true
    });
};