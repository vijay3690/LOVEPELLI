import React, { useState } from 'react';
import "./registration.css";

const FormStepOne = ({ UserData, setUserData, nextStep }) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUserData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validateLocal = () => {
    const newErrors = {};

    if (!UserData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(UserData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!UserData.contactNumber) {
      newErrors.contactNumber = "Phone number is required";
    } else if (!/^\d{7,15}$/.test(UserData.contactNumber)) {
      newErrors.contactNumber = "Phone number must be 7–15 digits";
    }

    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };

  const ValidateUser = async () => {
    const params = new URLSearchParams({
      email: UserData.email,
      contactNumber: UserData.contactNumber
    });

    const { data, error } = await safeFetch(`/api/Users/ValidateUser?${params.toString()}`);

    if (error) {
      setErrors(prev => ({ ...prev, api: error }));
      return false;
    }

    const serverErrors = {};
    if (data.emailExists) {
      serverErrors.email = "Email already exists";
    }
    if (data.contactExists) {
      serverErrors.contactNumber = "Phone number already exists";
    }

    setErrors(serverErrors);
    return Object.keys(serverErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validateLocal()) return;

    setLoading(true);
    const serverValid = await ValidateUser();
    setLoading(false);

    if (serverValid) {
      nextStep();
    }
  };

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

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={UserData.lastName}
          onChange={handleChange}
        />

        <input
          type="number"
          name="phoneNumber"
          placeholder="Phone Number"
          value={UserData.contactNumber}
          onChange={handleChange}
        />
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

        {errors.api && <div className="error">{errors.api}</div>}

        <button className="next-btn" onClick={handleNext} disabled={loading}>
          {loading ? "Validating..." : "Next"}
        </button>
      </div>
    </div>
  );
};

export default FormStepOne;
