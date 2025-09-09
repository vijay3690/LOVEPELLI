import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./professional.css";

const btnText = "Submit";

const qualificationOptions = [
  "No Formal Education", "Primary School", "Middle School","High School (10th)","Higher Secondary (12th)","Diploma/Polytechnic",
  "ITI/Trade School",  "B.A", "B.Com", "B.Sc","BBA","BCA","B.Tech/BE","LLB","MBBS", "BDS","B.Pharm","B.Ed","M.A","M.Com",
   "M.Sc","MBA/PGDM","MCA", "M.Tech/ME","LLM","MD/MS",  "MDS","M.Pharm", "M.Ed","Chartered Accountant (CA)", "Company Secretary (CS)",
  "Cost Management Accounting (CMA)", "PhD","Postdoctoral", "Other"]

const employedInOptions = [
  "Government/Public Sector", "Private Sector", "Business/Self Employed", "Defense", "Not Working"
];

const occupationOptions = [
    "Unemployed","Student","Apprentice/Intern","Clerk/Typist","Receptionist","Customer Service Representative","Sales Executive","Technician", "Electrician/Plumber/Mechanic","Police/Constable",
    "Teacher (School)","Teacher (College)","Nurse/Healthcare Worker","Accountant", "Marketing Executive","Engineer (Civil/Mechanical/etc.)","Software Developer/Engineer","Data Analyst/Scientist","Pharmacist", "Doctor (General)","Surgeon/Specialist","Lawyer/Advocate",
    "Judge/Magistrate","Defense Personnel (Army/Navy/Airforce)","Government Officer (IAS/IPS/IRS/IFS)","Bank Officer/Manager","Professor/Lecturer",
    "Chartered Accountant","Company Secretary","Entrepreneur/Startup Founder",  "Business Owner","CEO/Director/Top Executive","Other"
];

const incomeOptions = [
  "No Income", "Below ₹2 LPA", "₹2-5 LPA", "₹5-7 LPA", "₹7-10 LPA", "₹10-15 LPA", "₹15-20 LPA","Above ₹20-25 LPA"
];

const jobTypeOptions = [
  "Permanent","Temporary", "Full-Time","Part-Time","Contract","Outsourcing",  "Secured Job"
];


const ProfessionalDetails = () => {
  const [details, setDetails] = useState({
  highestQualification: "",
  employedIn: "",
  occupation: "",
  annualIncome: "",
  jobType:""
  });


  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Professional Details:", details);
    // You can move to next page, save data, etc. here
  };

  return (
    <div className="formbackground">
      
  
    <div className="professional-details-container">
      <h2 className="section-title">Professional Details</h2>

      {/* Highest Qualification */}
      <div className="field">
      <label htmlFor="qualification" className="field-label">Highest Qualification</label>
        <select
          name="highestQualification"
          value={details.highestQualification}
          onChange={handleChange}
          className="field-select"
        >
          <option value="">Select Qualification</option>
          {qualificationOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* Employed In */}
      <div className="field">
        <label className="field-label">Employed In</label>
        <div className="field-options">
          {employedInOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={`option-button ${details.employedIn === option ? "selected" : ""}`}
              onClick={() => setDetails({ ...details, employedIn: option })}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Occupation */}
      <div className="field">
        <label className="field-label">Occupation</label>
        <select
          name="occupation"
          value={details.occupation}
          onChange={handleChange}
          className="field-select"
        >
          <option value="">Select Occupation</option>
          {occupationOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* Annual Income */}
      <div className="field">
        <label className="field-label">Annual Income (Rs.)</label>
        <select
          name="annualIncome"
          value={details.annualIncome}
          onChange={handleChange}
          className="field-select"
        >
          <option value="">Select Annual Income</option>
          {incomeOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* Job Type */}
<div className="field">
  <label className="field-label">Job Type</label>
  <div className="field-options">
    {jobTypeOptions.map((option) => (
      <button
        key={option}
        type="button"
        className={`option-button ${details.jobType === option ? "selected" : ""}`}
        onClick={() => setDetails({ ...details, jobType: option })}
      >
        {option}
      </button>
    ))}
  </div>
</div>


      {/* Submit Button */}
   
      <button className="submit-button" onClick={handleSubmit}>
      <Link to="/homefour">{btnText}</Link>
      </button>


    </div>
    </div>
  );
};

export default ProfessionalDetails;
