import { io } from "socket.io-client";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000"

export const socket = io(baseURL, {
  transports: ["websocket"],
});
