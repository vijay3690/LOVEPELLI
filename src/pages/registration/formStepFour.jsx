import React ,{useEffect,useState} from 'react';
import { useNavigate } from "react-router-dom";
import "./registration.css";



const employmentOptions = [
  "Government",
  "Public/Private Sector",
  "Defense",
  "Self Employed",
  "Un-Employed",
  "Business",
  "Farmer"
];

const FormStepFour = ({UserData, setUserData, prevStep}) => {  
   const [educations, setEducations] = useState([]);
   const [educationsubStreams, setEducationSubStreams] = useState([]);
   const [occupations, setOccupations] = useState([]);
   const [countries, setCountries] = useState([]);
   const [states, setStates] = useState([]);
   const [cities, setCities] = useState([]);
   const [errors, setErrors] = useState({});
   const [isOtherOrUnderGraduate, setOtherOrUnderGraduate] = useState(true);
   const [isIndiaSelected, setIsIndiaSelected] = useState(false);
   const [countryId, setCountryId] =useState([]);
   const [showOtherEducation, setShowOtherEducation] = useState(false);
   const navigate = useNavigate();
   const Base_api=import.meta.env.VITE_BASE_URL;  

   const handleChange = (e) => {
    const { name, value } = e.target;

     setUserData((prev) => ({
                  ...prev,
                  [name]: value,
                }));
    
     // Clear error when user selects a value
    if (value) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  
  };

 
const safeFetch = async (url, setter, label, options = {}) => {
  try {
    const res = await fetch(url, options); // 👈 now using options
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    }
    const data = await res.json();
    if (setter) setter(data); // only call setter if provided
    return data; // 👈 return data so caller can use it
  } catch (err) {
    console.error(`Error ${label} from ${url}:`, err);
    throw err; // 👈 rethrow so handleSubmit can catch it
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default form submission

  try {

if(validateForm()) {

        const userResponse = await safeFetch(
        `${Base_api}/api/Users`,
        null,
        "Create User",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: UserData.firstName,
            lastName: UserData.lastName,
            gender: UserData.gender,
            dateOfBirth: UserData.dob,
            email: UserData.email,
            password: UserData.password,
            contactNumber: UserData.contactNumber,
          }),
        }
      );

      if (!userResponse) {
        throw new Error("Failed to create user");
      }

      //  API must return something like { id: 123 } or { userId: 123 }
      const userId = userResponse.id ?? userResponse.userId;

      const profileResponse = await safeFetch(
        `${Base_api}/api/UserProfile`,
        null,
        "Create UserProfile",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userId,
            religionId: UserData.religionId,
            casteId: UserData.casteId,
            motherTongueId: UserData.motherTongueId,
            weightId: UserData.weightId,
            heightId: UserData.heightId,
            educationId: UserData.educationId,
            occupationId: UserData.occupationId ==0 ? null: UserData.occupationId,
            educationSubStreamId: UserData.educationSubStreamId ==0 ? null : UserData.educationSubStreamId,
            cityId: UserData.cityId ==0? null : UserData.cityId,
            countryId: UserData.countryId,
            stateId: UserData.stateId ==0 ? null : UserData.stateId,
            profileForId: UserData.profileForDataId,
            doshamId: UserData.doshamId ==0 ? null: UserData.doshamId,
            divisionId: UserData.divisionId == 0 ? null : UserData.divisionId,
            gothramId: UserData.gothramId == 0 ? null : UserData.gothramId,
            subCasteId: UserData.subCasteId == 0 ? null : UserData.subCasteId,
            gothramName: UserData.gothramName,
            professionalDetailId: UserData.professionalDetailId,
            Citizenship: UserData.Citizenship,
            professionalDetailDto: {
              educationId: UserData.educationId,
              employedIn: UserData.employedIn,
              educationSubStreamId: UserData.educationSubStreamId,
              occupationId: UserData.occupationId ==0 ? null: UserData.occupationId,
              currency: UserData.currency,
              incomeValue: UserData.incomeID,
              countryId: UserData.countryId,
              stateId: UserData.stateId ==0 ? null : UserData.stateId,
              cityId: UserData.cityId ==0? null : UserData.cityId ,
            },
            personalDetailId: UserData.personalDetailId,
            personalDetailsDto: {
              maritalStatus: UserData.maritalStatus,
              noOfChildren: UserData.noOfChildren,
              livingWithMe: true,
              heightId: UserData.heightId,
              familyStatus: UserData.familyStatus,
              familyType: UserData.familyType,
              anyDisability: true,
            },
            profilePicture: UserData.profilePicture,
            eatingHabits: UserData.eatingHabits,
            smokingHabits: UserData.smokingHabits,
            drinkingHabits: UserData.drinkingHabits,
          }),
        }
      );

      const result = profileResponse.userProfileId;
      if (result !== 0) {
        alert("User and Profile created successfully!");

        // call login api to get the token for the  user
       const loginToken = await safeFetch(
          `${Base_api}/api/Login`,
          null ,
          "token",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: UserData.email,
              password: UserData.password
            }),
          }
      );

        localStorage.setItem("token", loginToken.token);

        navigate ("/members");
      }
}

  } catch (err) {
    console.error(err);
    alert("Error: " + err.message);
  }
};

