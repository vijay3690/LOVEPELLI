import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./registration.css";

const COUNTRY_API = "https://lovepelliapi-gdcmb2ezcvcmedew.eastus2-01.azurewebsites.net/api/BasicDetails/countryCodes";
const VALIDATE_API = "https://lovepelliapi-gdcmb2ezcvcmedew.eastus2-01.azurewebsites.net/api/Users/ValidateUser";

const FormStepOne = ({ UserData, setUserData, nextStep }) => {
  const [errors, setErrors] = useState({});
  const [checking, setChecking] = useState(false);
  const [countryCodes, setCountryCodes] = useState([]);
  const navigate = useNavigate();

  // ✅ Utility to clear an error
  const clearError = (field) => {
    setErrors((prev) => {
      const { [field]: _, ...rest } = prev;
      return rest;
    });
  };

  // ✅ Validation Function
  const validate = () => {
    let newErrors = {};
    if (!UserData.firstName?.trim()) newErrors.firstName = "First Name is required";
    if (!UserData.lastName?.trim()) newErrors.lastName = "Last Name is required";
    if (!UserData.email?.trim()) newErrors.email = "Email is required";
    if (!UserData.password?.trim()) newErrors.password = "Password is required";
    if (!UserData.confirmPassword?.trim()) newErrors.confirmPassword = "Confirm Password is required";
    if (!UserData.gender) newErrors.gender = "Please select your gender";
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
    safeFetch(COUNTRY_API, setCountryCodes, "country codes");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
    clearError(name);
  };

  const handleNext = async () => {
    
    const isValid = validate();
    if (!isValid) return;

    setChecking(true);
    try {
      const fullcontactNumber = `${UserData.contactNumber}`.replace(/\D/g, "");
      const params = new URLSearchParams({
        email: UserData.email,
        contactNumber: fullcontactNumber,
      });

      const res = await fetch(`${VALIDATE_API}?${params.toString()}`);
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
        nextStep();
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
        <h2>Step 1: Basic Details</h2>

        {/* First + Last Name */}
        <div className="name-row">
          <div className="name-box">
            <label>
              First Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={UserData.firstName || ""}
              onChange={handleChange}
            />
            {errors.firstName && <p className="error-text">{errors.firstName}</p>}
          </div>

          <div className="name-box">
            <label>
              Last Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={UserData.lastName || ""}
              onChange={handleChange}
            />
            {errors.lastName && <p className="error-text">{errors.lastName}</p>}
          </div>
        </div>

        {/* Phone Number */}
        <label>
          Phone Number <span className="required">*</span>
        </label>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <select
            name="countryCode"
            value={UserData.countryCode || ""}
            onChange={handleChange}
          >
            <option value="">Select Code</option>
            {countryCodes.map((c) => (
              <option key={c.countryId} value={c.countryCode}>
                {c.countryName} {c.countryCode}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="contactNumber"
            placeholder="Contact Number"
            value={UserData.contactNumber || ""}
            onChange={handleChange}
          />
        </div>
        {errors.countryCode && <div className="error">{errors.countryCode}</div>}
        {errors.contactNumber && <div className="error">{errors.contactNumber}</div>}

        {/* Email */}
        <label>
          Email <span className="required">*</span>
        </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={UserData.email || ""}
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
            <label>
              Password <span className="required">*</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={UserData.password || ""}
              onChange={(e) => {
                const value = e.target.value;
                setUserData({ ...UserData, password: value });

                const regex =
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;

                if (!value) {
                  setErrors((prev) => ({ ...prev, password: "Password is required" }));
                } else if (!regex.test(value)) {
                  setErrors((prev) => ({
                    ...prev,
                    password: "Password must meet complexity rules",
                  }));
                } else {
                  clearError("password");
                }
              }}
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>
        </div>

        {/* Confirm Password */}
        <div className="password-box">
          <label>
            Confirm Password <span className="required">*</span>
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={UserData.confirmPassword || ""}
            onChange={(e) => {
              const value = e.target.value;
              setUserData({ ...UserData, confirmPassword: value });

              if (!value) {
                setErrors((prev) => ({
                  ...prev,
                  confirmPassword: "Confirm Password is required",
                }));
              } else if (value !== UserData.password) {
                setErrors((prev) => ({
                  ...prev,
                  confirmPassword: "Passwords do not match",
                }));
              } else {
                clearError("confirmPassword");
              }
            }}
          />
          {errors.confirmPassword && (
            <p className="error-text">{errors.confirmPassword}</p>
          )}
        </div>

          
              {/* Profile For */}
        <label>
          Profile For <span className="required">*</span>
        </label>
        <select
          name="profileForDataId"
          value={UserData.profileForDataId || ""}
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
          <label className="gender-label">
            Gender <span className="required">*</span>
          </label>
          <div className="radio-options">
            {["Male", "Female", "Others"].map((g) => {
              // disable logic
              let disabled = false;

              if ((UserData.profileForDataId === "2" || UserData.profileForDataId === "4") && g !== "Male") {
                disabled = true; // Son/Brother → only Male
              }
              if ((UserData.profileForDataId === "3" || UserData.profileForDataId === "5") && g !== "Female") {
                disabled = true; // Daughter/Sister → only Female
              }

              return (
                <label key={g} className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={UserData.gender === g}
                    disabled={disabled}
                    onChange={(e) => {
                      const value = e.target.value;
                      setUserData({ ...UserData, gender: value });

                      if (!value) {
                        setErrors((prev) => ({
                          ...prev,
                          gender: "Please select your gender",
                        }));
                      } else {
                        clearError("gender");
                      }
                    }}
                  />
                  {g}
                </label>
              );
            })}
          </div>
          {errors.gender && <p className="error-text">{errors.gender}</p>}
        </div>


        {/* Next Button */}
        <button className="next-btn" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default FormStepOne;
