import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from 'react-router-dom';
import "../../pages/userprofile/userprofile.css";
import { getUserFromToken } from "../../Utils/JwtHelper";
import { useNavigate } from "react-router-dom";
import Notifications from "../userprofile/notifications";
import Sidebar from "./sidebar";
import PreferenceSection from "./preferencesection";
import "./partnerpreferences.css";


function PartnerPreferences() {
const [close, setClose] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const bellRef = useRef(null);
  const dropdownRef = useRef(null);
  const userRef = useRef(null);
  const userDropdownRef = useRef(null);
  const ppRef = useRef(null);
  const user = getUserFromToken();
  const navigate = useNavigate();

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

  // Make only .pp-container scrollable: size it to viewport minus header
  useEffect(() => {
    function setPpHeight() {
      const headers = Array.from(document.querySelectorAll('.header, .header__bottom'));
      const headerHeight = headers.reduce((sum, el) => sum + (el ? el.offsetHeight : 0), 0);

      // Determine if any header is fixed (has class or computed style)
      const headerIsFixed = headers.some(el => {
        if (!el) return false;
        if (el.classList && el.classList.contains('header-fixed')) return true;
        const pos = window.getComputedStyle(el).position;
        return pos === 'fixed' || pos === 'sticky';
      });

      if (ppRef.current) {
        ppRef.current.style.height = `${window.innerHeight - headerHeight}px`;
        // If header is fixed, add top margin so content is not overlapped
        ppRef.current.style.marginTop = headerIsFixed ? `${headerHeight}px` : '0px';
      }
    }

    // Prevent body/window scrolling while on this page
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Recalculate on resize and scroll (header class may change on scroll)
    setPpHeight();
    window.addEventListener('resize', setPpHeight);
    window.addEventListener('scroll', setPpHeight, { passive: true });
    return () => {
      window.removeEventListener('resize', setPpHeight);
      window.removeEventListener('scroll', setPpHeight);
      document.body.style.overflow = previousBodyOverflow;
    };
  }, []);



  return (
    <>
    <div class="header__bottom">
        <div className="container">
          <nav className="navbar navbar-expand-lg">
            <Link className="navbar-brand" to="/homefour">
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
                    <NavLink to="/member-single">Home</NavLink>
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
                      <span role="img" aria-label="bell" style={{ fontSize: 18, color: "#21254f" }}>
                        🔔
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
                          <div className="profile-header">
                                  {user?.name || "User"}
                                </div>
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
                           <li
                              className="profile-list-item"
                              onClick={() => navigate("/editprofile")}
                              style={{ cursor: "pointer" }}
                            >
                              <span className="profile-icon">📝</span>
                              Edit profile
                            </li>
                            <li className="profile-list-item"
                               onClick={() => navigate("/partnerpreferences")}
                              style={{ cursor: "pointer" }}>
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
    <div ref={ppRef} className="pp-container" style={{ overflowY: 'auto' }}> 
     <Sidebar ppRef={ppRef} />

      <div className="pp-content">
        <h2>Partner Preferences</h2>
        <p className="pp-note">
          Matches recommended by us are based on acceptable matches criteria.
        </p>

        <PreferenceSection
          title="Basic Preferences"
          data={[
            { label: "Bride's Age", value: "21 - 29 years" },
            { label: "Height", value: "4 Ft 6 In - 5 Ft 6 In / 137 Cms - 168 Cms" },
            { label: "Marital Status", value: "Never Married" },
            { label: "Mother Tongue", value: "Telugu" },
            { label: "Physical Status", value: "Normal" },
            { label: "Eating Habits", value: "Doesn't matter" },
            { label: "Drinking Habits", value: "Never drinks" },
            { label: "Smoking Habits", value: "Never smokes" },
          ]}
        />

        <PreferenceSection
          title="Religious Preferences"
          data={[
            { label: "Religion", value: "Christian" },
            { label: "Division", value: "Roman Catholic, Caste no bar" },
            { label: "Caste", value: "Any" },
            { label: "Star", value: "Any" },
          ]}
        />

        <PreferenceSection
          title="Professional Preferences"
          data={[
            { label: "Education", value: "Bachelor's / Master's - Engineering" },
            { label: "Employed In", value: "Any" },
            { label: "Occupation", value: "Any" },
            { label: "Annual Income", value: "Any" },
          ]}
        />

        <PreferenceSection
          title="Location Preferences"
          data={[{ label: "Country", value: "Any" }]}
        />

        <PreferenceSection
          title="What we are looking for"
          data={[{ label: "", value: "Not Specified" }]}
        />
      </div>
    </div>
    </>
  );
};

export default PartnerPreferences;