useEffect(() => {
    const fetchDropdownData = async () => {
      safeFetch(`${Base_api}/api/ProfessionalDetails/educations`, setEducations, 'educations');
      safeFetch(`${Base_api}/api/ProfessionalDetails/occupations`, setOccupations, 'occupations');
      safeFetch(`${Base_api}/api/ProfessionalDetails/countries`, setCountries, 'countries');
    };
    fetchDropdownData();
  }, []);

 useEffect(() => {
    if (UserData.educationId && !isOtherOrUnderGraduate) {
      safeFetch(`${Base_api}/api/ProfessionalDetails/education-substreams/${UserData.educationId}`, setEducationSubStreams, 'educationsubstreams');
    }
  }, [UserData.educationId]);

useEffect(() => {
  if (UserData.countryId && isIndiaSelected) {
    safeFetch(`${Base_api}/api/ProfessionalDetails/states/${UserData.countryId}`, setStates, 'states');
  } else {
    setStates([]); 
  }
}, [UserData.countryId,isIndiaSelected]);

  useEffect(() => {
    if (UserData.stateId && isIndiaSelected) {
      safeFetch(`${Base_api}/api/ProfessionalDetails/cities/${UserData.stateId}`, setCities, 'cities');
    }else {
    setCities([]); 
  }
  }, [UserData.stateId,isIndiaSelected]);

  const validateForm = () => {
    let newErrors = {};
 
    if (!UserData.educationId) newErrors.educationId = "Highest Education is required";
    if (!UserData.educationSubStreamId) newErrors.educationSubStreamId = "Education Substream is required";
    if (!UserData.employedIn) newErrors.employedIn = "Employment Status is required";
    if (!UserData.occupationId) newErrors.occupationId = "Occupation is required";
    if (!UserData.incomeID) newErrors.incomeID = "Annual Income is required";
    if (!UserData.countryId) newErrors.countryId = "Country is required";
    if (!UserData.stateId && isIndiaSelected) newErrors.stateId = "State is required";
    if (!UserData.cityId && isIndiaSelected) newErrors.cityId = "City is required";
   if (showOtherEducation && !UserData.otherEducation) newErrors.otherEducation = "Please enter your education";

 
    setErrors(newErrors);
     console.log("Validation Errors:", newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const  closeModal =  () =>{
    navigate("/")
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
         <button  className="close-btn" onClick={closeModal}>X</button>
        <h2 className="form-title">Professional Details</h2>

        {/* Education */}
        <div className="form-group">
          <label>
            Highest Education <span className="required">*</span>
          </label>
     
            <select
              name="educationId"
              value={UserData.educationId}
              onChange={(e) => {
                const { name, value } = e.target;
                setUserData((prev) => ({
                  ...prev,
                  [name]: value,
                }));
                if (["1", "2", "7", ""].includes(value)) {
                  setOtherOrUnderGraduate(true);
                } else {
                  setOtherOrUnderGraduate(false);
                }
                // Show Other textbox if value is "999" or your "Other" key
                if (value === "999") {
                  setShowOtherEducation(true);
                } else {
                  setShowOtherEducation(false);
                  setUserData((prev) => ({
                    ...prev,
                    otherEducation: "", // Clear when not Other
                  }));
                }
              }}
            >
                <option value="">Select</option>
                {educations.map((item) => (
                  <option key={item.educationId} value={item.educationId}>
                    {item.educationLevel}
                  </option>
                ))}
                <option value="999">Other</option> {/* Append if not in API */}
              </select>

              {/* Show Other textbox */}
              {showOtherEducation && (
                <div className="form-group">
                  <label>
                    Please specify your education <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="otherEducation"
                    value={UserData.otherEducation || ""}
                    onChange={handleChange}
                    placeholder="Enter your education"
                    required
                  />
                  {errors.otherEducation && !UserData.otherEducation && (
                    <p className="error-text">{errors.otherEducation}</p>
                  )}
                </div>
              )}

          {/* Show validation error only if no Highest Education selected */}
            {errors.educationId && !UserData.educationId && (
              <p className="error-text">{errors.educationId}</p>
            )}
        </div>
   {/* Only show substream if not Others and not undergrad/other */}
{!showOtherEducation && !isOtherOrUnderGraduate && (
      <>
       <div className="form-group">
          <label>
            Education SubStream <span className="required">*</span>
          </label>
          <select
            name="educationSubStreamId"
            value={UserData.educationSubStreamId}
            onChange={handleChange}
          >
            <option value="">Select</option>
            {educationsubStreams.map((item) => (
              <option
                key={item.educationSubStreamId}
                value={item.educationSubStreamId}
              >
                {item.subStreamName}
              </option>
            ))}
          </select>
              {/* Show validation error only if no Highest Education selected */}
            {errors.educationSubStreamId && !UserData.educationSubStreamId && (
              <p className="error-text">{errors.educationSubStreamId}</p>
            )}
        </div>
        </>
        )
      }

       {/* Employment */}
        <div className="form-group">
          <label>
            Employee Status <span className="required">*</span>
          </label>  
          <div className="option-group">
            {employmentOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={
                  UserData.employedIn === option ? "selected" : ""
                }
                onClick={() =>
                  setUserData((prev) => ({
                    ...prev,
                    employedIn: option,
                  }))
                }
              >
                {option}
              </button>
            ))}
          </div>
                {/* Show validation error only if no  Employee Status selected */}
            {errors.employedIn && !UserData.employedIn && (
              <p className="error-text">{errors.employedIn}</p>
            )}
        </div>

       {/* Occupation */}
          <div className="form-group">
          <label>
            Occupation <span className="required">*</span>
          </label>
          <select
            name="occupationId"
            value={UserData.occupationId}
            onChange={handleChange}
          >
            <option value="">Select</option>
            {occupations.map((item) => (
              <option key={item.occupationId} value={item.occupationId}>
                {item.occupationName}
              </option>
            ))}
          </select>
          {/* Show validation error only if no  Employee Status selected */}
            {errors.occupationId && !UserData.occupationId && (
              <p className="error-text">{errors.occupationId}</p>
            )}
        </div>
        
              {/* Income */}
        <div className="form-group">
          <label>
            Annual Income <span className="required">*</span>
          </label>
          <select
            name="incomeID"
            value={UserData.incomeID}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="1">0-1 lakh</option>
            <option value="2">1-2 lakh</option>
            <option value="3">2-3 lakh</option>
            <option value="4">3-4 lakh</option>
            <option value="5">4-5 lakh</option>
            <option value="6">5-6 lakh</option>
            <option value="7">6-7 lakh</option>
            <option value="8">7-8 lakh</option>
            <option value="9">8-9 lakh</option>
            <option value="10">9-10 lakh</option>
            <option value="11">10-15 lakh</option>
            <option value="12">15-20 lakh</option>
            <option value="13">20-25 lakh</option>
            <option value="14">25-30 lakh</option>
            <option value="15">30-40 lakh</option>
            <option value="16">40-50 lakh</option>
            <option value="17">1 Crore & Above</option>
          </select>
           {/* Show validation error only if no  Annual Income selected */}
            {errors.incomeID && !UserData.incomeID && (
              <p className="error-text">{errors.incomeID}</p>
            )}
        </div>

    
        {/* Location */}
        <div className="form-group">
          <label>
            Country <span className="required">*</span>
          </label>
          <select
            name="countryId"
            value={UserData.countryId}
            onChange={(e) => {
                const { name, value } = e.target;
                if (name === "countryId") {
                    setCountryId(value);
                    if (value === "98") {
                      setIsIndiaSelected(true);   // India → show State & City
                       setUserData((prev) => ({
                      ...prev,
                      [name]: name == "countryId" ? Number(value) : value
                    }));
                    } else {
                      setIsIndiaSelected(false);  // Other country → show Citizenship textbox
                       setUserData((prev) => ({
                      ...prev,
                       [name]: name == "countryId" ? Number(value) : value,
                      stateId : 0,
                      cityId : 0
                    }));
                    }
              }
             
             }}
          >
            <option value="">Select</option>
            {countries.map((item) => (
              <option key={item.countryId} value={item.countryId}>
                {item.countryName}
              </option>
            ))}
          </select>
      {/* Show validation error only if no  country selected */}
            {errors.countryId && !UserData.countryId && (
              <p className="error-text">{errors.countryId}</p>
            )}
        </div>
        {isIndiaSelected && (
         <>
          <div className="form-group">
          <label>
            State <span className="required">*</span>
          </label>
          <select
            name="stateId"
            value={UserData.stateId}
            onChange={handleChange}
          >
            <option value="">Select</option>
            {states.map((item) => (
              <option key={item.stateId} value={item.stateId}>
                {item.stateName}
              </option>
            ))}
          </select>
          {/* Show validation error only if no  city selected */}
            {errors.stateId && !UserData.stateId && (
              <p className="error-text">{errors.stateId}</p>
            )}
        </div>

           <div className="form-group">
          <label>
            City <span className="required">*</span>
          </label>
          <select
            name="cityId"
            value={UserData.cityId}
            onChange={handleChange}
          >
            <option value="">Select</option>
            {cities.map((item) => (
              <option key={item.cityId} value={item.cityId}>
                {item.cityName}
              </option>
            ))}
          </select>
         {/* Show validation error only if no  city selected */}
            {errors.cityId && !UserData.cityId && (
              <p className="error-text">{errors.cityId}</p>
            )}
        </div>
        </>
        )
      }

        {/*Citizenship */}
        {countryId != 98 && (
          <>
        <div className='form-group'>
          <label htmlFor='Citizenship'></label>
          <input 
          type='text'
          name='Citizenship'
          value = {UserData.Citizenship}
          onChange={handleChange}
          placeholder='Enter your Citizenship'
          required
          className="border p-2 rounded w-full"
          />
        </div>
        </>
        )}

       {/* Buttons */}
        <div className="form-actions">
          <button className="btn secondary" onClick={prevStep}>
            Previous
          </button>
          <button className="btn primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );

};
export default FormStepFour;
