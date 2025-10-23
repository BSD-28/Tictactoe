import { io } from "socket.io-client";
import BASE_URL from "../../constant";

export const socket = io(BASE_URL, {
    autoConnect: false,
    transports: ["websocket"],
    withCredentials: true,
});