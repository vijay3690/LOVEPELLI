
import React, { useState, useEffect,useRef} from "react";
import { Link,useNavigate } from "react-router-dom";
import "./registration.css";
import {isValidPhoneNumber} from "./registerconstants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import OtpDialog from "./dialogbox";


const FormStepOne = ({ UserData, setUserData, nextStep }) => {
  const [errors, setErrors] = useState({});
  const [checking, setChecking] = useState(false);
  const [countryCodes, setCountryCodes] = useState([]);
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("mobile");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(0);
  const [time, setTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const inputRefs = useRef([]);  

  const Base_api=import.meta.env.VITE_BASE_URL;

     const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault(); // stop form submit
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus(); // move to next field
      } else {
        document.getElementById("submitBtn").click(); // submit button action
      }
    }
  };

const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "otp") {
    setOtp(value);
  } else if (name === "contactNumber") {
    // validation logic for mobile number here
    if (/^\d*$/.test(value)) {
      setMobile(value);
      if (isValidPhoneNumber(value)) setError("");
      else if (value.length > 0)
        setError("Please enter a valid phone number to receive otp for verification");
      else setError("");
    } else {
      setError("Only digits are allowed.");
    }
  }

  setUserData(prev => ({ ...prev, [name]: value }));
  clearError(name);
};

