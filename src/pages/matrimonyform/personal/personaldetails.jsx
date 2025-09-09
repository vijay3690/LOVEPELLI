import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./personaldetails.css";

const PersonalDetails = () => {
  const [details, setDetails] = useState({
    maritalStatus: "",
    height: "",
    familyStatus: "",
    familyType: "",
    familyValues: "",
    disability: "",
  });

  const btnText = "Continue";

  // Options
  const maritalStatusOptions = ["Never Married", "Widowed", "Divorced", "Awaiting divorce"];
  const familyStatusOptions = ["Middle class", "Upper middle class", "High class", "Rich/Affluent"];
  const familyTypeOptions = ["Joint", "Nuclear"];
  const familyValuesOptions = ["Orthodox", "Traditional", "Moderate", "Liberal"];
  const disabilityOptions = ["None", "Physically challenged"];
  const heightOptions = [
    { label: "4'0\" (122 cm)", value: "4'0\"" },
    { label: "4'1\" (124 cm)", value: "4'1\"" },
    { label: "4'2\" (127 cm)", value: "4'2\"" },
    { label: "4'3\" (130 cm)", value: "4'3\"" },
    { label: "4'4\" (132 cm)", value: "4'4\"" },
    { label: "4'5\" (135 cm)", value: "4'5\"" },
    { label: "4'6\" (137 cm)", value: "4'6\"" },
    { label: "4'7\" (140 cm)", value: "4'7\"" },
    { label: "4'8\" (142 cm)", value: "4'8\"" },
    { label: "4'9\" (145 cm)", value: "4'9\"" },
    { label: "5'0\" (152 cm)", value: "5'0\"" },
    { label: "5'1\" (155 cm)", value: "5'1\"" },
    { label: "5'2\" (157 cm)", value: "5'2\"" },
    { label: "5'3\" (160 cm)", value: "5'3\"" },
    { label: "5'4\" (163 cm)", value: "5'4\"" },
    { label: "5'5\" (165 cm)", value: "5'5\"" },
    { label: "5'6\" (168 cm)", value: "5'6\"" },
    { label: "5'7\" (170 cm)", value: "5'7\"" },
    { label: "5'8\" (173 cm)", value: "5'8\"" },
    { label: "5'9\" (175 cm)", value: "5'9\"" },
    { label: "6'0\" (183 cm)", value: "6'0\"" },
    { label: "6'1\" (185 cm)", value: "6'1\"" },
    { label: "6'2\" (188 cm)", value: "6'2\"" },
    { label: "6'3\" (191 cm)", value: "6'3\"" },
    { label: "6'4\" (193 cm)", value: "6'4\"" },
  ];

  const handleOptionChange = (name, value) => {
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", details);
    // Future: validate and send data to API or context
  };

  const renderButtonGroup = (name, options) => (
    <div className="form-group">
      <label>{name.replace(/([A-Z])/g, ' $1')}</label>
      <div className="options-container">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={`option-button ${details[name] === option ? "active" : ""}`}
            onClick={() => handleOptionChange(name, option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bodybackground">
      <form className="personal-details-container" onSubmit={handleSubmit}>
        <h2 className="form-title">Tell us about your personal details</h2>

        {renderButtonGroup("maritalStatus", maritalStatusOptions)}

        <div className="form-group">
          <label>height</label>
          <select
            className="height-select"
            value={details.height}
            onChange={(e) => handleOptionChange("height", e.target.value)}
          >
            <option value="">Feet / Inches (cms)</option>
            {heightOptions.map((height) => (
              <option key={height.value} value={height.value}>
                {height.label}
              </option>
            ))}
          </select>
        </div>

        {renderButtonGroup("familyStatus", familyStatusOptions)}
        {renderButtonGroup("familyType", familyTypeOptions)}
        {renderButtonGroup("familyValues", familyValuesOptions)}
        {renderButtonGroup("disability", disabilityOptions)}

        <Link to="/professionaldetails" className="default-btn style-2">
          {btnText}
        </Link>
      </form>
    </div>
  );
};

export default PersonalDetails;
