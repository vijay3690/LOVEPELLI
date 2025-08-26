// src/components/FormStepTwo.jsx
import React, { useState, useEffect } from 'react';
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
  const [groupByCastes,  setGroupByCastes] = useState([]);
  const [isSelectedCasteIdHaveSubCastes, setIsSelectedCasteIdHaveSubCastes] = useState(false);

  const handleChange = (e) => {
  const selectedId = e.target.value;

  if(e.target.name === 'casteId') {
   
    const hasSubCastes = groupByCastes.some(r => r.casteId == selectedId);
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

  // This will update the formData state with the selected value
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
        safeFetch(`${BASE_API}/religions`, setReligions, 'fetch religions');
        safeFetch(`${BASE_API}/motherTongues`, setMotherTongues, 'fetch motherTongues')
    };
    fetchDropdownData();
  }, []);


 useEffect(() => {
    if (UserData.religionId ) {
      safeFetch(`${BASE_API}/castes/${UserData.religionId}`, setCastes, 'castes');
    }


    // if religionName is Hindu, fetch unique Caste IDs associated with the subCastes
    if (religionName === "Hindu") {
     // TO DO
     safeFetch(`${BASE_API}/subcaste/unique-caste-id`, setGroupByCastes, 'groupByCastes');
    }

      if (religionName === "Christian") {
      safeFetch(`${BASE_API}/division/${UserData.religionId}`, setDivisions, 'divisions');
      }
  }, [UserData.religionId, religionName]);

  useEffect(() => {
    if (UserData.casteId && isSelectedCasteIdHaveSubCastes) {
      safeFetch(`${BASE_API}/subCastes/${UserData.casteId}`, setSubCastes, 'subCastes');
    }
  }, [UserData.casteId]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Basic Details</h2>

        <label>Date of Birth:</label>
        <input
          type="date"
          name="dob"
          value={UserData.dob}
          onChange={handleChange}
        />

        <label>Religion:</label>
        <select
          name="religionId"
          value={UserData.religionId}
          onChange={handleChange}
        >
          <option value="">Select</option>
          {religions.map(r => (
            <option key={r.religionId} value={r.religionId}>
              {r.religionName}
            </option>
          ))}
        </select>
              
     

        <label>Caste:</label>
        <select
          name="casteId"
          value={UserData.casteId}
          onChange={handleChange}
        >
          <option value="">Select</option>
          {castes.map(c => (
            <option key={c.casteId} value={c.casteId}>
              {c.casteName}
            </option>
          ))}
        </select>


{religionName === "Hindu" && isSelectedCasteIdHaveSubCastes ? (
  <>
    <label>Sub-Caste:</label>
    <select
      name="subCasteId"
      value={UserData.subCasteId}
      onChange={handleChange}
    >
      <option value="">Select</option>
      {subCastes.map(sc => (
        <option key={sc.subCasteId} value={sc.subCasteId}>
          {sc.subCasteName}
        </option>
      ))}
    </select>
  </>
) : null}


         { (religionName != "Hindu" || !isSelectedCasteIdHaveSubCastes) && religionName != "Christian"   ? (
          <>
        <label>Sub-Caste:</label>
        <input
          type="text"
          name="subCasteName"
          value={UserData.subCasteName}
          placeholder='Optional'
          onChange={handleChange}
        />
        </>
        ) : null}


   {religionName == "Christian" ? (
          <>
        <label>Division:</label>
        <select
          name="divisionId"
          value={UserData.divisionId}
          onChange={handleChange}
        >
          <option value="">Select</option>
          {divisions.map(d => (
            <option key={d.divisionId} value={d.divisionId}>
              {d.divisionName}
            </option>
          ))}
        </select>
          </>
        ) : null}
        
       {religionName != "Christian" ? (
          <>
        <label>Gothram:</label>
        <input
          type="text"
          name="gotram"
          value={UserData.gotram}
          onChange={handleChange}
        />
 </>
        ) : null}

        {religionName != "Christian" ? (
          <>
        <label>Dosham:</label>
        <input
          type="text"
          name="dosham"
          value={UserData.dosham}
          onChange={handleChange}
        />
        </>
        ) : null}

        <label>Mother Tongue:</label>
        <select
          name="motherTongueId"
          value={UserData.motherTongueId}
          onChange={handleChange}
        >
          <option value="">Select</option>
          {motherTongues.map(mt => (
            <option key={mt.motherTongueId} value={mt.motherTongueId}>
              {mt.motherTongueName}
            </option>
          ))}
        </select>

        <div className="button-group">
          <button type="button" className="prev-btn" onClick={prevStep}>
            Previous
          </button>
          <button type="button" className="next-btn" onClick={nextStep}>
            Next
          </button>
        </div>
      </div>
    </div>
  );

};


export default FormStepTwo;