const sendOtp = async () => {
  if (time > 0) return; // Prevent click during timer
  setLoading(true);
  setError("");
  setMessage("");
  if (!isValidPhoneNumber(mobile)) {
    setError("Please enter a valid phone number to receive otp for verification");
    return;
  }

  try {
    const res = await fetch(`${Base_api}/api/LoginWithMobile/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contactNumber: mobile.trim() }),
    });

    const data = await res.json().catch(() => ({ message: "Invalid server response" }));
    console.log("Send OTP Response:", data, "Status:", res.status);

    if (!res.ok) throw new Error(data?.message || "Failed to send OTP");

    await new Promise((resolve) => setTimeout(resolve, 3000));
    setMessage("OTP sent successfully!");
    setTime(30); // Start 30 sec timer
    setStep("otp"); // Proceed to OTP step
    setTimer(3); // Start timer for resend OTP
  } catch (err) {
    console.error("Send OTP Error:", err);
    setError(err.message.includes("fetch") ? "Server unreachable." : err.message);
  }finally {
      setLoading(false);
    }
};
// Countdown for resend timer
useEffect(() => {
  let interval;
  if (time > 0) {
    interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
  }
  return () => clearInterval(interval);
}, [time]);

// Countdown for message clear timer
useEffect(() => {
  let interval;
  if (timer > 0) {
    interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
  } else if (timer === 0) {
    setMessage(""); // Clear message when timer ends
  }
  return () => clearInterval(interval);
}, [timer]);

  // Clear error for single input
const clearError = (field) => {
  setErrors((prev) => {
    const copy = { ...prev };
    delete copy[field];
    return copy;
  });
};


  //  Validation Function
  const validate = () => {
    let newErrors = {};
    if (!UserData.firstName?.trim()) newErrors.firstName = "First Name is required";
    if (!UserData.lastName?.trim()) newErrors.lastName = "Last Name is required";
    if (!UserData.email?.trim()) newErrors.email = "Email is required";
    if (!UserData.password?.trim()) newErrors.password = "Password is required";
    if (!UserData.confirmPassword?.trim()) newErrors.confirmPassword = "Confirm Password is required";
    if (!UserData.gender?.trim()) newErrors.gender = "Please select your gender";
    if (!UserData.profileForDataId) newErrors.profileForDataId = "Please select profile for";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Utility for safe fetch
  const safeFetch = async (url, setter, label) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);
      const data = await res.json();
      setter(data);
    } catch (err) {
      console.error(`Error ${label} from ${url}:`, err);
    }
  };

  // Load country codes
  useEffect(() => {
    safeFetch(`${Base_api}/api/BasicDetails/countryCodes`, setCountryCodes, "country codes");
  }, []);

const validateBeforeNext = () => {
  if (!UserData.password || !UserData.confirmPassword) {
    setErrors((prev) => ({
      ...prev,
      confirmPassword: "Both fields are required",
    }));
    return false;
  }

  if (UserData.password !== UserData.confirmPassword) {
    setErrors((prev) => ({
      ...prev,
      confirmPassword: "Passwords do not match",
    }));
    return false;
  }

  return true;
};

const handleNext = async () => {

  // Validate password/confirm password first
  if (!validateBeforeNext()) return;

  // Validate other inputs
  const isValid = validate();  // your existing validate()
  if (!isValid) return;

  setChecking(true);

  try {
    const fullcontactNumber = `${UserData.contactNumber}`.replace(/\D/g, "");
    const params = new URLSearchParams({
      email: UserData.email,
      contactNumber: fullcontactNumber,
    });

    const res = await fetch(`${Base_api}/api/Users/ValidateUser?${params.toString()}`);

    if (!res.ok) {
      const msg = await res.text();
      setErrors((prev) => ({ ...prev, api: msg || "Validation failed" }));
      setChecking(false);
      return;
    }

    const data = await res.json();
    const serverErrors = {};

    if (data.emailExists) serverErrors.email = "Email already exists";
    if (data.contactExists) serverErrors.contactNumber = "Phone number already exists";

    setErrors(serverErrors);
    setChecking(false);

    if (Object.keys(serverErrors).length === 0) {
      nextStep(); // FINAL PROCEED
    }

  } catch (err) {
    setErrors((prev) => ({ ...prev, api: "Server error. Please try again." }));
    setChecking(false);
  }
};


  const closeModal = () => {
    navigate("/");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={closeModal}>
          ✖
        </button>
        <h2>Basic Details</h2>

        {/* First + Last Name */}
        <div className="name-row">
          <div className="name-box">
            <label className="labels">
              First Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={UserData.firstName || ""}
              ref={el => inputRefs.current[0] = el}
              onKeyDown={(e) => handleKeyDown(e, 0)}
              onChange={handleChange}
            />
            {errors.firstName && <p className="error-text">{errors.firstName}</p>}
          </div>

          <div className="name-box">
            <label className="labels">
              Last Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={UserData.lastName || ""}
              ref={el => inputRefs.current[1] = el}
              onKeyDown={(e) => handleKeyDown(e, 1)}
              onChange={handleChange}
            />
            {errors.lastName && <p className="error-text">{errors.lastName}</p>}
          </div>
        </div>

        {/* Phone Number */}
             <label className="labels">
        Contact Number <span className="required">*</span>
      </label>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <select
          name="countryCode"
          value={UserData.countryCode}   //  now always controlled
          ref={el => inputRefs.current[2] = el}
          onKeyDown={(e) => handleKeyDown(e, 2)}
          onChange={handleChange}
        >
          <option value="">Select Code</option>
          {countryCodes.map((c) => (
            <option key={c.countryId} value={c.countryCode}>
              {c.countryName} {c.countryCode}
            </option>
          ))}
        </select>
          <div className="contactInputWrapper">
            <input
              type="number"
              name="contactNumber"
              placeholder="Contact Number"
              value={UserData.contactNumber || ""}
               ref={el => inputRefs.current[3] = el}
                      onKeyDown={(e) => handleKeyDown(e, 3)}
              onChange={handleChange}
              className="contactInput"
              autoComplete="tel"
              inputMode="numeric"
            />
       </div>
      </div>
      {errors.countryCode && <div className="error">{errors.countryCode}</div>}
      {errors.contactNumber && <div className="error">{errors.contactNumber}</div>}
       
           {step === "otp" && (
        <div className="otpRow">
         <OtpDialog
            step={step}
            mobile={mobile}

          />

        </div>
          )}
           {step === "done" && <p>OTP Verified, proceed to next step</p>}

          {error && <p style={{ color: "red" }}>{error}</p>}
          {message && <p style={{ color: "green" }}>{message}</p>}
        
   <div className="otpSection">
            {/* Use a button or a styled Link here */}
              {/* Full Screen Overlay Loader */}
              {loading && (
                <div className="overlay-loader">
                  <div className="spinner"><img src="assets/images/gifs/Spinner1.gif" alt="Spinner" /></div>
                  <p>Sending OTP...</p>
                </div>
              )}
        <Link
              type="submit"
              className="sendOtpBtn"
              ref={el => inputRefs.current[4] = el}
              onKeyDown={(e) => handleKeyDown(e, 4)}
              onClick={sendOtp}
              disable={loading}
              disabled={isValidPhoneNumber(UserData.contactNumber || "")}
              aria-disabled={isValidPhoneNumber(UserData.contactNumber || "")}
              tabIndex={isValidPhoneNumber(UserData.contactNumber || "") ? -1 : 0}
            >
              {time > 0 ? `Resend in ${time}s` : "Send OTP"}
        </Link>
          </div>
          
        {/* Email */}
        <label className="labels">
          Email <span className="required">*</span>
        </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={UserData.email || ""}
           ref={el => inputRefs.current[5] = el}
           onKeyDown={(e) => handleKeyDown(e, 5)}
          onChange={(e) => {
            const value = e.target.value;
            setUserData({ ...UserData, email: value });

            if (!value) {
              setErrors((prev) => ({ ...prev, email: "Email is required" }));
            } else if (
              !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)
            ) {
              setErrors((prev) => ({
                ...prev,
                email: "Enter a valid email",
              }));
            } else {
              clearError("email");
            }
          }}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}

        {/* Password */}
        <div className="password-row">
          <div className="password-box">

              <div className="password-container">
                  <label className="labels">
                    Password <span className="required">*</span>
                  </label>
            <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="password-input"
                placeholder="Enter Password"
                value={UserData.password || ""}
                ref={(el) => (inputRefs.current[6] = el)}
                onKeyDown={(e) => handleKeyDown(e, 6)}
                onChange={(e) => {
                          const value = e.target.value;
                          setUserData({ ...UserData, password: value });

                          const regex =
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

                          if (!value) {
                            setErrors((prev) => ({ ...prev, password: "Password is required" }));
                            setIsPasswordMatch(false);
                          } else if (!regex.test(value)) {
                            setErrors((prev) => ({
                              ...prev,
                              password:
                                "Password must be 8+ characters & include uppercase, lowercase, number & special character",
                            }));
                            setIsPasswordMatch(false);
                          } else {
                            clearError("password");
                          }

                          // Re-check confirm password match
                          if (UserData.confirmPassword && UserData.confirmPassword === value) {
                            setIsPasswordMatch(true);
                            clearError("confirmPassword");
                          } else {
                            setIsPasswordMatch(false);
                          }
                        }}
                     />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="password-toggle-icon"
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </span>

                </div>
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>
        </div>

        {/* Confirm Password */}
        <div className="password-box">
          <div className="password-container">
      <label className="labels">
        Confirm Password <span className="required">*</span>
      </label>
      <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              className="password-input"
              placeholder="Confirm Password"
              value={UserData.confirmPassword || ""}
              ref={(el) => (inputRefs.current[7] = el)}
              onKeyDown={(e) => handleKeyDown(e, 7)}
              onChange={(e) => {
                    const value = e.target.value;
                    setUserData({ ...UserData, confirmPassword: value });

                    if (!value) {
                      setErrors((prev) => ({
                        ...prev,
                        confirmPassword: "Confirm Password is required",
                      }));
                      setIsPasswordMatch(false);
                    } else if (value !== UserData.password) {
                      setErrors((prev) => ({
                        ...prev,
                        confirmPassword: "Passwords do not match",
                      }));
                      setIsPasswordMatch(false);
                    } else {
                      clearError("confirmPassword");
                      setIsPasswordMatch(true);
                    }
                  }}
              style={{ paddingRight: "40px" }}
       />

        <span
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="password-toggle-icon"
        >
          <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
        </span>
    </div>
    <div>
           {/* ADD SUCCESS MESSAGE HERE */}
            {isPasswordMatch && (
              <p style={{ color: "green", marginTop: "0px", fontSize: "14px" }}>
                ✓ Passwords match
              </p>
              )}
    </div>
          {errors.confirmPassword && (
            <p className="error-text">{errors.confirmPassword}</p>
          )}
        </div>

          
              {/* Profile For */}
        <label className="labels">
          Profile For <span className="required">*</span>
        </label>
        <select
          name="profileForDataId"
          value={UserData.profileForDataId || ""}
           ref={el => inputRefs.current[8] = el}
                      onKeyDown={(e) => handleKeyDown(e, 8)}
          onChange={(e) => {
            const value = e.target.value;
            setUserData({ ...UserData, profileForDataId: value });

            // Auto-gender logic
            if (value === "2" || value === "4") {
              // Son / Brother → Male
              setUserData((prev) => ({ ...prev, gender: "Male" }));
            } else if (value === "3" || value === "5") {
              // Daughter / Sister → Female
              setUserData((prev) => ({ ...prev, gender: "Female" }));
            }

            if (!value) {
              setErrors((prev) => ({
                ...prev,
                profileForDataId: "Please select profile for",
              }));
            } else {
              clearError("profileForDataId");
            }
          }}
        >
          <option value="">Select</option>
          <option value="1">Myself</option>
          <option value="2">Son</option>
          <option value="3">Daughter</option>
          <option value="4">Brother</option>
          <option value="5">Sister</option>
          <option value="6">Relative</option>
          <option value="7">Friend</option>
          <option value="8">Other</option>
        </select>
        {errors.profileForDataId && (
          <p className="error-text">{errors.profileForDataId}</p>
        )}

        {checking && <div className="info">Validating...</div>}

        {/* Gender */}
    <div className="gender-group">
  <label className="labels">
    Gender <span className="required">*</span>
  </label>

  <div className="radio-options">
    {["Male", "Female", "Others"].map((g) => {
      let disabled = false;

      // Son (2) or Brother (4) → only Male
      if ((UserData.profileForDataId === "2" || UserData.profileForDataId === "4") && g !== "Male") {
        disabled = true;
      }

      // Daughter (3) or Sister (5) → only Female
      if ((UserData.profileForDataId === "3" || UserData.profileForDataId === "5") && g !== "Female") {
        disabled = true;
      }

      return (
        <label key={g} className="radio-label">
          <input
            type="radio"
            name="gender"
            value={g}
            checked={UserData.gender === g}
            disabled={disabled}
            ref={el => inputRefs.current[9] = el}
                      onKeyDown={(e) => handleKeyDown(e, 9)}
            onChange={(e) => {
            const value = e.target.value;
            setUserData({ ...UserData, gender: value });

              // Clear error when user selects a valid gender
              clearError("gender");
            }}
          />
          {g}
        </label>
      );
    })} 
  </div>

  {/* Show validation error only if no gender selected */}
  {!UserData.gender && errors.gender && (
    <p className="error-text">{errors.gender}</p>
  )}
</div>
        {/* Next Button */}
       <button
            id="submitBtn"
            className="next-btn"
            onClick={handleNext}
            disabled={!isPasswordMatch}   // <--- disable logic
            style={{ opacity: !isPasswordMatch ? 0.5 : 1, cursor: !isPasswordMatch ? "not-allowed" : "pointer" }}>
                  Next
     </button>
      </div>
    </div>
  );
};

export default FormStepOne;
