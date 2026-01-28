// src/components/FormStepTwo.jsx
import React, { useState, useEffect ,useRef} from 'react';
import { useNavigate } from "react-router-dom";
import "./registration.css"; // Contains unified modal styles
// import {BASE_API} from "./registerconstants";


const FormStepTwo = ({
  UserData,
  setUserData,
  nextStep,
  prevStep
}) => {

  const [religions, setReligions] = useState([]);
  const [castes, setCastes] = useState([]);
  const [subCastes, setSubCastes] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [motherTongues, setMotherTongues] = useState([]);
  const [religionName, setReligionName] = useState("");
  const [dosham, setDosham] = useState([]);
  const [isSelectedCasteIdHaveSubCastes, setIsSelectedCasteIdHaveSubCastes] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const Base_api=import.meta.env.VITE_BASE_URL;

  // Clear and rebuild refs each render in visual order
    inputRefs.current = [];

 const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    
    // Find current element's index in valid refs
    const validRefs = inputRefs.current.filter(Boolean);
    const currentIndex = validRefs.indexOf(e.target);
    
    if (currentIndex < validRefs.length - 1) {
      validRefs[currentIndex + 1]?.focus();
    } else {
      document.getElementById("submitBtn")?.click();
    }
  }
};



  const handleChange = (e) => {
   const selectedId = e.target.value;
  const { name, value } = e.target;   // here is value

  if(e.target.name === 'casteId') {
   
    const hasSubCastes = castes.some(x => x.casteId == selectedId && x.hasSubCaste ===true);
    setIsSelectedCasteIdHaveSubCastes(hasSubCastes);
    console.log("isSelectedCasteIdHaveSubCastes:", hasSubCastes);
  }

  // setReligionName based on the selected religionID
  if (e.target.name === 'religionId') {
    const selectedReligion = religions.find(
      r => String(r.religionId) === String(selectedId)
    );

    setReligionName(selectedReligion?.religionName || "");

    console.log("Selected Religion ID:", selectedId);
    console.log("Selected Religion Name:", selectedReligion?.religionName);
  }

  // This will update the UserData state with the selected value
  setUserData(prev => ({
    ...prev,
     [e.target.name]: selectedId,
    [name]: value,
  }));
    // Clear error for this field if value is not empty
  if (value) {
    clearError(name);
  }
};

const handlePrev = () => {
  // Optionally reset religionName if needed, or other fields
  setReligionName(""); // or any logic you need
  prevStep(); // call the passed prop to go back
};

// clearError function to clear error of specific field
  const clearError = (fieldName) => {
    setErrors(prevErrors => ({
      ...prevErrors,
      [fieldName]: ""
    }));
  };


  const safeFetch = async (url, setter, label) => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    }
    const data = await res.json();
    setter(data);
  } catch (err) {
    console.error(`Error  ${label} from ${url}:`, err);
  }
};

