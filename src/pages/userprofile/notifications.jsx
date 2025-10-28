import React, { useState } from "react";
import "./userprofile.css";

const notificationTabs = [
  { label: "All", value: "all" },
  { label: "Interactions", value: "interactions" },
  { label: "Urgent", value: "urgent" }
];

const notifications = [
  {
    id: 1,
    user: "Sharun Anusha",
    text: "has viewed your profile",
    avatar: "/avatars/avatar1.jpg", // Use real path or default image
    time: "1w"
  },
  {
    id: 2,
    user: "Kalangi Virginia Becelia",
    text: "has viewed your profile",
    avatar: "/avatars/avatar2.jpg",
    time: "1w"
  }
];

 function Notification() {
  const [activeTab, setActiveTab] = useState("all");
  
  return (
    <div className="notification-dropdown">
      <div className="dropdown-arrow" />
      <div className="dropdown-inner">
        <div className="dropdown-header">Notifications</div>
        <div className="dropdown-tabs">
          {notificationTabs.map(tab => (
            <button
              key={tab.value}
              className={activeTab === tab.value ? "dropdown-tab active" : "dropdown-tab"}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="dropdown-time-label">Earlier this week</div>
        <div className="dropdown-list">
          {notifications.map(item => (
            <div className="dropdown-notification" key={item.id}>
              <div className="notification-avatar">
                <img src={item.avatar} alt={item.user} />
              </div>
              <div className="notification-main">
                <div className="notification-text">
                  <span className="notification-user">{item.user}</span>&nbsp;
                  <span>{item.text}</span>
                </div>
                <div className="notification-meta">
                  <span className="notification-time">{item.time}</span>
                  <span className="notification-menu">•••</span>
                </div>
                <button className="view-profile-btn">View profile</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notification;