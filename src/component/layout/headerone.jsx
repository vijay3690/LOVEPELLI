import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from 'react-router-dom';
import { HEADER_INFOLIST, HEADER_SOCIALLIST } from "./layoutconsts";
import Notifications from "../../pages/userprofile/notifications";
import "../../pages/userprofile/userprofile.css";
import { Bold } from "lucide-react";

function HeaderOne() {
  const [close, setClose] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const bellRef = useRef(null);
  const dropdownRef = useRef(null);
  const userRef = useRef(null);
  const userDropdownRef = useRef(null);

  // Scroll effect for header
  useEffect(() => {
    function handleScroll() {
      const value = window.scrollY;
      const header = document.querySelector('.header');

      if (header) {
        if (value > 200) {
          header.classList.add('header-fixed', 'animated', 'fadeInDown');
        } else {
          header.classList.remove('header-fixed', 'animated', 'fadeInDown');
        }
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to close notification dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        close &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        bellRef.current &&
        !bellRef.current.contains(event.target)
      ) {
        setClose(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [close]);

  // Click outside to close user dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        showUserDropdown &&
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target) &&
        userRef.current &&
        !userRef.current.contains(event.target)
      ) {
        setShowUserDropdown(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showUserDropdown]);

  return (
    <header className="header header--style2" id="navbar">
      <div className="header__top d-none d-lg-block">
        <div className="container">
          <div className="header__top--area">
            <div className="header__top--left">
              <ul>
                {HEADER_INFOLIST.map((val, i) => (
                  <li key={i}>
                    <i className={val.iconName}></i> <span>{val.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="header__top--right">
              <ul>
                {HEADER_SOCIALLIST.map((val, i) => (
                  <li key={i}>
                    <a href={val.link}>
                      <i className={val.iconName}></i>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="header__bottom">
        <div className="container">
          <nav className="navbar navbar-expand-lg">
            <Link className="navbar-brand" to="/headerone">
              <img src="assets/images/logo/lovepelli_logo_big.png" alt="logo" />
            </Link>
            <button
              className="navbar-toggler collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler--icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
              <div className="navbar-nav mainmenu">
                <ul>
                  <li>
                    <NavLink to="/headerone">Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/members">Matches</NavLink>
                  </li>
                  <li>
                    <NavLink to="/interests">Interests</NavLink>
                  </li>
                  <li>
                    <NavLink to="/members">Messages</NavLink>
                  </li>
                  <li>
                    <NavLink to="/activity">Search</NavLink>
                  </li>
                  <li style={{ position: "relative" }}>
                    <button
                      ref={bellRef}
                      className="notification-bell"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        marginRight: "12px",
                        position: "relative",
                        outline: "none"
                      }}
                      onClick={() => setClose(v => !v)}
                      aria-label="Notifications"
                    >
                      <span role="img" aria-label="bell" style={{ fontSize: 16, color: "#21254f" }}>
                        Notifications 🔔
                      </span>
                    </button>
                    {close && (
                      <div ref={dropdownRef}>
                        <Notifications close={() => setClose(false)} />
                      </div>
                    )}
                  </li>
                </ul>
              </div>
              <div style={{ position: "relative" }}>
                <ul>
                  <li>
                    <button
                      ref={userRef}
                      onClick={() => setShowUserDropdown(v => !v)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0
                      }}
                      aria-label="User profile"
                    >
                      <img 
                        className="userprofile" 
                        src="assets/images/logo/userprofile.png" 
                        alt="user" 
                      />
                    </button>
                    {showUserDropdown && (
                      <div ref={userDropdownRef} className="user-dropdown-wrapper">
                        <div className="profile-dropdown-container">
                          <div className="profile-header">Vijaydeep</div>
                          <div className="profile-sub">
                            <span role="img" aria-label="telugu">🌐</span> LovePelli Matrimony
                          </div>
                          <div className="profile-id">T9933236</div>
                          <div className="profile-membership">Free member</div>

                          <div className="upgrade-box">
                            <span>
                              Upgrade membership to call<br />
                              or message with matches
                            </span>
                            <button className="upgrade-btn">Upgrade now</button>
                          </div>

                          <div className="profile-separator" />

                          <div className="switch-account">
                            <span className="profile-icon">🔄</span>
                            Switch account
                          </div>

                          <ul className="profile-list">
                            <li className="profile-list-item">
                              <span className="profile-icon">📝</span>
                              Edit profile
                            </li>
                            <li className="profile-list-item">
                              <span className="profile-icon">⚙️</span>
                              Edit preferences
                            </li>
                            <li className="profile-list-item">
                              <span className="profile-icon">✅</span>
                              Verify your profile
                            </li>
                          </ul>

                          <div className="profile-list-item">
                            <span className="profile-icon">💬</span>
                            Support &amp; feedback
                          </div>
                          <ul className="profile-list">
                            <li className="profile-list-item">
                              <span className="profile-icon">⚙️</span>
                              Settings
                            </li>
                          </ul>
                          <ul className="button-group">
                            <li>
                              <Link to="/logout" className="default-btn login">
                                <span>LOGOUT</span>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default HeaderOne;
