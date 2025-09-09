import React, { useState } from "react"
import "./createprofile.css";
import BasicDetailsForm from "./basicdetails";

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

const FormRadioGroup = ({ label, name, value, onChange, options }) => (
  <div className="form-group">
    <label className="form-label">{label}</label>
    <div className="radio-group">
      {options.map((opt) => (
        <label key={opt} className="radio-label">
          <input type="radio" name={name} value={opt} checked={value === opt} onChange={onChange} />
          {opt}
        </label>
      ))}
    </div>
  </div>
);

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

const MatrimonyProfile = ({ UserData, onChange, onNext }) => (
  <form onSubmit={onNext} className="form-grid">
    <h2 className="form-title">Match-Making-Profile</h2>
    <FormInput label="Name" type="text" name="name" value={UserData.name} onChange={onChange} required />
    <FormSelect label="Profile For" name="profileFor" value={UserData.profileFor} onChange={onChange}
      options={["Myself", "Son", "Daughter", "Brother", "Sister", "Relative", "Friend"]} />
    <FormRadioGroup label="Gender" name="gender" value={UserData.gender} onChange={onChange}
      options={["Male", "Female", "Other"]} />
    <FormInput label="Mobile" type="tel" name="mobile" value={UserData.mobile} onChange={onChange} required/>
    <FormInput label="Email" type="email" name="email" value={UserData.email} onChange={onChange} required />
    <FormInput label="Password" type="password" name="password" value={UserData.password} onChange={onChange} required />
    <FormInput label="Confirm Password" type="password" name="confirmPassword"
      value={UserData.confirmPassword} onChange={onChange} required />
    <button type="submit" className="next-btn">Save & Continue</button>
  </form>
);

const MatrimonyForm = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [step, setStep] = useState(1);
  const [UserData, setUserData] = useState({
    name: "", profileFor: "", gender: "", email: "", mobile: "", password: "", confirmPassword: "", dob: "", religion: "", religionDivision: "",
    subCaste: "", caste: "", motherTongue: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "religion") {
        updated.religionDivision = "";
        updated.subCaste = "";
      }
      if (name === "religionDivision") {
        updated.subCaste = "";
      }
      return updated;
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (UserData.password !== UserData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setStep(2); // Proceed
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final Submitted Data:", UserData);
    alert("Profile submitted successfully!");
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      {step === 1 ? (
        <MatrimonyProfile
          UserData={UserData}
          onChange={handleChange}
          onNext={handleNext}
        />
      ) : (
        <BasicDetailsForm
          UserData={UserData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
    </Modal>
  );
};

export default MatrimonyForm;
