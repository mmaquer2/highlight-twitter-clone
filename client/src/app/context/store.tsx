"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketProviderProps {
  socket: Socket | null;
}

const GlobalSocketContext = createContext<SocketProviderProps>({
  socket: null,
});

export const GlobalSocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("A user has connected to the socket server");
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <GlobalSocketContext.Provider value={{ socket }}>
      {children}
    </GlobalSocketContext.Provider>
  );
};

export const useSocket = () => useContext(GlobalSocketContext);