useEffect(() => {
    const fetchDropdownData = async () => {
        safeFetch(`${Base_api}/api/BasicDetails/religions`, setReligions, 'fetch religions');
        safeFetch(`${Base_api}/api/BasicDetails/motherTongues`, setMotherTongues, 'fetch motherTongues')
        safeFetch(`${Base_api}/api/BasicDetails/dosham`, setDosham, 'fetch dosham');
    };
    fetchDropdownData();
  }, []);


 useEffect(() => {
    if (UserData.religionId ) {
      safeFetch(`${Base_api}/api/BasicDetails/castes/${UserData.religionId}`, setCastes, 'castes');
    }
      if (religionName === "Christian") {
      safeFetch(`${Base_api}/api/BasicDetails/division/${UserData.religionId}`, setDivisions, 'divisions');
      }
  }, [UserData.religionId, religionName]);

  useEffect(() => {
    if (UserData.casteId && isSelectedCasteIdHaveSubCastes) {
      safeFetch(`${Base_api}/api/BasicDetails/subCastes/${UserData.casteId}`, setSubCastes, 'subCastes');
    }
  }, [UserData.casteId]);

    //  DOB limits
  const getDobLimits = (gender) => {
    const today = new Date();
    let minAge = gender === "Male" ? 21 : 18;
    let maxAge = 100;
 
    const maxDate = new Date(
      today.getFullYear() - minAge,
      today.getMonth(),
      today.getDate()
    )
      .toISOString()
      .split("T")[0];
 
    const minDate = new Date(
      today.getFullYear() - maxAge,
      today.getMonth(),
      today.getDate()
    )
      .toISOString()
      .split("T")[0];
 
    return { minDate, maxDate };
  };

    // Validation
  const validateForm = () => {
    let newErrors = {};
    const today = new Date();
 
    // DOB validation
    if (!UserData.dob) {
      newErrors.dob = "Date of Birth is required";
    } else {
      const dob = new Date(UserData.dob);
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      const d = today.getDate() - dob.getDate();
 
      if (m < 0 || (m === 0 && d < 0)) {
        age--;
      }
 
      if (UserData.gender === "Male" && age < 21) {
        newErrors.dob = "Men must be at least 21 years old";
      } else if (UserData.gender === "Female" && age < 18) {
        newErrors.dob = "Women must be at least 18 years old";
      } else if (age > 100) {
        newErrors.dob = "Age cannot be more than 100 years";
      }
    }
        // Religion / caste validations
    if (!UserData.religionId) newErrors.religionId = "Religion is required";
    if (!UserData.casteId) newErrors.casteId = "Caste is required";
 
    if (religionName === "Hindu" && !UserData.subCasteId && isSelectedCasteIdHaveSubCastes) {
      newErrors.subCasteId = "Sub-Caste is required";
    }
 
    if (religionName === "Christian" && !UserData.divisionId) {
      newErrors.divisionId = "Division is required";
    }
 
    if (!UserData.motherTongueId) {
      newErrors.motherTongueId = "Mother Tongue is required";
    }
 
    setErrors(newErrors);
    console.log("Validation Errors:", newErrors); //  Debug
    return Object.keys(newErrors).length === 0;
  };
 
  const handleNext = () => {
    if (validateForm()) {
      nextStep();
    }
  };
 
  // Close modal function → navigate home
  const closeModal = () => {
    navigate("/");
  };


