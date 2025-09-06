// src/components/FormStepTwo.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./registration.css"; // Contains unified modal styles
import {BASE_API} from "./registerconstants";


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

  const handleChange = (e) => {
  const selectedId = e.target.value;

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
    [e.target.name]: selectedId
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
        safeFetch(`${BASE_API}/api/BasicDetails/religions`, setReligions, 'fetch religions');
        safeFetch(`${BASE_API}/api/BasicDetails/motherTongues`, setMotherTongues, 'fetch motherTongues')
        safeFetch(`${BASE_API}/api/BasicDetails/dosham`, setDosham, 'fetch dosham');
    };
    fetchDropdownData();
  }, []);


 useEffect(() => {
    if (UserData.religionId ) {
      safeFetch(`${BASE_API}/api/BasicDetails/castes/${UserData.religionId}`, setCastes, 'castes');
    }
      if (religionName === "Christian") {
      safeFetch(`${BASE_API}/api/BasicDetails/division/${UserData.religionId}`, setDivisions, 'divisions');
      }
  }, [UserData.religionId, religionName]);

  useEffect(() => {
    if (UserData.casteId && isSelectedCasteIdHaveSubCastes) {
      safeFetch(`${BASE_API}/api/BasicDetails/subCastes/${UserData.casteId}`, setSubCastes, 'subCastes');
    }
  }, [UserData.casteId]);

    // ✅ DOB limits
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

    // ✅ Validation
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
    console.log("Validation Errors:", newErrors); // 🔍 Debug
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

  return (
    <div className="modal-overlay">
      <div className="modal-content">
            {/* Close Button */}
        <button className="close-btn" onClick={closeModal}>✖</button>
        <h2>Basic Details</h2>

             {/* DOB */}
        <div className="dob-group">
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
                onChange={handleChange}
                required
              />
            );
          })()}
 
          {errors.dob && <span className="error-text">{errors.dob}</span>}
        </div>

            {/* Religion */}
        <label>
          Religion:<span className="required">*</span>
        </label>
        <select
          name="religionId"
          value={UserData.religionId || ""}
          onChange={handleChange}
        >
          <option value="">Select</option>
          {religions.map((r) => (
            <option key={r.religionId} value={r.religionId}>
              {r.religionName}
            </option>
          ))}
        </select>
        {errors.religionId && <p className="error-text">{errors.religionId}</p>}
              
     

           {/* Caste */}
        <label>
          Caste:<span className="required">*</span>
        </label>
        <select
          name="casteId"
          value={UserData.casteId || ""}
          onChange={handleChange}
        >
          <option value="">Select</option>
          {castes.map((c) => (
            <option key={c.casteId} value={c.casteId}>
              {c.casteName}
            </option>
          ))}
        </select>
        {errors.casteId && <p className="error-text">{errors.casteId}</p>}

  {/* Hindu → SubCaste */}
{religionName === "Hindu" && isSelectedCasteIdHaveSubCastes && (
  <>
            <label>
              Sub-Caste:<span className="required">*</span>
            </label>
            <select
              name="subCasteId"
              value={UserData.subCasteId || ""}
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
          </>
        )
      }

{/* Other Religions → free text SubCaste */}
         { religionName != "Hindu" || !isSelectedCasteIdHaveSubCastes && religionName != "Christian" &&   (
          <>
           <label>Sub-Caste:</label>
            <input
              type="text"
              name="subCasteName"
              value={UserData.subCasteName || ""}
              placeholder="Optional"
              onChange={handleChange}
            />
          </>
        )}


      {/* Christian → Division */}
        {religionName === "Christian" && (
          <>
            <label>
              Division:<span className="required">*</span>
            </label>
            <select
              name="divisionId"
              value={UserData.divisionId || ""}
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
          </>
        )}
        
      {/* Gothram */}
        {religionName !== "Christian" && religionName !== "Muslim" && (
          <>
            <label>Gothram:</label>
            <input
              type="text"
              name="gotram"
              value={UserData.gotram || ""}
              onChange={handleChange}
            />
          </>
        )}

       {/* Dosham */}
        {religionName !== "Christian" && religionName !== "Muslim" && (
          <>
            <label>Dosham:</label>
            <input
              type="text"
              name="dosham"
              value={UserData.dosham || ""}
              onChange={handleChange}
            />
          </>
        )}

       {/* Mother Tongue */}
        <label>
          Mother Tongue:<span className="required">*</span>
        </label>
        <select
          name="motherTongueId"
          value={UserData.motherTongueId || ""}
          onChange={handleChange}
        >
          <option value="">Select</option>
          {motherTongues.map((mt) => (
            <option key={mt.motherTongueId} value={mt.motherTongueId}>
              {mt.motherTongueName}
            </option>
          ))}
        </select>
        {errors.motherTongueId && <p className="error-text">{errors.motherTongueId}</p>}
 
        {/* Buttons */}
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


export default FormStepTwo;
