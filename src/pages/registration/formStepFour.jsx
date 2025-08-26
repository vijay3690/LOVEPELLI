import React ,{useEffect,useState} from 'react';
import "./registration.css";
import { BASE_APIURL, BASE_APIURLUSER, BASE_APIURLPROFILE } from './registerconstants';
import { use } from 'react';




     const employmentOptions = [
  "Government",
  "Public/Private Sector",
  "defense",
  "Self Employed",
  "Un-Employed",
  "Business",
  "Former"
];

const FormStepFour = ({
  UserData, setUserData, prevStep
}) => {  


   const [educations, setEducations] = useState([]);
   const [educationsubstreams, setEducationSubstreams] = useState([]);
   const [occupations, setOccupations] = useState([]);
   const [countries, setCountries] = useState([]);
   const [states, setStates] = useState([]);
   const [cities, setCities] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: name == "countryId" ? Number(value) : value
    }));
  };

   const [incomeValue, setIncomeValue] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default form submission

  try {

    const userResponse = await fetch(`${BASE_APIURLUSER}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        firstName: UserData.firstName,
        lastName: UserData.lastName,
        gender: UserData.gender,
        dateOfBirth: UserData.dob,
        email: UserData.email,
        password: UserData.password,
        contactNumber: UserData.contactNumber,

      }),
    });

    if (!userResponse.ok) throw new Error("Failed to create user");

    const user = await userResponse.json();
    const userId = user.id; // assuming API returns { userId: ... }

    
     
    const profileResponse = await fetch(`${BASE_APIURLPROFILE}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
           userId: userId,
       religionId: UserData.religionId,
        casteId: UserData.casteId,
        motherTongueId: UserData.motherTongueId,
        weightId: UserData.weightId,
        heightId: UserData.heightId,
        educationId: UserData.educationId,
        occupationId: UserData.occupationId,
        incomeId: UserData.incomeId,
        cityId: UserData.cityId,  
        countryId: UserData.countryId,
        stateId: UserData.stateId,
        address: UserData.address,
        profileForId: UserData.profileForDataId,
        doshamId: UserData.doshamId,
        divisionId: UserData.divisionId,
        gothramId: UserData.gothramId,
        subCasteId: UserData.subCasteId, 
        gothramName: UserData.gothramName,  
      professionalDetailId: UserData.professionalDetailId,
      professionalDetailDto: {
        educationId: UserData.educationId,
        employedIn: UserData.employmentStatus,
        occupationId: UserData.occupationId,
        currencyIncome: UserData.incomeId,
        currencyValue: UserData.incomeValue,
        workLocation: UserData.workLocation,
        state: UserData.stateId,
        city: UserData.cityId,
        residentStatus: UserData.address,
      },
      personalDetailId: UserData.personalDetailId,
      personalDetailsDto: {
        maritalStatus: UserData.maritalStatus,
        noOfChildren: UserData.noOfChildren,
        livingWithMe: true,
        heightId: UserData.heightId,
        familyStatus: UserData.familyStatus,
        familyType: UserData.familyType,
        anyDisability: true
      },
      profilePicture: UserData.profilePicture,
      eatingHabits: UserData.eatingHabits,
      smokingHabits: UserData.smokingHabits,
      drinkingHabits: UserData.drinkingHabits
    })
    });



    alert("User and Profile created successfully!");
  } catch (err) {
    console.error(err);
    alert("Error: " + err.message);
  }
};

useEffect(() => {
    const fetchDropdownData = async () => {
      safeFetch(`${BASE_APIURL}/educations`, setEducations, 'educations');
      safeFetch(`${BASE_APIURL}/occupations`, setOccupations, 'occupations');
      safeFetch(`${BASE_APIURL}/countries`, setCountries, 'countries');
      safeFetch(`${BASE_APIURL}/states`, setStates, 'states');
      safeFetch(`${BASE_APIURL}/cities`, setCities, 'cities');
      safeFetch(`${BASE_APIURL}/incomes`, setIncomeValue, 'income values');
    };
    fetchDropdownData();
  }, []);

 useEffect(() => {
    if (UserData.educationId) {
      safeFetch(`${BASE_APIURL}/education-substreams/${UserData.educationId}`, setEducationSubstreams, 'educationsubstreams');
    }
  }, [UserData.educationId]);

  // useEffect(() => {
  //   if (UserData.countryId) {
  //     safeFetch(`${BASE_APIURL}/states/${UserData.countryId}`, setStates, 'states');
  //   }
  // }, [UserData.countryId]);

useEffect(() => {
  if (UserData.countryId) {
    safeFetch(`${BASE_APIURL}/states/${UserData.countryId}`, setStates, 'states');
  } else {
    setStates([]); 
  }
}, [UserData.countryId]);

  useEffect(() => {
    if (UserData.stateId) {
      safeFetch(`${BASE_APIURL}/cities/${UserData.stateId}`, setCities, 'cities');
    }
  }, [UserData.stateId]);




  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="form-title">Professional Details</h2>

        {/* Education */}
        <div className="form-group">
          <label>Highest Education:</label>
          <select name="educationId" value={UserData.educationId} onChange={handleChange}>
            <option value="">Select</option>
            {educations.map((item) => (
              <option key={item.educationId} value={item.educationId}>
                {item.educationLevel}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Education Substream:</label>
          <select name="educationSubstreamId" value={UserData.educationSubstreamId} onChange={handleChange}>
            <option value="">Select</option>
            {educationsubstreams.map((item) => (
              <option key={item.educationSubstreamId} value={item.educationSubstreamId}>
                {item.subStreamName}
              </option>
            ))}
          </select>
        </div>
       

        {/* Employment Details */}


        <div>
          <label>Employee Status</label>
          <div className="option-group">
            {employmentOptions.map((option) => (
              <button
                key={option}
                className={UserData.employmentStatus === option ? "selected" : ""}
                onClick={() =>
                  setUserData((prev) => ({ ...prev, employmentStatus: option }))
                }
              >
                {option}
              </button>
            ))}
          </div>
        </div>


        <div className="form-group">
          <label>Occupation:</label>
          <select name="occupationId" value={UserData.occupationId} onChange={handleChange}>
            <option value="">Select</option>
            {occupations.map((item) => (
              <option key={item.occupationId} value={item.occupationId}>{item.occupationName}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Annual Income </label>
          <select name="incomeId" value={UserData.incomeId} onChange={handleChange}>
            <option value="">Select</option>
            {incomeValue.map((item) => (
              <option key={item.incomeId} value={item.incomeId}>{item.incomeValue}</option>
            ))}
          </select>
        </div>

       

        {/* Location */}
        <div className="form-group">
          <label>Country:</label>
          <select name="countryId" value={UserData.countryId} onChange={handleChange}>
            <option value="">Select</option>
            {countries.map((item) => (
              <option key={item.countryId} value={item.countryId}>{item.countryName}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>State:</label>
          <select name="stateId" value={UserData.stateId} onChange={handleChange}>
            <option value="">Select</option>
            {states.map((item) => (
              <option key={item.stateId} value={item.stateId}>{item.stateName}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>City:</label>
          <select name="cityId" value={UserData.cityId} onChange={handleChange}>
            <option value="">Select</option>
            {cities.map((item) => (
              <option key={item.cityId} value={item.cityId}>{item.cityName}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={UserData.address}
            onChange={handleChange}
          />
        </div>

        {/* Buttons */}
        <div className="form-actions">
          <button className="btn secondary" onClick={prevStep}>Previous</button>
          <button className="btn primary" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default FormStepFour;
