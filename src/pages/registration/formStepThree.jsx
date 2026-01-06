import React, { useState, useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./registration.css";


const familyStatusOptions = ["Middle class", "Upper middle class", "High class", "Rich/Affluent"];
const familyTypeOptions = ["Joint", "Nuclear"];
const disabilityOptions = ["None", "Physically challenged"];




const FormStepThree = ({ UserData, setUserData, nextStep, prevStep }) => {
  const [errors, setErrors] = useState({});
  const [maritalStatus, setMaritalStatus] = useState(UserData.maritalStatus || "");
  const [childrenCount, setChildrenCount] = useState(UserData.childrenCount || "");
  const [childrenLiving, setChildrenLiving] = useState(UserData.childrenLiving || "");
  const [heights, setHeights] = useState([]);

const maritalOptions = ["Single", "Widowed", "Divorced", "Awaiting divorce"];
const childrenOptions = ["None", "1", "2", "3", "4 and above"];
const livingOptions = ["Children living with me", "Children not living with me"];
  
 const showChildrenField = ["Widowed", "Divorced", "Awaiting divorce"].includes(maritalStatus);
 const showLivingOptions = Boolean(childrenCount) && childrenCount !== "None";

 const inputRefs = useRef([]);
 const navigate = useNavigate(); // hook for navigation
 const Base_api=import.meta.env.VITE_BASE_URL;

const handleKeyDown = (e, index, type, groupLength = 0) => {
  // ENTER KEY ACTION
  if (e.key === "Enter") {
    e.preventDefault();

    if (type === "button") {
      inputRefs.current[index]?.click(); // trigger button click
    }

    // Move focus to next field
    if (inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    } else {
      document.getElementById("submitBtn")?.click();
    }
  }

  // ARROW KEY NAVIGATION FOR BUTTON GROUPS
  if (type === "button") {
    if (e.key === "ArrowRight" && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }

    if (e.key === "ArrowLeft" && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
    if (e.key === "ArrowDown") {
    if (inputRefs.current[index + 1]) inputRefs.current[index + 1].focus();
    }
    if (e.key === "ArrowUp") {
    if (inputRefs.current[index - 1]) inputRefs.current[index - 1].focus();
   }
  }
};


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
      safeFetch(`${Base_api}/api/PersonalDetails/GetHeights`, setHeights, "heights");
    };
    fetchDropdownData();
  }, []);

  // Generic change handler for <select>
const handleChange = (e) => {
  const { name, value } = e.target;
  setUserData((prev) => ({ ...prev, [name]: value }));
  clearError(name);
};


  // Generic handler for button fields
