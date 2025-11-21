import { Fragment, useState, useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import "./Chat.css";

const Chat = ({ targetUserId, targetUser, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const connectionRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Get token from localStorage
  const getToken = () => {
    return localStorage.getItem("token");
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize SignalR connection
  useEffect(() => {
    if (!targetUserId) {
      console.error("Target user ID is missing");
      return;
    }

    connectSignalR();

    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop();
      }
    };
  }, [targetUserId]);

  const connectSignalR = async () => {
    try {
      setIsLoading(true);
      let baseUrl = import.meta.env.VITE_BASE_URL;
      const token = getToken();

      if (!token) {
        console.error("Authentication token not found");
        setIsLoading(false);
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
        .configureLogging(signalR.LogLevel.Information)
        .build();

      // Handle incoming private messages
      connection.on(
        "ReceivePrivateMessage",
        (senderId, senderName, message, timestamp) => {
          console.log("Message received:", {
            senderId,
            senderName,
            message,
            timestamp,
          });
          const newMessage = {
            id: Date.now(),
            senderId: senderId,
            senderName: senderName,
            content: message,
            timestamp: timestamp || new Date().toISOString(),
          };
          setMessages((prev) => [...prev, newMessage]);
        }
      );

      // Handle connection state changes
      connection.onreconnected(async () => {
        console.log("SignalR reconnected");
        setIsConnected(true);
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

      // Keep connection alive with server timeout
      connection.serverTimeoutInMilliseconds = 60000; // 60 seconds
      connection.keepAliveIntervalInMilliseconds = 30000; // 30 seconds

      connectionRef.current = connection;
    } catch (error) {
      console.error("Error connecting to SignalR:", error);
      setIsLoading(false);
      setIsConnected(false);
    }
  };

  const sendMessage = async (messageContent) => {
    if (
      connectionRef.current &&
      connectionRef.current.state === signalR.HubConnectionState.Connected
    ) {
      try {
        console.log(
          "Sending message to:",
          targetUserId,
          "Type:",
          typeof targetUserId,
          "Content:",
          messageContent
        );
        await connectionRef.current.invoke(
          "SendPrivateMessage",
          String(targetUserId),
          String(messageContent)
        );
      } catch (error) {
        console.error("Error sending message:", error);
      }
    } else {
      console.warn("SignalR connection is not established");
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputMessage.trim()) {
      return;
    }

    // Send message via SignalR
    await sendMessage(inputMessage);

    // Add message to local state immediately for UI feedback
    const newMessage = {
      id: Date.now(),
      senderId: "currentUser",
      senderName: "You",
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
  };

  // Provide fallback avatar
  const getAvatarUrl = (user) => {
    return (
      user?.imgUrl ||
      `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=random`
    );
  };

  const formatTime = (timestamp) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  };

  return (
    <Fragment>
      <div className="chat-container">
        {/* Chat Header */}
        <div className="chat-header">
          <div className="chat-header-left">
            <button className="chat-back-btn" onClick={onClose}>
              ← Back
            </button>
            {targetUser && (
              <div className="chat-header-info">
                <img
                  src={getAvatarUrl(targetUser)}
                  alt={targetUser.firstName}
                  className="chat-header-avatar"
                />
                <div>
                  <h5>{`${targetUser.firstName} ${targetUser.lastName}`}</h5>
                  <span
                    className={`chat-status ${
                      targetUser.isOnline ? "online" : "offline"
                    }`}
                  >
                    {targetUser.isOnline ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="chat-header-right">
            {!isConnected && !isLoading && (
              <span className="connection-status disconnected">●</span>
            )}
            {isConnected && (
              <span className="connection-status connected">●</span>
            )}
            {isLoading && <span className="connection-status loading">●</span>}
          </div>
        </div>

        {/* Messages Area */}
        <div className="chat-messages">
          {messages.length === 0 && !isLoading && (
            <div className="chat-empty-state">
              <p>No messages yet. Start the conversation!</p>
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={msg.id || index}
              className={`chat-message ${
                msg.senderName === "You" ? "own" : "other"
              }`}
            >
              {msg.senderName !== "You" && targetUser && (
                <img
                  src={getAvatarUrl(targetUser)}
                  alt={msg.senderName}
                  className="chat-message-avatar"
                />
              )}
              <div className="chat-message-content">
                <div className="chat-message-bubble">{msg.content}</div>
                <span className="chat-message-time">
                  {formatTime(msg.timestamp)}
                </span>
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="chat-input-area">
          <input
            type="text"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={!isConnected || isLoading}
            className="chat-input"
          />
          <button
            type="submit"
            disabled={!isConnected || isLoading || !inputMessage.trim()}
            className="chat-send-btn"
          >
            Send
          </button>
        </form>

        {isLoading && (
          <div className="chat-loading">
            <p>Connecting to chat...</p>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Chat;
