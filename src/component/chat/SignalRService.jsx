import {
  useState,
  useEffect,
  useRef,
  useCallback,
  createContext,
  useContext,
} from "react";
import * as signalR from "@microsoft/signalr";

// Create context for SignalR service
const SignalRContext = createContext(null);

export const SignalRProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const connectionRef = useRef(null);
  const messageHandlersRef = useRef({});
  const statusHandlersRef = useRef({});
  const typingHandlersRef = useRef({});

  // Get token from localStorage
  const getToken = () => {
    return localStorage.getItem("token");
  };

  // Initialize SignalR connection
  const initializeConnection = useCallback(async () => {
    try {
      if (
        connectionRef.current &&
        connectionRef.current.state === signalR.HubConnectionState.Connected
      ) {
        console.log("Connection already established");
        return;
      }

      setIsLoading(true);
      let baseUrl = import.meta.env.VITE_BASE_URL;
      const token = getToken();

      if (!token) {
        console.error("Authentication token not found");
        setIsLoading(false);
        setIsConnected(false);
        return;
      }

      // Convert HTTP/HTTPS to WS/WSS
      baseUrl = baseUrl
        .replace(/^https:\/\//, "wss://")
        .replace(/^http:\/\//, "ws://");

      const connection = new signalR.HubConnectionBuilder()
        .withUrl(`${baseUrl}/chatHub`, {
          accessTokenFactory: () => token,
          transport: signalR.HttpTransportType.WebSockets,
          skipNegotiation: true,
        })
        .withAutomaticReconnect([0, 0, 0, 1000, 3000, 5000])
        .withHubProtocol(new signalR.JsonHubProtocol())
        .configureLogging(signalR.LogLevel.Warning)
        .build();

      // Handle incoming private messages
      connection.on("ReceivePrivateMessage", (chatMessage) => {
        console.log("Message received:", chatMessage);

        // Call all registered message handlers for this user
        // A message should be delivered to handlers registered for the sender (fromUserId)
        // because the receiving ChatWindow registers handlers with the sender's userId
        const senderId = chatMessage?.fromUserId;
        console.log("Looking for handlers for senderId:", senderId);
        console.log(
          "Available handler keys:",
          Object.keys(messageHandlersRef.current)
        );

        if (senderId && messageHandlersRef.current[senderId]) {
          console.log("Found handlers for senderId, calling them");
          messageHandlersRef.current[senderId].forEach((handler) => {
            handler(chatMessage);
          });
        } else {
          console.log("No handlers found for senderId:", senderId);
        }
      });

      // Handle user connected
      connection.on("UserConnected", (userId) => {
        console.log("User connected:", userId);
        setOnlineUsers((prev) => new Set([...prev, userId]));

        // Call all registered status handlers
        Object.keys(statusHandlersRef.current).forEach((key) => {
          statusHandlersRef.current[key].forEach((handler) => {
            handler({ userId, status: "online" });
          });
        });
      });

      // Handle user disconnected
      connection.on("UserDisconnected", (userId) => {
        console.log("User disconnected:", userId);
        setOnlineUsers((prev) => {
          const newSet = new Set(prev);
          newSet.delete(userId);
          return newSet;
        });

        // Call all registered status handlers
        Object.keys(statusHandlersRef.current).forEach((key) => {
          statusHandlersRef.current[key].forEach((handler) => {
            handler({ userId, status: "offline" });
          });
        });
      });

      // Handle user typing
      connection.on("UserTyping", (senderId) => {
        console.log("User typing:", senderId);

        // Call all registered typing handlers
        Object.keys(typingHandlersRef.current).forEach((key) => {
          typingHandlersRef.current[key].forEach((handler) => {
            handler({ senderId });
          });
        });
      });

      // Handle receiving list of all online users
      connection.on("OnlineUsers", (onlineUserIds) => {
        console.log("Online users received:", onlineUserIds);

        // Update the onlineUsers set
        const onlineSet = new Set(onlineUserIds);
        setOnlineUsers(onlineSet);

        // Notify all registered status handlers about the online users list
        Object.keys(statusHandlersRef.current).forEach((key) => {
          statusHandlersRef.current[key].forEach((handler) => {
            onlineUserIds.forEach((userId) => {
              handler({ userId, status: "online" });
            });
          });
        });
      });

      // Handle connection state changes
      connection.onreconnected(async () => {
        console.log("SignalR reconnected");
        setIsConnected(true);
        setIsLoading(false);
      });

      connection.onreconnecting((error) => {
        console.log("SignalR reconnecting:", error);
        setIsConnected(false);
      });

      connection.onclose((error) => {
        console.log("SignalR disconnected:", error);
        setIsConnected(false);
      });

      // Start the connection
      await connection.start();
      console.log("SignalR connected");
      setIsConnected(true);
      setIsLoading(false);

      // Keep connection alive
      connection.serverTimeoutInMilliseconds = 60000; // 60 seconds
      connection.keepAliveIntervalInMilliseconds = 30000; // 30 seconds

      connectionRef.current = connection;
    } catch (error) {
      console.error("Error initializing SignalR:", error);
      setIsLoading(false);
      setIsConnected(false);
    }
  }, []);

  // Send private message
  const sendPrivateMessage = useCallback(
    async (targetUserId, messageContent) => {
      if (
        !connectionRef.current ||
        connectionRef.current.state !== signalR.HubConnectionState.Connected
      ) {
        console.warn("SignalR connection is not established");
        return false;
      }

      try {
        console.log(
          "Sending message to:",
          targetUserId,
          "Content:",
          messageContent
        );
        await connectionRef.current.invoke(
          "SendPrivateMessage",
          String(targetUserId),
          String(messageContent)
        );
        return true;
      } catch (error) {
        console.error("Error sending message:", error);
        return false;
      }
    },
    []
  );

  // Register message handler for a specific user
  const registerMessageHandler = useCallback((userId, handler) => {
    if (!messageHandlersRef.current[userId]) {
      messageHandlersRef.current[userId] = [];
    }
    messageHandlersRef.current[userId].push(handler);

    // Return unregister function
    return () => {
      messageHandlersRef.current[userId] = messageHandlersRef.current[
        userId
      ].filter((h) => h !== handler);
    };
  }, []);

  // Register status change handler (for online/offline updates)
  const registerStatusHandler = useCallback((handlerKey, handler) => {
    if (!statusHandlersRef.current[handlerKey]) {
      statusHandlersRef.current[handlerKey] = [];
    }
    statusHandlersRef.current[handlerKey].push(handler);

    // Return unregister function
    return () => {
      statusHandlersRef.current[handlerKey] = statusHandlersRef.current[
        handlerKey
      ].filter((h) => h !== handler);
    };
  }, []);

  // Register typing handler (for typing notifications)
  const registerTypingHandler = useCallback((handlerKey, handler) => {
    if (!typingHandlersRef.current[handlerKey]) {
      typingHandlersRef.current[handlerKey] = [];
    }
    typingHandlersRef.current[handlerKey].push(handler);

    // Return unregister function
    return () => {
      typingHandlersRef.current[handlerKey] = typingHandlersRef.current[
        handlerKey
      ].filter((h) => h !== handler);
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop();
      }
    };
  }, []);

  const value = {
    isConnected,
    isLoading,
    onlineUsers,
    initializeConnection,
    sendPrivateMessage,
    registerMessageHandler,
    registerStatusHandler,
    registerTypingHandler,
  };

  return (
    <SignalRContext.Provider value={value}>{children}</SignalRContext.Provider>
  );
};

// Hook to use SignalR service
export const useSignalR = () => {
  const context = useContext(SignalRContext);
  if (!context) {
    throw new Error("useSignalR must be used within SignalRProvider");
  }
  return context;
};
