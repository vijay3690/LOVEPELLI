import React, { useState, useEffect } from 'react';
import "./registration.css";


const COUNTRY_API = "http://localhost:5103/api/BasicDetails/countryCodes";
const VALIDATE_API = "http://localhost:5103/api/Users/ValidateUser";

const FormStepOne = ({ UserData, setUserData, nextStep }) => {
  const [errors, setErrors] = useState({});
  const [checking, setChecking] = useState(false);
  const [countryCodes, setCountryCodes] = useState([]);

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

  // Local validation
 const validate = () => {
   const newErrors = {};
   if (!UserData.firstName) newErrors.firstName = "First name is required";
   if (!UserData.lastName) newErrors.lastName = "Last name is required";
   if (!UserData.contactNumber) newErrors.contactNumber = "Contact number is required";
   else if (!/^\d{7,15}$/.test(UserData.contactNumber))
     newErrors.contactNumber = "Contact number must be between 7–15 digits";
   if (!UserData.countryCode) newErrors.countryCode = "Country code is required";
   if (!UserData.email) newErrors.email = "Email is required";
   else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(UserData.email))
     newErrors.email = "Invalid email format";
   if (!UserData.password) newErrors.password = "Password is required";
   if (!UserData.gender) newErrors.gender = "Gender is required";
   if (!UserData.profileForDataId) newErrors.profileForDataId = "Profile For is required";
   return newErrors;
 };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSelect = (name, value) => {
    setUserData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleNext = async () => {
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setChecking(true);
    try {
     const fullcontactNumber = `${UserData.contactNumber}`.replace(/\D/g, '');
          const params = new URLSearchParams({
            email: UserData.email,
            contactNumber: fullcontactNumber
          });
      const res = await fetch(`${VALIDATE_API}?${params.toString()}`);
      if (!res.ok) {
        const msg = await res.text();
        setErrors(prev => ({ ...prev, api: msg || "Validation failed" }));
        setChecking(false);
        return;
      }
      const data = await res.json();
      const serverErrors = {};
      if (data.emailExists) serverErrors.email = "Email already exists";
      if (data.contactExists) serverErrors.contactNumber = "Phone number already exists";
      setErrors(serverErrors);
      setChecking(false);
      if (Object.keys(serverErrors).length === 0) nextStep();
    } catch (err) {
      setErrors(prev => ({ ...prev, api: "Server error. Please try again." }));
      setChecking(false);
    }
  };

  const selectedCountry = countryCodes.find(c => c.countryCode === UserData.countryCode);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Step 1: Basic Details</h2>

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={UserData.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <div className="error">{errors.firstName}</div>}

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={UserData.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <div className="error">{errors.lastName}</div>}

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <select
            name="countryCode"
            value={UserData.countryCode || ""}
            onChange={handleChange}
          >
            <option value="">Select Code</option>
            {countryCodes.map(c => (
              <option key={c.countryId} value={c.countryCode}>
                {c.countryName}  {c.countryCode}
              </option>
            ))}
          </select>
        {/* {selectedCountry && (
            <span style={{ fontWeight: "bold" }}>{selectedCountry.countryCode}</span>
          )}
            */}  
          <input
            type="number"
            name="contactNumber"
            placeholder="Contact Number"
            value={UserData.contactNumber}
            onChange={handleChange}
          />
        </div>
        {errors.countryCode && <div className="error">{errors.countryCode}</div>}
        {errors.contactNumber && <div className="error">{errors.contactNumber}</div>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={UserData.email}
          onChange={handleChange}
        />
        {errors.email && <div className="error">{errors.email}</div>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={UserData.password}
          onChange={handleChange}
        />
        {errors.password && <div className="error">{errors.password}</div>}

       <div className="gender-group">
          <label>Gender:</label>
          <div className="radio-options">
            {["Male", "Female", "Other"].map(g => (
              <label key={g}>
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={UserData.gender === g}
                  onChange={handleChange}
                />
                {g}
              </label>
            ))}
          </div>
        </div>
        {errors.gender && <div className="error">{errors.gender}</div>}
        <label>Profile For:</label>
          <select
            name="profileForDataId"
            value={UserData.profileForDataId}
            onChange={handleChange}
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
          <div className="error">{errors.profileForDataId}</div>

        {errors.api && <div className="error">{errors.api}</div>}
        {checking && <div className="info">Validating...</div>}

        <div className="button-group">
          <button className="next-btn" onClick={handleNext} disabled={checking}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormStepOne;