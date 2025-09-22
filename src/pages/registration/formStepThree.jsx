import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./registration.css";
import { BASE_API} from "./registerconstants";

const familyStatusOptions = ["Middle class", "Upper middle class", "High class", "Rich/Affluent"];
const familyTypeOptions = ["Joint", "Nuclear"];
const disabilityOptions = ["None", "Physically challenged"];




const FormStepThree = ({ UserData, setUserData, nextStep, prevStep }) => {
  const [errors, setErrors] = useState({});
  const [maritalStatus, setMaritalStatus] = useState(UserData.maritalStatus || "");
  const [childrenCount, setChildrenCount] = useState(UserData.childrenCount || "");
  const [childrenLiving, setChildrenLiving] = useState(UserData.childrenLiving || "");
  const [heights, setHeights] = useState([]);
   const navigate = useNavigate(); // hook for navigation
const maritalOptions = ["Single", "Widowed", "Divorced", "Awaiting divorce"];
const childrenOptions = ["None", "1", "2", "3", "4 and above"];
const livingOptions = ["Children living with me", "Children not living with me"];
  
 const showChildrenField = ["Widowed", "Divorced", "Awaiting divorce"].includes(maritalStatus);
 const showLivingOptions = Boolean(childrenCount) && childrenCount !== "None";



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
      safeFetch(`${BASE_API}/api/PersonalDetails/GetHeights`, setHeights, "heights");
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

  // ✅ Validation
  const validateForm = () => {
    let newErrors = {};

    if (!maritalStatus) newErrors.maritalStatus = "Marital status is required";
    if (!UserData.heightId) newErrors.heightId = "Height is required";
    if (!UserData.familyStatus) newErrors.familyStatus = "Family status is required";
    if (!UserData.familyType) newErrors.familyType = "Family type is required";
    if (!UserData.disability) newErrors.disability = "Disability selection is required";

    if (showChildrenField && !childrenCount) {
      newErrors.childrenCount = "Number of children is required";
    }
    if (showLivingOptions && !childrenLiving) {
      newErrors.childrenLiving = "Children living status is required";
    }
 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  const handleNext = () => {
    if (validateForm()) {
      // ✅ Save all local states into UserData
      setUserData((prev) => ({
        ...prev,
        maritalStatus,
        childrenCount,
        childrenLiving,
      }));
      nextStep();
    }
  };
 
  const closeModal = ()=>{
    navigate("/")
  }



  return (
    <div className="modal-overlay">
      <div className="modal-content">
       <button className="close-btn" onClick={closeModal}>X</button>

        <h2>Personal Details</h2>

              {/* Marital Status */}
   <div className="field-group">
  <label className="field-label">
    Marital Status:<span className="required">*</span>
  </label>

  <div className="button-group">
    {maritalOptions.map((option) => (
      <button
        key={option}
        type="button"
        className={`btn-option ${maritalStatus === option ? "active" : ""}`}
        onClick={() => {
          setMaritalStatus(option);
          setChildrenCount("");
          setChildrenLiving("");
          clearError("maritalStatus"); // ✅ clear error when user selects
        }}
      >
        {option}
      </button>
    ))}
  </div>

  {/* ✅ Show validation error only if no marital status selected */}
  {errors.maritalStatus && !maritalStatus && (
    <p className="error-text">{errors.maritalStatus}</p>
  )}
</div>


     {/* Children */}
        {showChildrenField && (
          <div className="field-group">
            <label className="field-label">
              No. of Children:<span className="required">*</span>
            </label>
            <div className="button-group">
              {childrenOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`btn-option1 ${childrenCount === option ? "active" : ""}`}
                  onClick={() => {
                    setChildrenCount(option);
                    setChildrenLiving("");
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
      {errors.childrenCount && !childrenCount && (
    <p className="error-text">{errors.childrenCount}</p>
  )}
          </div>
        )}

        {/* Children Living Options */}
        {showLivingOptions && (
          <div className="field-group">
            <label className="field-label">
              Children Living Status:<span className="required">*</span>
            </label>
            <div className="button-group">
              {livingOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`btn-option ${childrenLiving === option ? "active" : ""}`}
                  onClick={() => setChildrenLiving(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          {errors.childrenLiving && !childrenLiving && (
    <p className="error-text">{errors.childrenLiving}</p>
  )}
          </div>
        )}

        {/* Height */}
             <label>
          Height:<span className="required">*</span>
        </label>
        <select
          name="heightId"
          value={UserData.heightId}
          onChange={handleChange}
        >
          <option value="">Select</option>
          {heights.map((height) => (
            <option key={height.heightId} value={height.heightId}>
              {height.heightValue}
            </option>
          ))}
        </select>
        {/* Show validation error only if no height selected */}
{errors.heightId && !UserData.heightId && (
  <p className="error-text">{errors.heightId}</p>
)}

        {/* Family Status */}
           <label>
          Family Status:<span className="required">*</span>
        </label>
        <div className="option-group">
          {familyStatusOptions.map((status) => (
            <button
              key={status}
              type="button"
              className={UserData.familyStatus === status ? "selected" : ""}
              onClick={() => handleSelect("familyStatus", status)}
            >
              {status}
            </button>
          ))}
        </div>
            {/* Show validation error only if no family status selected */}
{errors.familyStatus && !UserData.familyStatus && (
  <p className="error-text">{errors.familyStatus}</p>
)}

        {/* Family Type */}
              <label>
          Family Type:<span className="required">*</span>
        </label>
        <div className="option-group">
          {familyTypeOptions.map((type) => (
            <button
              key={type}
              type="button"
              className={UserData.familyType === type ? "selected" : ""}
              onClick={() => handleSelect("familyType", type)}
            >
              {type}
            </button>
          ))}
        </div>
              {/* Show validation error only if no family status selected */}
            {errors.familyType && !UserData.familyType && (
              <p className="error-text">{errors.familyType}</p>
            )}

        {/* Any Disability */}
        <label>
          Any Disability:<span className="required">*</span>
        </label>
        <div className="option-group">
          {disabilityOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={UserData.disability === option ? "selected" : ""}
              onClick={() => handleSelect("disability", option)}
            >
              {option}
            </button>
          ))}
        </div>
        {/* Show validation error only if no family status selected */}
            {errors.disability && !UserData.disability && (
              <p className="error-text">{errors.disability}</p>
            )}

        {/* Navigation Buttons */}
         <div className="button-group">
          <button type="button" className="prev-btn" onClick={prevStep}>
            Previous
          </button>
          <button type="button" className="next-btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormStepThree;