const handleSelect = (name, value) => {
  setUserData((prev) => ({ ...prev, [name]: value }));
  clearError(name);
};

  //  Validation
  const validateForm = () => {
    let newErrors = {};

    if (!maritalStatus) newErrors.maritalStatus = "Marital status is required";
    if (!UserData.heightId) newErrors.heightId = "Height is required";
    if (!UserData.familyStatus) newErrors.familyStatus = "Family status is required";
    if (!UserData.familyType) newErrors.familyType = "Family type is required";
    if (!UserData.disability) newErrors.disability = "Disability selection is required";

    if (showChildrenField && !childrenCount) {newErrors.childrenCount = "Number of children is required";}
    if (showLivingOptions && !childrenLiving) {newErrors.childrenLiving = "Children living status is required";}
 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  const handleNext = () => {
    if (validateForm()) {
      //  Save all local states into UserData
      setUserData((prev) => ({
        ...prev,
        maritalStatus,
        childrenCount,
        childrenLiving,
      }));
      nextStep();
    }
  };

const clearError = (field) => {
  setErrors((prev) => {
          const copy = { ...prev };
      delete copy[field];
      return copy;
  });
};

 const closeModal = ()=>{
    navigate("/")
  };

    let currentIndex = 0;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="title">Personal Details</h2>
       <button className="close-btn" onClick={closeModal}>✖</button>
        </div>

              {/* Marital Status */}
   <div className="field-group">
  <label className="field-label">
    Marital Status:<span className="required">*</span>
  </label>

  <div className="option-group">
{maritalOptions.map((option) => {
  const localIndex = currentIndex++;

  return (
  <button
  key={option}
  type="button"
  className={maritalStatus === option ? "selected" : ""}
  ref={(el) => (inputRefs.current[localIndex] = el)}
  onKeyDown={(e) => handleKeyDown(e, localIndex, "button", maritalOptions.length)}
  onClick={() => {
    setMaritalStatus(option);
    setChildrenCount("");
    setChildrenLiving("");
    clearError("maritalStatus");
  }}
>
  {option}
</button>

  );
})}

  </div>

  {/*  Show validation error only if no marital status selected */}
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
            <div className="option-group">
          {childrenOptions.map((option) => {
           const localIndex = currentIndex++;

  return (
    <button
      key={option}
      type="button"
      className={childrenCount === option ? "selected" : ""}
      ref={(el) => (inputRefs.current[localIndex] = el)}
      onKeyDown={(e) => handleKeyDown(e, localIndex, "button", childrenOptions.length)}
      onClick={() => {
        setChildrenCount(option);
        setChildrenLiving("");
      }}
    >
      {option}
    </button>
  );
})}

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
            <div className="option-group">
              {livingOptions.map((option) => {
                  const localIndex = currentIndex++;
                return (
                <button
                  key={option}
                  type="button"
                  className={childrenLiving === option ? "selected" : ""}
                 ref={(el) => (inputRefs.current[localIndex] = el)}
                  onKeyDown={(e) => handleKeyDown(e, localIndex, "button", livingOptions.length)}
                  onClick={() => {
                    setChildrenLiving(option);
                    clearError("childrenLiving");
                  }}
                >
                  {option}
                </button>
                );
              })}
            </div>
          {errors.childrenLiving && !childrenLiving && (
    <p className="error-text">{errors.childrenLiving}</p>
  )}
          </div>
        )}

        {/* Height */}
        <div className="field-group">
             <label className="field-label">
          Height:<span className="required">*</span>
        </label>
       <select
            name="heightId"
            value={UserData.heightId}
            ref={(el) => (inputRefs.current[14] = el)}
            onKeyDown={(e) => handleKeyDown(e, 14)}
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
</div>
        {/* Family Status */}
        <div className="field-group">
           <label className="field-label">
          Family Status:<span className="required">*</span>
        </label>
        <div className="option-group">
          {familyStatusOptions.map((status,i) => (
            <button
              key={status}
              type="button"
              className={UserData.familyStatus === status ? "selected" : ""}
              ref={(el) => (inputRefs.current[15 + i] = el)}
              onKeyDown={(e) => handleKeyDown(e, 15 + i, "button", familyStatusOptions.length)}
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
</div>

        {/* Family Type */}
        <div className="field-group">
              <label className="field-label">
          Family Type:<span className="required">*</span>
        </label>
        <div className="option-group">
          {familyTypeOptions.map((type,i) => (
            <button
              key={type}
              type="button"
              className={UserData.familyType === type ? "selected" : ""}
               ref={(el) => (inputRefs.current[20 + i] = el)}
               onKeyDown={(e) => handleKeyDown(e, 20 + i, "button", familyTypeOptions.length)}
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
</div>
        {/* Any Disability */}
        <div className="field-group">
        <label className="field-label">
          Any Disability:<span className="required">*</span>
        </label>
        <div className="option-group">
          {disabilityOptions.map((option,i) => (
            <button
              key={option}
              type="button"
              className={UserData.disability === option ? "selected" : ""}
              ref={(el) => (inputRefs.current[25 + i] = el)}
              onKeyDown={(e) => handleKeyDown(e, 25 + i, "button", disabilityOptions.length)}
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
</div>
        {/* Navigation Buttons */}
         <div className="button-group modal-footer">
          <button type="button" className="prev-btn" onClick={prevStep}>
            Previous
          </button>
          <button id="submitBtn" type="button" className="next-btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormStepThree;
