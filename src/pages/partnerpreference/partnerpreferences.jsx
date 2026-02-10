import React, { useState, useRef, useEffect } from "react";
import "../../pages/userprofile/userprofile.css";
import { getUserFromToken } from "../../Utils/JwtHelper";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import PreferenceSection from "./preferencesection";
import "./partnerpreferences.css";
import Footer from "../../component/layout/footer";
import HeaderOne from "../../component/layout/headerone";


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
   <HeaderOne />
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
        <Footer />
      </div>
    </div>
    </>
  );
};

export default PartnerPreferences;