// UI Rendering

  return (
    <div className="modal-overlay">
      <div className="modal-content">
                  
                  <div className="modal-header">
                    <h2 className="title">Basic Details</h2>
        <button className="close-btn" onClick={closeModal}>✖</button>
        
        </div>
             {/* DOB */}
<div className="dob-group form-group">
  <label>
    Date of Birth:<span className="required">*</span>
  </label>

  {(() => {
    const { minDate, maxDate } = getDobLimits(UserData.gender || "Female");
    return (
      <input
        type="date"
        name="dob"
        className="dob-input"
        min={minDate}
        max={maxDate}
        value={UserData.dob || ""}
        ref={(el) => (inputRefs.current[0] = el)}
        onKeyDown={handleKeyDown} 
         onChange={(e) => {
          const value = e.target.value;

          // Update UserData state for dob
          setUserData({ ...UserData, dob: value });

          // Clear the dob error immediately when a date is selected
          clearError("dob");
        }}
        required
      />
    );
  })()}

  {/* Show validation error only if no dob selected */}
  {errors.dob && !UserData.dob && (
    <span className="error-text">{errors.dob}</span>
  )}
</div>


            {/* Religion */}
            <div className="form-group">
<label>
  Religion:<span className="required">*</span>
</label>
<select
  name="religionId"
  value={UserData.religionId || ""}
  ref={(el) => (inputRefs.current[1] = el)}
  onKeyDown={handleKeyDown} 
  onChange={(e) => {
  handleChange(e); // updates UserData state

    // Clear error immediately when a value is selected
    if (e.target.value) {
      clearError("religionId");
    }
  }}
>
  <option value="">Select</option>
  {religions.map((r) => (
    <option key={r.religionId} value={r.religionId}>
      {r.religionName}
    </option>
  ))}
</select>

{/* Show validation error only if no religion selected */}
{errors.religionId && !UserData.religionId && (
  <p className="error-text">{errors.religionId}</p>
)}
</div>

           {/* Caste */}
            <div className="form-group">
        <label>
  Caste:<span className="required">*</span>
</label>
<select
  name="casteId"
  value={UserData.casteId || ""}
  ref={(el) => (inputRefs.current[2] = el)}
  onKeyDown={handleKeyDown} 
  onChange={(e) => {
    handleChange(e); // update UserData state

    // Clear error immediately when a value is selected
    if (e.target.value) {
      clearError("casteId");
    }
  }}
>
  <option value="">Select</option>
  {castes.map((c) => (
    <option key={c.casteId} value={c.casteId}>
      {c.casteName}
    </option>
  ))}
</select>

{/* Show validation error only if no caste selected */}
{errors.casteId && !UserData.casteId && (
  <p className="error-text">{errors.casteId}</p>
)}
</div>

  {/* Hindu → SubCaste */}
{religionName === "Hindu" && isSelectedCasteIdHaveSubCastes && (
   <div className="form-group">
            <label>
              Sub-Caste:<span className="required">*</span>
            </label>
            <select
              name="subCasteId"
              value={UserData.subCasteId || ""}
              ref={(el) => (inputRefs.current[3] = el)}
              onKeyDown={handleKeyDown} 
              onChange={handleChange}
            >
              <option value="">Select</option>
              {subCastes.map((sc) => (
                <option key={sc.subCasteId} value={sc.subCasteId}>
                  {sc.subCasteName}
                </option>
              ))}
            </select>
            {errors.subCasteId && <p className="error-text">{errors.subCasteId}</p>}
          </div>
        )
      }

{/* Other Religions → free text SubCaste */}
         { religionName != "Hindu" || !isSelectedCasteIdHaveSubCastes && religionName != "Christian" &&   (
           <div className="form-group">
           <label>Sub-Caste:</label>
            <input
              type="text"
              name="subCasteName"
              value={UserData.subCasteName || ""}
              ref={(el) => (inputRefs.current[4] = el)}
              onKeyDown={handleKeyDown} 
              placeholder="Optional"
              onChange={handleChange}
            />
          </div>
        )}


      {/* Christian → Division */}
        {religionName === "Christian" && (
           <div className="form-group">
            <label>
              Division:<span className="required">*</span>
            </label>
            <select
              name="divisionId"
              value={UserData.divisionId || ""}
              ref={(el) => (inputRefs.current[5] = el)}
              onKeyDown={handleKeyDown} 
              onChange={handleChange}
            >
              <option value="">Select</option>
              {divisions.map((d) => (
                <option key={d.divisionId} value={d.divisionId}>
                  {d.divisionName}
                </option>
              ))}
            </select>
            {errors.divisionId && <p className="error-text">{errors.divisionId}</p>}
          </div>
        )}
        
      {/* Gothram */}
       {religionName && religionName !== "Christian" && religionName !== "Muslim" && (
           <div className="form-group">
            <label>Gothram:</label>
            <input
              type="text"
              name="gotram"
              value={UserData.gotram || ""}
              ref={(el) => (inputRefs.current[6] = el)}
              onKeyDown={handleKeyDown} 
              onChange={handleChange}
            />
          </div>
        )}

       {/* Dosham */}
        {religionName && religionName !== "Christian" && religionName !== "Muslim" && (
           <div className="form-group">
            <label>Dosham:</label>
            <input
              type="text"
              name="dosham"
              value={UserData.dosham || ""}
              ref={(el) => (inputRefs.current[7] = el)}
              onKeyDown={handleKeyDown} 
              onChange={handleChange}
            />
          </div>
        )}

       {/* Mother Tongue */}
        <div className="form-group">
        <label>
          Mother Tongue:<span className="required">*</span>
        </label>
        <select
          name="motherTongueId"
          value={UserData.motherTongueId || ""}
          ref={el => inputRefs.current[8] = el}
          onKeyDown={handleKeyDown} 
          onChange={handleChange}
        >
          <option value="">Select</option>
          {motherTongues.map((mt) => (
            <option key={mt.motherTongueId} value={mt.motherTongueId}>
              {mt.motherTongueName}
            </option>
          ))}
        </select>
      {/* Show validation error only if no caste selected */}
        {errors.motherTongueId && !UserData.motherTongueId && (
          <p className="error-text">{errors.motherTongueId}</p>
        )}
        </div>
        {/* Buttons */}
        <div className="button-group">
         <button type="button" className="prev-btn" onClick={handlePrev}>
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


export default FormStepTwo;
