import { io } from "socket.io-client";

const socket = io("http://localhost:4007", {
  autoConnect: false, 
});

export default socket;