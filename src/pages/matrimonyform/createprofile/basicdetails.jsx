import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./basicdetails.css";

const btnText = "Save & Continue";

const casteData = {
  Hindu: {
    Brahmin: ["Iyer", "Iyengar", "Smartha"],
    Kshatriya: ["Rajput", "Reddy"],
    Vaishya: ["Agarwal", "Gupta"],
    Shudra: ["Yadav", "Kurmi"],
    Other: ["Other"]
  },
  Muslim: {
    Sunni: ["Hanafi", "Shafi'i", "Maliki", "Hanbali"],
    Shia: ["Bohra", "Ismaili"],
    Other: ["Other"]
  },
  Christian: {
    Catholic: ["Roman Catholic", "Syro Malabar", "Syro Malankara"],
    Protestant: ["CSI", "CNI", "Evangelical", "Methodist", "Baptist"],
    Orthodox: ["Other"],
    Pentecostal: ["Other"],
    Other: ["Other"]
  }
};

const FormInput = ({ label, ...props }) => (
  <div className="form-group">
    <label className="form-label">{label}</label>
    <input className="form-input" {...props} />
  </div>
);

const FormSelect = ({ label, name, value, onChange, options }) => (
  <div className="form-group">
    <label className="form-label">{label}</label>
    <select className="form-select" name={name} value={value} onChange={onChange} required>
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const BasicDetailsForm = ({ UserData, onChange, onSubmit }) => {
  const [religionTypes, setReligionTypes] = useState([]);
  const [subCastes, setSubCastes] = useState([]);

  useEffect(() => {
    if (UserData.religion) {
      setReligionTypes(Object.keys(casteData[UserData.religion]));
    } else {
      setReligionTypes([]);
    }
  }, [UserData.religion]);

  useEffect(() => {
    if (UserData.religion && UserData.religionDivision) {
      setSubCastes(casteData[UserData.religion][UserData.religionDivision]);
    } else {
      setSubCastes([]);
    }
  }, [UserData.religion, UserData.religionDivision]);

  return (
    <form onSubmit={onSubmit} className="form-grid basic-details-form">
      <h2 className="form-title">Basic Details</h2>
      <FormInput label="Date of Birth" type="date" name="dob" value={UserData.dob} onChange={onChange} required />
      <FormSelect
        label="Religion"
        name="religion"
        value={UserData.religion}
        onChange={onChange}
        options={Object.keys(casteData)}
      />
      {religionTypes.length > 0 && (
        <FormSelect
          label="Religion Type"
          name="religionDivision"
          value={UserData.religionDivision}
          onChange={onChange}
          options={religionTypes}
        />
      )}
      <FormSelect
        label="Caste"
        name="caste"
        value={UserData.caste}
        onChange={onChange}
        options={["General", "OBC", "SC", "ST"]}
      />
      {subCastes.length > 0 && (
        <FormSelect
          label="Sub-Caste"
          name="subCaste"
          value={UserData.subCaste}
          onChange={onChange}
          options={subCastes}
        />
      )}
      <FormSelect
        label="Mother Tongue"
        name="motherTongue"
        value={UserData.motherTongue}
        onChange={onChange}
        options={["Bengali", "Gujarati", "Hindi", "Kannada", "Malayalam", "Marathi", "Marwari", "Oriya", "Punjabi", "Sindhi", "Tamil", "Telugu"]}
      />
       <Link to="/personaldetails" className="default-btn style-2">
          {btnText}
        </Link>
    </form>
  );
};

export default BasicDetailsForm;
