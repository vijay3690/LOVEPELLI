import { Fragment, useState, useCallback, useEffect } from "react";
import ChatWindow from "./ChatWindow";
import "./ChatWindowContainer.css";

const ChatWindowContainer = () => {
  const [openChats, setOpenChats] = useState([]);
  const [closedChats, setClosedChats] = useState([]);
  const [chatMessages, setChatMessages] = useState({});
  const [focusedWindowId, setFocusedWindowId] = useState(null);
  const [minimizedWindows, setMinimizedWindows] = useState(new Set());

  // Add or bring to focus a chat window
  const addChatWindow = useCallback((member) => {
    setOpenChats((prev) => {
      // Check if chat window already exists
      const exists = prev.find((chat) => chat.userId === member.userId);
      if (exists) {
        // Bring to focus if already open
        setFocusedWindowId(member.userId);
        return prev;
      }

      // Load stored messages for this user
      try {
        const storedMessages = localStorage.getItem(
          `chat_messages_${member.userId}`
        );
        if (storedMessages) {
          const messages = JSON.parse(storedMessages);
          setChatMessages((prev) => ({
            ...prev,
            [member.userId]: messages,
          }));
        }
      } catch (error) {
        console.error("Error loading stored messages:", error);
      }

      // Add new chat window
      setFocusedWindowId(member.userId);
      let newChats = [
        ...prev,
        {
          windowId: member.userId,
          userId: member.userId,
          user: member,
        },
      ];

      // If more than 3 windows are open, close the first (oldest) one
      if (newChats.length > 3) {
        const closedChat = newChats[0];
        // Move to closed chats
        setClosedChats((prevClosed) => {
          const alreadyExists = prevClosed.find(
            (chat) => chat.userId === closedChat.userId
          );
          if (!alreadyExists) {
            return [...prevClosed, closedChat];
          }
          return prevClosed;
        });
        // Remove first chat from open
        newChats = newChats.slice(1);
      }

      // Remove newly added chat from closed chats if it was there
      setClosedChats((prevClosed) =>
        prevClosed.filter((chat) => chat.userId !== member.userId)
      );

      return newChats;
    });
  }, []);

  // Close a chat window
  const closeChatWindow = useCallback((windowId) => {
    setOpenChats((prev) => {
      const closedChat = prev.find((chat) => chat.windowId === windowId);
      if (closedChat) {
        setClosedChats((prevClosed) => {
          const alreadyExists = prevClosed.find(
            (chat) => chat.userId === closedChat.userId
          );
          if (!alreadyExists) {
            return [...prevClosed, closedChat];
          }
          return prevClosed;
        });
      }
      return prev.filter((chat) => chat.windowId !== windowId);
    });

    setMinimizedWindows((prev) => {
      const newSet = new Set(prev);
      newSet.delete(windowId);
      return newSet;
    });
  }, []);

  // Toggle minimize state of a window
  const toggleMinimizeWindow = useCallback((windowId) => {
    setMinimizedWindows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(windowId)) {
        newSet.delete(windowId);
      } else {
        newSet.add(windowId);
      }
      return newSet;
    });
  }, []);

  // Handle window focus
  const handleWindowFocus = useCallback((windowId) => {
    setFocusedWindowId(windowId);
    setOpenChats((prev) => {
      // Move focused window to the end (highest z-index)
      const index = prev.findIndex((chat) => chat.windowId === windowId);
      if (index > -1) {
        const [chat] = prev.splice(index, 1);
        return [...prev, chat];
      }
      return prev;
    });
  }, []);

  // Expose addChatWindow and closedChats for external use
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!window.chatWindowContainer) {
      window.chatWindowContainer = {
        addChatWindow,
        getClosedChats: () => closedChats,
        getChatMessages: () => chatMessages,
        updateChatMessages: (userId, messages) => {
          setChatMessages((prev) => ({
            ...prev,
            [userId]: messages,
          }));
        },
      };
    } else {
      window.chatWindowContainer.addChatWindow = addChatWindow;
      window.chatWindowContainer.getClosedChats = () => closedChats;
      window.chatWindowContainer.getChatMessages = () => chatMessages;
      window.chatWindowContainer.updateChatMessages = (userId, messages) => {
        setChatMessages((prev) => ({
          ...prev,
          [userId]: messages,
        }));
      };
    }

    // Emit custom event when closed chats change
    const event = new CustomEvent("closedChatsUpdated", {
      detail: { closedChats, chatMessages },
    });
    window.dispatchEvent(event);
  }, [addChatWindow, closedChats, chatMessages]);

  return (
    <Fragment>
      <div className="chat-windows-container">
        {openChats.map((chatData, index) => (
          <div
            key={chatData.windowId}
            style={{
              position: "fixed",
              bottom: "20px",
              right: `${20 + index * 300}px`,
              zIndex:
                focusedWindowId === chatData.windowId ? 1050 : 1000 - index,
            }}
          >
            <ChatWindow
              windowId={chatData.windowId}
              targetUserId={chatData.userId}
              targetUser={chatData.user}
              onClose={closeChatWindow}
              onFocus={handleWindowFocus}
              isMinimized={minimizedWindows.has(chatData.windowId)}
              onToggleMinimize={toggleMinimizeWindow}
            />
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default ChatWindowContainer;

// Helper function to open chat from anywhere in the app
export const openChatWindow = (member) => {
  if (window.chatWindowContainer && window.chatWindowContainer.addChatWindow) {
    window.chatWindowContainer.addChatWindow(member);
  }
};
