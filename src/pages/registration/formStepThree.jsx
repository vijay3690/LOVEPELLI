import React, { useState, useEffect } from "react";
import "./registration.css";
import { BASE_URL } from "./registerconstants";

const familyStatusOptions = ["Middle class", "Upper middle class", "High class", "Rich/Affluent"];
const familyTypeOptions = ["Joint", "Nuclear"];
const disabilityOptions = ["None", "Physically challenged"];

const maritalOptions = ["Never Married", "Widowed", "Divorced", "Awaiting divorce"];
const childrenOptions = ["None", "1", "2", "3", "4 and above"];
const livingOptions = ["Children living with me", "Children not living with me"];

const FormStepThree = ({ UserData, setUserData, nextStep, prevStep }) => {
  const [heights, setHeights] = useState([]);

  // Safe fetch wrapper
  const safeFetch = async (url, setter, label) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} - ${res.statusText}`);
      }
      const data = await res.json();
      setter(data);
    } catch (err) {
      console.error(`Error ${label} from ${url}:`, err);
    }
  };

  useEffect(() => {
    const fetchDropdownData = async () => {
      safeFetch(`${BASE_URL}/GetHeights`, setHeights, "heights");
    };
    fetchDropdownData();
  }, []);

  // Generic change handler for <select>
  const handleChange = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Generic handler for button fields
  const handleSelect = (name, value) => {
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showChildrenField = ["Widowed", "Divorced", "Awaiting divorce"].includes(
    UserData.maritalStatus
  );
  const showLivingOptions = UserData.noOfChildren && UserData.noOfChildren !== "None";

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Personal Details</h2>

        {/* Marital Status */}
        <div className="field-group">
          <label className="field-label">Marital Status:</label>
          <div className="button-group">
            {maritalOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={`btn-option ${UserData.maritalStatus === option ? "active" : ""}`}
                onClick={() =>
                  setUserData({
                    ...UserData,
                    maritalStatus: option,
                    noOfChildren: "", // reset children when status changes
                    livingWithMe: "", // reset livingWithMe when status changes
                  })
                }
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Conditional message */}
        {UserData.maritalStatus === "Widowed" && (
          <p className="description">Choose to believe in second chances</p>
        )}
        {UserData.maritalStatus === "Never Married" && (
          <p className="description">A change in marital status awaits you</p>
        )}

        {/* No. of Children */}
        {showChildrenField && (
          <div className="field-group">
            <label className="field-label">No. of Children:</label>
            <div className="button-group">
              {childrenOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`btn-option1 ${UserData.noOfChildren == option ? "active" : ""}`}
                  onClick={() =>
                    setUserData({
                      ...UserData,
                      noOfChildren: option,
                      livingWithMe: 0, // reset when children count changes
                    })
                  }
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Children Living Options */}
        {showLivingOptions && (
          <div className="field-group">
            <label className="field-label">Children Living Status</label>
            <div className="button-group">
              {livingOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`btn-option ${UserData.livingWithMe === option ? "active" : ""}`}
                  onClick={() =>
                    setUserData({
                      ...UserData,
                      livingWithMe: option,
                    })
                  }
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Height */}
        <label>Height:</label>
        <select name="heightId" value={UserData.heightId} onChange={handleChange}>
          <option value="">Select</option>
          {heights.map((height) => (
            <option key={height.heightId} value={height.heightId}>
              {height.heightValue}
            </option>
          ))}
        </select>

        {/* Family Status */}
        <label>Family Status:</label>
        <div className="option-group">
          {familyStatusOptions.map((status) => (
            <button
              key={status}
              className={UserData.familyStatus === status ? "selected" : ""}
              onClick={() => handleSelect("familyStatus", status)}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Family Type */}
        <label>Family Type:</label>
        <div className="option-group">
          {familyTypeOptions.map((type) => (
            <button
              key={type}
              className={UserData.familyType === type ? "selected" : ""}
              onClick={() => handleSelect("familyType", type)}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Any Disability */}
        <label>Any Disability:</label>
        <div className="option-group">
          {disabilityOptions.map((option) => (
            <button
              key={option}
              className={UserData.disability === option ? "selected" : ""}
              onClick={() => handleSelect("disability", option)}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="button-group">
          <button className="prev-btn" onClick={prevStep}>
            Previous
          </button>
          <button className="next-btn" onClick={nextStep}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormStepThree;
