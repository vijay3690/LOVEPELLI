import { Fragment, useState, useEffect } from "react";
import { openChatWindow } from "./ChatWindowContainer";
import { useSignalR } from "./SignalRService";
import "./ChatMembersList.css";

const ChatMembersList = ({ members, onSelectMember }) => {
  const [closedChats, setClosedChats] = useState([]);
  const [chatMessages, setChatMessages] = useState({});
  const [memberStatus, setMemberStatus] = useState({});
  const { initializeConnection, registerStatusHandler } = useSignalR();

  // Initialize SignalR connection when members are loaded
  useEffect(() => {
    if (members && members.length > 0) {
      initializeConnection();

      // Register status handler to track online/offline changes
      const unregister = registerStatusHandler(
        "chatMembersList",
        (statusUpdate) => {
          setMemberStatus((prev) => ({
            ...prev,
            [statusUpdate.userId]: statusUpdate.status === "online",
          }));
        }
      );

      return unregister;
    }
  }, [members]);
  useEffect(() => {
    const handleClosedChatsUpdate = (event) => {
      setClosedChats(event.detail.closedChats || []);
      setChatMessages(event.detail.chatMessages || {});
    };

    window.addEventListener("closedChatsUpdated", handleClosedChatsUpdate);

    // Get initial closed chats if available
    if (
      window.chatWindowContainer &&
      window.chatWindowContainer.getClosedChats
    ) {
      setClosedChats(window.chatWindowContainer.getClosedChats());
      if (window.chatWindowContainer.getChatMessages) {
        setChatMessages(window.chatWindowContainer.getChatMessages());
      }
    }

    return () => {
      window.removeEventListener("closedChatsUpdated", handleClosedChatsUpdate);
    };
  }, []);

  const handleMemberClick = (member) => {
    // Open chat window for this member
    openChatWindow(member);

    // Still call the callback if provided
    if (onSelectMember) {
      onSelectMember(member);
    }
  };

  // Check if a member has active messages in chat
  const hasActiveChatSession = (memberId) => {
    const userMessages = chatMessages[memberId];
    return userMessages && userMessages.length > 0;
  };

  // Provide fallback avatar
  const getAvatarUrl = (member) => {
    return (
      member.imgUrl ||
      `https://ui-avatars.com/api/?name=${member.firstName}+${member.lastName}&background=random`
    );
  };

  // Determine online status - use real-time updates if available, fallback to member data
  const getStatusClass = (member) => {
    // Check if we have real-time status for this user
    if (memberStatus[member.userId] !== undefined) {
      return memberStatus[member.userId] ? "online" : "offline";
    }
    // Fallback to member's isOnline property
    return member.isOnline ? "online" : "offline";
  };

  return (
    <Fragment>
      <div className="chat-members-list">
        <div className="chat-members-header">
          <h5>Members</h5>
        </div>
        <div className="chat-members-container">
          {members && members.length > 0 ? (
            members.map((member, index) => (
              <div
                key={member.userId || index}
                className={`chat-member-item ${
                  hasActiveChatSession(member.userId)
                    ? "has-active-session"
                    : ""
                }`}
                onClick={() => handleMemberClick(member)}
              >
                <div className="chat-member-avatar">
                  <img
                    src={getAvatarUrl(member)}
                    alt={`${member.firstName} ${member.lastName}`}
                  />
                  <span className={getStatusClass(member)}></span>
                </div>
                <div className="chat-member-info">
                  <h6>{`${member.firstName} ${member.lastName}`}</h6>
                  <p>{member.email || "No email"}</p>
                </div>
                {hasActiveChatSession(member.userId) && (
                  <div
                    className="chat-active-indicator"
                    title="Chat in progress"
                  >
                    💬
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="no-members">No members available</p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ChatMembersList;
