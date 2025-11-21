import { Fragment, useState, useEffect, useRef } from "react";
import { useSignalR } from "./SignalRService";
import "./ChatWindow.css";

const ChatWindow = ({
  windowId,
  targetUserId,
  targetUser,
  onClose,
  onFocus,
  isMinimized,
  onToggleMinimize,
}) => {
  const [messages, setMessages] = useState(() => {
    // Initialize with stored messages if available
    if (typeof window !== "undefined" && targetUserId) {
      try {
        const stored = localStorage.getItem(`chat_messages_${targetUserId}`);
        return stored ? JSON.parse(stored) : [];
      } catch (error) {
        console.error("Error loading initial messages:", error);
        return [];
      }
    }
    return [];
  });
  const [inputMessage, setInputMessage] = useState("");
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [userOnlineStatus, setUserOnlineStatus] = useState(
    targetUser?.isOnline || false
  );
  const [currentUserId, setCurrentUserId] = useState(null);
  const typingTimeoutRef = useRef(null);
  const messagesEndRef = useRef(null);
  const {
    isConnected,
    isLoading,
    sendPrivateMessage,
    registerMessageHandler,
    registerTypingHandler,
    registerStatusHandler,
  } = useSignalR();

  // Get current user ID from token
  useEffect(() => {
    const getCurrentUserId = () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return null;
        }

        // Decode JWT token
        const parts = token.split(".");
        if (parts.length !== 3) {
          console.error("Invalid token format");
          return null;
        }

        const decoded = JSON.parse(atob(parts[1]));
        console.log("Decoded token:", decoded);

        // Try different possible user ID fields
        const userId =
          decoded.userId || decoded.sub || decoded.id || decoded.NameIdentifier;
        console.log("Extracted user ID:", userId, "Type:", typeof userId);
        return userId;
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    };

    const userId = getCurrentUserId();
    if (userId) {
      setCurrentUserId(userId);
    }
  }, []);

  // Save messages to localStorage
  const saveMessagesToStorage = (msgs) => {
    try {
      localStorage.setItem(
        `chat_messages_${targetUserId}`,
        JSON.stringify(msgs)
      );
    } catch (error) {
      console.error("Error saving messages to storage:", error);
    }
  };

  // Load messages from localStorage
  const loadMessagesFromStorage = () => {
    try {
      const stored = localStorage.getItem(`chat_messages_${targetUserId}`);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error loading messages from storage:", error);
      return [];
    }
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    if (!isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isMinimized]);

  // Track messages to ChatWindowContainer and save to localStorage
  useEffect(() => {
    // Save to localStorage
    saveMessagesToStorage(messages);

    // Update ChatWindowContainer
    if (
      window.chatWindowContainer &&
      window.chatWindowContainer.updateChatMessages
    ) {
      window.chatWindowContainer.updateChatMessages(targetUserId, messages);
    }
  }, [messages, targetUserId]);

  // Initialize SignalR connection and register message/typing handlers
  useEffect(() => {
    if (!targetUserId) {
      console.error("Target user ID is missing");
      return;
    }

    // Register message handler for this user
    const handleMessage = (chatMessage) => {
      console.log("Message handler called with:", chatMessage);
      console.log("Current targetUserId:", targetUserId);
      console.log("Message fromUserId:", chatMessage?.fromUserId);
      console.log("Message toUserId:", chatMessage?.toUserId);
      console.log("Message content property:", chatMessage?.message);

      // Get the message content (try multiple property names for compatibility)
      const messageContent =
        chatMessage?.message || chatMessage?.content || chatMessage?.text;

      // Only add message if content is not empty and it's from/to this user
      if (messageContent && messageContent.trim()) {
        const newMessage = {
          id: Date.now(),
          senderId: chatMessage.fromUserId,
          senderName: chatMessage.senderName || "User",
          content: messageContent,
          timestamp: chatMessage.sentAt || new Date().toISOString(),
        };
        console.log("Adding message to state:", newMessage);
        setMessages((prev) => [...prev, newMessage]);
      } else {
        console.log("Message filtered out - empty or missing content");
        console.log("Message object keys:", Object.keys(chatMessage || {}));
      }
    };

    // Register typing handler for this user
    const handleTyping = (typingData) => {
      if (typingData.senderId === targetUserId) {
        console.log("User typing:", typingData.senderId);
        setIsUserTyping(true);

        // Clear previous timeout
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }

        // Hide typing indicator after 3 seconds of no activity
        typingTimeoutRef.current = setTimeout(() => {
          setIsUserTyping(false);
        }, 3000);
      }
    };

    // Register status handler for this user
    const handleStatusChange = (statusData) => {
      if (statusData.userId === targetUserId) {
        console.log(
          "User status changed:",
          statusData.userId,
          statusData.status
        );
        setUserOnlineStatus(statusData.status === "online");
      }
    };

    const unregisterMessage = registerMessageHandler(
      targetUserId,
      handleMessage
    );
    const unregisterTyping = registerTypingHandler(
      `chatWindow_${targetUserId}`,
      handleTyping
    );
    const unregisterStatus = registerStatusHandler(
      `chatWindow_${targetUserId}`,
      handleStatusChange
    );

    return () => {
      unregisterMessage();
      unregisterTyping();
      unregisterStatus();
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [targetUserId]);

  const sendMessage = async (messageContent) => {
    const success = await sendPrivateMessage(targetUserId, messageContent);
    if (!success) {
      console.warn("Failed to send message");
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
    // Only add if content is not empty
    if (inputMessage && inputMessage.trim()) {
      const newMessage = {
        id: Date.now(),
        senderId: currentUserId,
        senderName: "You",
        content: inputMessage,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, newMessage]);
    }
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

  const handleWindowClick = (e) => {
    // Only focus if clicking on header area, not on interactive elements
    if (
      e.target.closest(".chat-window-input") ||
      e.target.closest(".chat-window-send-btn") ||
      e.target.closest(".chat-window-minimize-btn") ||
      e.target.closest(".chat-window-close-btn") ||
      e.target.closest(".chat-window-messages")
    ) {
      return;
    }
    if (onFocus) {
      onFocus(windowId);
    }
  };

  return (
    <Fragment>
      <div className="chat-window" onClick={handleWindowClick}>
        {/* Chat Header */}
        <div className="chat-window-header">
          <div className="chat-window-header-left">
            {targetUser && (
              <div className="chat-window-header-info">
                <img
                  src={getAvatarUrl(targetUser)}
                  alt={targetUser.firstName}
                  className="chat-window-header-avatar"
                />
                <div className="chat-window-header-text">
                  <h6>{`${targetUser.firstName} ${targetUser.lastName}`}</h6>
                  <span
                    className={`chat-window-status ${
                      userOnlineStatus ? "online" : "offline"
                    }`}
                  >
                    {userOnlineStatus ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="chat-window-header-right">
            <button
              className="chat-window-minimize-btn"
              onClick={(e) => {
                e.stopPropagation();
                onToggleMinimize(windowId);
              }}
              title={isMinimized ? "Maximize" : "Minimize"}
            >
              {isMinimized ? "+" : "−"}
            </button>
            <button
              className="chat-window-close-btn"
              onClick={(e) => {
                e.stopPropagation();
                onClose(windowId);
              }}
              title="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Messages Area */}
        {!isMinimized && (
          <Fragment>
            <div className="chat-window-messages">
              {messages.length === 0 && !isLoading && (
                <div className="chat-window-empty-state">
                  <p>Start the conversation!</p>
                </div>
              )}

              {messages.map((msg, index) => {
                const isOwnMessage =
                  String(msg.senderId) === String(currentUserId);
                return (
                  <div
                    key={msg.id || index}
                    className={`chat-window-message ${
                      isOwnMessage ? "own" : "other"
                    }`}
                  >
                    {!isOwnMessage && targetUser && (
                      <img
                        src={getAvatarUrl(targetUser)}
                        alt={msg.senderName}
                        className="chat-window-message-avatar"
                      />
                    )}
                    <div className="chat-window-message-content">
                      <div className="chat-window-message-bubble">
                        {msg.content}
                      </div>
                      <span className="chat-window-message-time">
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                  </div>
                );
              })}

              {isUserTyping && (
                <div className="chat-window-message other">
                  {targetUser && (
                    <img
                      src={getAvatarUrl(targetUser)}
                      alt={targetUser.firstName}
                      className="chat-window-message-avatar"
                    />
                  )}
                  <div className="chat-window-message-content">
                    <div className="chat-window-typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form
              onSubmit={handleSendMessage}
              className="chat-window-input-area"
            >
              <input
                type="text"
                placeholder="Type a message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={!isConnected || isLoading}
                className="chat-window-input"
              />
              <button
                type="submit"
                disabled={!isConnected || isLoading || !inputMessage.trim()}
                className="chat-window-send-btn"
              >
                Send
              </button>
            </form>
          </Fragment>
        )}

        {isLoading && !isMinimized && (
          <div className="chat-window-loading">
            <p>Connecting...</p>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ChatWindow;
