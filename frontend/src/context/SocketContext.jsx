import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io(
      import.meta.env.VITE_WS_URL || window.location.origin,
      {
        transports: ["websocket", "polling"],
      },
    );

    socketInstance.on("connect", () => {
      console.log("⚡ [Socket] Kết nối thành công tới WebSocket Server!");
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
