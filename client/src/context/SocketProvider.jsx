import React, { createContext, useContext, useMemo } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);
//custom hook
export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};
export default function SocketProvider(props) {
  const socket = useMemo(() => io("http://localhost:7000"), []);
  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
}