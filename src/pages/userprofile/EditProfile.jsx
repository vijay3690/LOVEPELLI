
import { Fragment,useState, useEffect, use } from "react";
import HeaderOne from "../../component/layout/headerone";
import axios from "../../../node_modules/axios/index";
import Footer from "../../component/layout/footer";







const EditProfile = () => {
 const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.sub; // or payload.userId (based on your token)
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};

  
 
  const Base_api = import.meta.env.VITE_BASE_URL;
   //view profile data
  const [profile, setProfile] = useState(null);
  
   const [form, setForm] = useState(null);
   const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const[saving,setSaving]=useState(false);
    const[editMode,setEditMode]=useState(false);
    const[motherTongues,setMotherTongues]=useState([]);
    const [religions,setReligions]=useState([]);
    const [castes,setCastes]=useState([]);
    const[cities,setCities]=useState([]);
    const[states,setStates]=useState([]);
    const[countries,setCountries]=useState([]);
    const[subcastes,setSubcastes]=useState([]);
    const[educations,setEducations]=useState([]);
    const[occupations,setOccupations]=useState([]);
    const[divisions ,setDivisions]=useState([]);
    const[educationsubStreams,setEducationSubStreams]=useState([]);
    const india_country_id = "98";
     const disabilityOptions = [
  { label: "Yes", value: true },
  { label: "No", value: false }
];

    

  

   useEffect(() => {
      const pid = getUserIdFromToken();
     if (pid) {
    fetchProfile(pid);
  }else {
    setError("Unauthorized access");
  }
  }, []);
  const fetchProfile = async (pid) => {
    setLoading(true);
    setError(null);
    try {
           const res = await axios.get(`${Base_api}/api/UserProfile/${pid}`);
     
      setProfile(res.data);
      setForm(res.data);
    }catch (err) {
      setError("Error fetching profile data");
    } finally {
      setLoading(false);
    }
  };
  // helper to get ISO yyyy-mm-dd string from Date
      const toDateInputValue = (d) => {
      const pad = (n) => `${n}`.padStart(2, "0");
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
      };
  
      // compute min/max for date input (example: allowed age 18..70)
      const today = new Date();
      const maxDate = toDateInputValue(new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())); // latest DOB allowed
      const minDate = toDateInputValue(new Date(today.getFullYear() - 70, today.getMonth(), today.getDate())); // earliest DOB allowed
  
  
    // helper to set nested values on form state using path like 'basicInformation.firstName'
    const setNestedValue = (path, value) => {
      setForm((prev) => {
        if (!prev) return prev;
        const keys = path.split(".");
        const copy = JSON.parse(JSON.stringify(prev)); // simple deep clone
        let cur = copy;
        for (let i = 0; i < keys.length - 1; i++) {
          const k = keys[i];
          if (cur[k] === undefined || cur[k] === null) cur[k] = {};
          cur = cur[k];
        }
        cur[keys[keys.length - 1]] = value;
        return copy;
      });
    };
  useEffect(() => {
    const fetchDropdownData = async () => {
  
      try {
        const [mtRes, countryRes,edRes,occRes,rgRes] = await Promise.all([
          axios.get(`${Base_api}/api/BasicDetails/motherTongues`),
          axios.get(`${Base_api}/api/ProfessionalDetails/countries`),
          axios.get(`${Base_api}/api/ProfessionalDetails/educations`),
          axios.get(`${Base_api}/api/ProfessionalDetails/occupations`),
          axios.get(`${Base_api}/api/BasicDetails/religions`),  
        ]);
        setMotherTongues(mtRes.data);
        setCountries(countryRes.data);
        setEducations(edRes.data);
        setOccupations(occRes.data);
        setReligions(rgRes.data);
      }
      catch (err) {
        console.error("Error fetching dropdown data", err);
      }
    };

    fetchDropdownData();
  }, []);
useEffect(() => {
  const countryId = form?.groomsLocation?.countryId;

  if (!countryId) return;

  if (countryId === india_country_id) {
    fetchStates(countryId);
  } else {
    setStates([]);
    setCities([]);
    setNestedValue("groomsLocation.stateId", "");
    setNestedValue("groomsLocation.cityId", "");
  }
}, [form?.groomsLocation?.countryId]);

const fetchStates = async (countryId) => {
  console.log("Calling states API with:", countryId);

  try {
    const res = await axios.get(
      `${Base_api}/api/ProfessionalDetails/states/${countryId}`
    );

    console.log("States response:", res.data);
    setStates(res.data);
  } catch (err) {
    console.error("Error fetching states", err);
  }
};

useEffect(() => {
  const stateId = form?.groomsLocation?.stateId;
  if (!stateId) {
    setCities([]);
    return;
  }

  fetchCities(stateId);
}, [form?.groomsLocation?.stateId]);

const fetchCities = async (stateId) => {
  console.log("Calling cities API with:", stateId);
  try {
    const res = await axios.get(
      `${Base_api}/api/ProfessionalDetails/cities/${stateId}`
    );
    console.log("Cities response:", res.data);
    setCities(res.data);
  } catch (err) {
    console.error("Error fetching cities", err);
  }
};
const onCountryChange = (e) => {
  const value = e.target.value;

  // set country
  setNestedValue("groomsLocation.countryId", value);

  // reset dependent fields
  setNestedValue("groomsLocation.stateId", "");
  setNestedValue("groomsLocation.cityId", "");

  // clear dropdown data
  setStates([]);
  setCities([]);
};
const onEducationChange = (e) => {
  const value = e.target.value;
  // set education
  setNestedValue("professionalInformation.educationId", value);
  // reset dependent field
  setNestedValue("professionalInformation.subStreamId", "");
  // clear dropdown data
  setEducationSubStreams([]);
};

useEffect(() => {
  const educationId = form?.professionalInformation?.educationId;
  if (!educationId) {
    setEducationSubStreams([]);
    return;
  }
  fetchEducationSubStreams(educationId);
}, [form?.professionalInformation?.educationId]);
const fetchEducationSubStreams = async (educationId) => {
  console.log("Calling education substreams API with:", educationId);
  try {
    const res = await axios.get(
      `${Base_api}/api/ProfessionalDetails/education-SubStreams/${educationId}`
    );
    console.log("Education SubStreams response:", res.data);
    setEducationSubStreams(res.data);
  } catch (err) {
    console.error("Error fetching education substreams", err);
  }
};

useEffect(() => {
  const religionId = form?.religionIformation?.religionId;

  if (!religionId) {
    setCastes([]);
    setSubcastes([]);
    setDivisions([]);

    setNestedValue("religionIformation.casteId", "");
    setNestedValue("religionIformation.subcasteId", "");
    setNestedValue("religionIformation.divisionId", "");
    return;
  }

  fetchCastes(religionId);
  fetchDivisions(religionId);
}, [form?.religionIformation?.religionId]);
const fetchCastes = async (religionId) => {
  console.log("Calling castes API with:", religionId);
  try {
    const res = await axios.get(
      `${Base_api}/api/BasicDetails/castes/${religionId}`
    );
    console.log("Castes response:", res.data);
    setCastes(res.data);
  } catch (err) {
    console.error("Error fetching castes", err);
  }
};
const fetchDivisions = async (religionId) => {
  console.log("Calling divisions API with:", religionId);
  try {
    const res = await axios.get(
      `${Base_api}/api/BasicDetails/division/${religionId}`
    );
    console.log("Divisions response:", res.data);
    setDivisions(res.data);
  } catch (err) {
    console.error("Error fetching divisions", err);
  }
};
useEffect(() => {
  const casteId = form?.religionIformation?.casteId;
  if (!casteId) {
  setSubcastes([]);
  setNestedValue("religionIformation.subcasteId", "");
  return;
}
  fetchSubcastes(casteId);
}, [form?.religionIformation?.casteId]);
const fetchSubcastes = async (casteId) => {
  console.log("Calling subcastes API with:", casteId);
  try {
    const res = await axios.get(
      `${Base_api}/api/BasicDetails/subcastes/${casteId}`
    );
    console.log("Subcastes response:", res.data);
    setSubcastes(res.data);
  } catch (err) {
    console.error("Error fetching subcastes", err);
  }
};

const onReligionChange = (e) => {
  const value = e.target.value;
  setNestedValue("religionIformation.religionId", value);
  setNestedValue("religionIformation.casteId", "");
  setNestedValue("religionIformation.subCasteId", "");
  setNestedValue("religionIformation.divisionId", "");
  setCastes([]);
  setSubcastes([]);
  setDivisions([]);
};

useEffect(() => {
  console.log("EDIT PAGE FORM:", form);
}, [form]);
  

     const handleEnterEdit = () => {
    // make sure we have the latest profile snapshot in form
    setForm(profile ? JSON.parse(JSON.stringify(profile)) : null);
    setEditMode(true);
  };
    const handleCancel = () => {
      // revert changes
      setForm(profile ? JSON.parse(JSON.stringify(profile)) : null);
      setEditMode(false);
      setError(null);
    };
  
      const validateForm = () => {
      // Validate first name
  
        if (!form || !form.basicInformation) {
      setError("Something went wrong. Basic information not found.");
      return false;
    }
      if (!form?.basicInformation?.firstName?.trim()==="") {
          setError("First name is required");
          return false;
      }
  
      // Validate DOB
      const dob = form?.basicInformation?.age; // "yyyy-mm-dd"
      if (!dob) {
          setError("Date of Birth is required");
          return false;
      }
  
      // Validate DOB is a legal date
      const parsed = new Date(dob);
      if (isNaN(parsed.getTime())) {
          setError("Invalid Date of Birth format");
          return false;
      }
  
      // Optional: Validate age range (example: 18–70 yrs)
      const today = new Date();
      const age =
          today.getFullYear() -
          parsed.getFullYear() -
          (today < new Date(today.getFullYear(), parsed.getMonth(), parsed.getDate()) ? 1 : 0);
  
      if (age < 18 || age > 70) {
          setError("Age must be between 18 and 70 years");
          return false;
      }
  
      setError(null);
      return true;
      };
  
  
    const handleSave = async () => {
      if (!validateForm()) return;
      setSaving(true);
      setError(null);
      try {
  
        const pid = getUserIdFromToken();
          const payload = JSON.parse(JSON.stringify(form)); // clone
  
          const dobValue = payload?.basicInformation?.age; // e.g. "1998-05-27"
          // payload.basicInformation.profileId = pid;
          // payload.basicInformation.profileForDataId = 1;
          if (dobValue) {
          // Create an ISO string (midnight UTC) - backend DateTime.Parse can read this.
          // Using new Date(dobValue) is safe when dobValue is yyyy-mm-dd.
          payload.basicInformation.age = new Date(dobValue).toISOString();
          } else {
          payload.basicInformation.age = null; // or leave undefined if optional
          }
  
  
        // use PUT or PATCH depending on backend contract
        const res = await axios.put(`${Base_api}/api/UserProfile/${pid}`, payload);
        setProfile(res.data); // update view with saved data (assumes API returns updated)
        setForm(res.data);
        setEditMode(false);
      } catch (err) {
        console.error("Save failed", err);
        // attempt to show message from server
        setError(err?.response?.data?.message ?? "Failed to save profile");
      } finally {
        setSaving(false);
      }
    };
  
    // Render guard
    if (loading && !profile) return <p>Loading profile...</p>;
    if (!profile && !loading) return <p>No profile found.</p>;
    return (
      <Fragment>
        <HeaderOne />
        
 <div className="info-card mb-4">
        <div className="info-card-title d-flex justify-content-between align-items-center">
          <h6>Basic Information</h6>

          {!editMode ? (
            <div>
             <button
             type="button"
             className="btn btn-sm btn-primary me-2"
             onClick={handleEnterEdit}
             disabled={loading || saving || !profile}
             title={loading ? "Loading..." : !profile ? "Profile not loaded" : "Edit profile"}
>
  {loading ? "Loading..." : "Edit"}
</button>
            </div>
          ) : (
            <div>
              <button className="btn btn-sm btn-success me-2" onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </button>
              <button className="btn btn-sm btn-secondary" onClick={handleCancel} disabled={saving}>
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="info-card-content">
          {error && <div className="alert alert-danger">{error}</div>}

          {/* show either view or form */}
          {!editMode ? (
            <ul className="info-list">
              <li>
                <p className="info-name">Name</p>
                <p className="info-details">
                  {profile?.basicInformation?.firstName ?? ""} {profile?.basicInformation?.lastName ?? ""}
                </p>
              </li>

              <li>
                <p className="info-name">Age</p>
                <p className="info-details">{profile?.basicInformation?.age ?? ""}</p>
              </li>

              <li>
                <p className="info-name">Height</p>
                <p className="info-details">{profile?.basicInformation?.heightValue ?? ""}</p>
              </li>
              
              <li>
                <p className="info-name">Weight</p>
                <p className="info-details">{profile?.basicInformation?.weightId ?? ""}</p>
              </li>
               <li>
                <p className="info-name">profileForName</p>
                <p className="info-details">{profile?.basicInformation?.profileForName ?? ""}</p>
              </li>
               <li>
                <p className="info-name">Any Disability</p>
                <p className="info-details">{profile?.basicInformation?.anyDisability ?? ""}</p>
              </li>
               <li>
                <p className="info-name">Mother Tongue</p>
                <p className="info-details">{profile?.basicInformation?.motherTongueName ?? ""}</p>
              </li>
               <li>
                <p className="info-name">Marital Status</p>
                <p className="info-details">{profile?.basicInformation?.maritalStatus ?? ""}</p>
              </li>
               <li>
                <p className="info-name">Food Habits</p>
                <p className="info-details">{profile?.basicInformation?.foodHabits ?? ""}</p>
              </li>
               <li>
                <p className="info-name">Smoking Habits</p>
                <p className="info-details">{profile?.basicInformation?.smokingHabits ?? ""}</p>
              </li>
               <li>
                <p className="info-name">Drinking Habits</p>
                <p className="info-details">{profile?.basicInformation?.drinkingHabits ?? ""}</p>
              </li>
              



              {/* add rest of fields similarly */}
            </ul>
          ) : (
            
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <div className="row g-2">
                <div className="col-md-6">
                  <label className="form-label">First name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form?.basicInformation?.firstName ?? ""}
                    onChange={(e) => setNestedValue("basicInformation.firstName", e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form?.basicInformation?.lastName ?? ""}
                    onChange={(e) => setNestedValue("basicInformation.lastName", e.target.value)}
                  />
                </div>

               <div className="col-md-3">
                <label className="form-label">Date of Birth</label>

                <input
                    type="date"
                    className="form-control"
                    min={minDate}
                    max={maxDate}
                    // If stored value is ISO like "1998-05-27T00:00:00Z" or "1998-05-27",
                    // normalize to date-only for the input.
                    value={
                    form?.basicInformation?.age
                        ? String(form.basicInformation.age).split("T")[0]
                        : ""
                    }
                    onChange={(e) => {
                    // store the date-only string (yyyy-mm-dd) in form
                    setNestedValue("basicInformation.age", e.target.value);
                    // optionally clear validation error if you have one
                    // setError(null) or your clearError("dob") logic
                    }}
                 />
                </div>


                <div className="col-md-3">
                  <label className="form-label">Height</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form?.basicInformation?.heightId ?? ""}
                    onChange={(e) => setNestedValue("basicInformation.heightId", e.target.value)}
                  />
                </div>

               <div className="col-md-6">
                <label className="form-label">Mother Tongue</label>
               <select
                    className="form-control"
                    value={form?.basicInformation?.motherTongueId ?? ""}
                    onChange={(e) =>
                    setNestedValue("basicInformation.motherTongueId", e.target.value)
                    }
                >
                    <option value="">Select Mother Tongue</option>
                    {motherTongues.map((mt) => (
                    <option key={mt.motherTongueId} value={mt.motherTongueId}>
                        {mt.motherTongueName}
                    </option>
                    ))}
                 </select>
                 </div>
                                
        
                 <div className="col-md-6">
                  <label className="form-label">Profile For</label>
                  <select 
                    name ="profileForDataId"
                    value ={form?.basicInformation?.profileForDataId ?? ""}
                    className="form-control"
                    onChange={(e) => setNestedValue("basicInformation.profileForDataId", e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="1">Myself</option>
                    <option value="2">Son</option>
                    <option value="3">Daughter</option>
                    <option value="4">Brother</option>
                    <option value="5">Sister</option>
                    <option value="6">Relative</option>
                    <option value ="7">Friend</option>
                    <option value="8">Other</option>
                    </select>
                </div>
                   


                <div className="col-md-6">
                  <label className="form-label">Marital Status</label>
                  <select
                    className="form-control"
                    value={form?.basicInformation?.maritalStatus ?? ""}
                    onChange={(e) => setNestedValue("basicInformation.maritalStatus", e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Single">Single</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                    <option value ="Awaited Divorce">Awaited Divorce</option>
                  </select>
                </div>
                  <div className="col-md-6">
                  <label className="form-label">Weight</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form?.basicInformation?.weightId ?? ""}
                    onChange={(e) => setNestedValue("basicInformation.weightId", e.target.value)}
                  />
                </div>
                 <div className="col-md-6">
                  <label className="form-label">Any Disability</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form?.basicInformation?.anyDisability ?? ""}
                    onChange={(e) => setNestedValue("basicInformation.anyDisability", e.target.value)}
                  />
                </div>
                
                
                 <div className="col-md-6">
                  <label className="form-label">Food Habits</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form?.basicInformation?.foodHabits ?? ""}
                    onChange={(e) => setNestedValue("basicInformation.foodHabits", e.target.value)}
                  />
                </div>
                
                 <div className="col-md-6">
                  <label className="form-label">Smoking Habits</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form?.basicInformation?.smokingHabits ?? ""}
                    onChange={(e) => setNestedValue("basicInformation.smokingHabits", e.target.value)}
                  />
                </div>
                  <div className="col-md-6">
                  <label className="form-label">Drinking Habits</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form?.basicInformation?.drinkingHabits ?? ""}
                    onChange={(e) => setNestedValue("basicInformation.drinkingHabits", e.target.value)}
                  />
                </div>
              </div>
            </form>
                  
          )}
        </div>
      </div>
      
<div className="info-card mb-4">
        <div className="info-card-title d-flex justify-content-between align-items-center">
    <h6>Groom's Location</h6>
    
      {!editMode ? (
            <div>
             <button
             type="button"
             className="btn btn-sm btn-primary me-2"
             onClick={handleEnterEdit}
             disabled={loading || saving || !profile}
             title={loading ? "Loading..." : !profile ? "Profile not loaded" : "Edit profile"}
>
  {loading ? "Loading..." : "Edit"}
</button>
            </div>
          ) : (
            <div>
              <button className="btn btn-sm btn-success me-2" onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </button>
              <button className="btn btn-sm btn-secondary" onClick={handleCancel} disabled={saving}>
                Cancel
              </button>
            </div>
          )}
        </div>
   <div className="info-card-content">
    
     {error && <div className="alert alert-danger">{error}</div>}
        {/* show either view or form */}
        {!editMode ? (
            
    <ul className="info-list">
                                                               
<li>
  <p className="info-name">CountryName</p>
  <p className="info-details">{profile?.groomsLocation?.countryName?? ""}</p>
</li>
<li>
  <p className="info-name">State Name</p>
  <p className="info-details">{profile?.groomsLocation?.stateName?? ""}</p>
</li>
<li>
  <p className="info-name">City Name</p>
  <p className="info-details">{profile?.groomsLocation?.cityName?? ""}</p>
</li>
<li>
  <p className="info-name">Citizenship</p>
  <p className="info-details">{profile?.groomsLocation?.citizenship?? ""}</p>
</li>

</ul>
        ) : (
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <div className="row g-2">
                <div className="col-md-6">
                  <label className="form-label">Country Name</label>
                  <select
                    className="form-control"
                    value={form?.groomsLocation?.countryId ?? ""}
                  onChange={onCountryChange}
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.countryId} value={country.countryId}>
                        {country.countryName}
                      </option>
                    ))}
                  </select>
                </div>
               
                <div className="col-md-6">
                  <label className="form-label">State Name</label>
                  <select
                    className="form-control"
                    value={form?.groomsLocation?.stateId ?? ""}
                    onChange={(e) => setNestedValue("groomsLocation.stateId", e.target.value)}
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.stateId} value={state.stateId}>
                        {state.stateName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">City Name</label>
                  <select
                    className="form-control"
                    value={form?.groomsLocation?.cityId ?? ""}
                    onChange={(e) => setNestedValue("groomsLocation.cityId", e.target.value)}
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city.cityId} value={city.cityId}>
                        {city.cityName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Citizenship</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form?.groomsLocation?.citizenship ?? ""}
                    onChange={(e) => setNestedValue("groomsLocation.citizenship", e.target.value)}
                  />
                </div>

              </div>
            </form>
          )}
        </div>
      </div>
      <div className="info-card mb-4">
        <div className="info-card-title d-flex justify-content-between align-items-center">
    <h6>Family Details</h6>
        {!editMode ? (
            <div>
             <button
             type="button"
                className="btn btn-sm btn-primary me-2"
                onClick={handleEnterEdit}
                disabled={loading || saving || !profile}
                title={loading ? "Loading..." : !profile ? "Profile not loaded" : "Edit profile"}
>
  {loading ? "Loading..." : "Edit"}
</button>
            </div>
          ) : (
            <div>
                <button className="btn btn-sm btn-success me-2" onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save"}
                </button>
                <button className="btn btn-sm btn-secondary" onClick={handleCancel} disabled={saving}>
                Cancel
                </button>
            </div>
          )}
    </div>
   <div className="info-card-content">
    {error && <div className="alert alert-danger">{error}</div>}
        {/* show either view or form */}
        {!editMode ? (
    <ul className="info-list">
<li>
  <p className="info-name">Family Values</p>
  <p className="info-details">{profile?.familydetails?.familyValues?? ""}</p>
</li>

<li>
  <p className="info-name">Family Type</p>
  <p className="info-details">{profile?.familydetails?.familyType?? ""}</p>
</li>
<li>
  <p className="info-name">Number Of Children</p>
  <p className="info-details">{profile?.familydetails?.numberOfChildren?? ""}</p>
</li>
<li>
  <p className="info-name">Living With me</p>
  <p className="info-details">{profile?.familydetails?.livingWithMe?? ""}</p>
</li>
</ul>
        ) : (
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <div className="row g-2">
                    <div className="col-md-6">
                        <label className="form-label">FamilyDetails</label>
                        <input
                          type="text"
                          className="form-control"
                          value={form?.familydetails?.FamilyValue ?? ""}
                          onChange={(e) => setNestedValue("familydetails.FamilyValue", e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Family Type</label>
                        <input
                          type="text"
                          className="form-control"
                          value={form?.familydetails?.FamilyType ?? ""}
                          onChange={(e) => setNestedValue("familydetails.FamilyType", e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Father's Occupation</label>
                        <input
                            type="text"
                            className="form-control"
                            value={form?.familydetails?.FatherOccupation ?? ""}
                            onChange={(e) => setNestedValue("familydetails.FatherOccupation", e.target.value)}   
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Mother's Occupation</label>
                        <input
                            type="text"
                            className="form-control"
                            value={form?.familydetails?.MotherOccupation ?? ""}
                            onChange={(e) => setNestedValue("familydetails.MotherOccupation", e.target.value)}
                        />
                        
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Number Of Brothers</label>
                        <input
                            type="text"
                            className="form-control"
                            value={form?.familydetails?.numberOfBrothers ?? ""}
                            onChange={(e) => setNestedValue("familydetails.numberOfBrothers", e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Number Of Sisters</label>
                        <input
                            type="text"
                            className="form-control"
                            value={form?.familydetails?.numberOfSisters ?? ""}
                            onChange={(e) => setNestedValue("familydetails.numberOfSisters", e.target.value)}
                        />
                    </div>
                     <div className="col-md-6">
                        <label className="form-label">SistersMarried</label>
                        <input
                            type="text"
                            className="form-control"
                            value={form?.familydetails?.SistersMarried ?? ""}
                            onChange={(e) => setNestedValue("familydetails.SistersMarried", e.target.value)}
                        />
                    </div>
                     <div className="col-md-6">
                        <label className="form-label">BrothersMarried</label>
                        <input
                            type="text"
                            className="form-control"
                            value={form?.familydetails?.BrothersMarried ?? ""}
                            onChange={(e) => setNestedValue("familydetails.BrothersMarried", e.target.value)}
                        />
                    </div>
                       <div className="col-md-6">
                        <label className="form-label">Family Location</label>
                        <input
                            type="text"
                            className="form-control"
                            value={form?.familydetails?.FamilyLocation ?? ""}
                            onChange={(e) => setNestedValue("familydetails.FamilyLocation", e.target.value)}
                        />
                    </div>
                         <div className="col-md-6">
                        <label className="form-label">No Of Children</label>
                        <input
                            type="text"
                            className="form-control"
                            value={form?.familydetails?.NoOfChildren ?? ""}
                            onChange={(e) => setNestedValue("familydetails.NoOfChildren", e.target.value)}
                        />
                    </div>
                         <div className="col-md-6">
                        <label className="form-label">Living With Me</label>
                        <input
                            type="text"
                            className="form-control"
                            value={form?.familydetails?.LivingWithMe ?? ""}
                            onChange={(e) => setNestedValue("familydetails.LivingWithMe", e.target.value)}
                        />
                    </div>

                </div>
            </form>
            )}
        </div>
      </div>
      <div className="info-card mb-4">
        <div className="info-card-title d-flex justify-content-between align-items-center">
    <h6>Hobbies</h6>
        {!editMode ? (
            <div>
             <button
             type="button"
                className="btn btn-sm btn-primary me-2"
                onClick={handleEnterEdit}
                disabled={loading || saving || !profile}
                title={loading ? "Loading..." : !profile ? "Profile not loaded" : "Edit profile"}
>
  {loading ? "Loading..." : "Edit"}
</button>
            </div>
          ) : (
            <div>
                <button className="btn btn-sm btn-success me-2" onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save"}
                </button>
                <button className="btn btn-sm btn-secondary" onClick={handleCancel} disabled={saving}>
                Cancel
                </button>
            </div>
          )}
    </div>
   <div className="info-card-content">
    {error && <div className="alert alert-danger">{error}</div>}
        {/* show either view or form */}
        {!editMode ? (
    <ul className="info-list">
<li>
  <p className="info-name">Hobbies and Intrest</p>
  <p className="info-details">{profile?.hobbies?.hobbiesandIntrest?? ""}</p>
</li>

<li>
  <p className="info-name">Movies And Tv Shows</p>
  <p className="info-details">{profile?.hobbies?.movieAndTvShows?? ""}</p>
</li>
<li>
  <p className="info-name">Music</p>
  <p className="info-details">{profile?.hobbies?.music?? ""}</p>
</li>
<li>
  <p className="info-name">Reading</p>
  <p className="info-details">{profile?.hobbies?.reading?? ""}</p>
</li>
<li>
  <p className="info-name">Spoken Languages</p>
  <p className="info-details">{profile?.hobbies?.spokenLanguages?? ""}</p>
</li>
<li>
  <p className="info-name">Sports And Fitness</p>
  <p className="info-details">{profile?.hobbies?.sportsAndFitness?? ""}</p>
</li>
</ul>
        ) : (
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <div className="row g-2">
                    <div className="col-md-6">
                        <label className="form-label">Hobbies and Intrest</label>
                        <input
                          type="text"
                          className="form-control"
                          value={form?.hobbies?.hobbiesandIntrest ?? ""}
                          onChange={(e) => setNestedValue("hobbies.hobbiesandIntrest", e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Movies And Tv Shows</label>
                        <input
                          type="text"
                          className="form-control"
                          value={form?.hobbies?.movieAndTvShows ?? ""}
                          onChange={(e) => setNestedValue("hobbies.movieAndTvShows", e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Music</label>
                        <input
                            type="text"
                            className="form-control"
                            value={form?.hobbies?.music ?? ""}
                            onChange={(e) => setNestedValue("hobbies.music", e.target.value)}   
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Reading</label>
                        <input
                            type="text"
                            className="form-control"
                            value={form?.hobbies?.reading ?? ""}
                            onChange={(e) => setNestedValue("hobbies.reading", e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Spoken Languages</label>
                        <input
                            type="text"
                            className="form-control"
                            value={form?.hobbies?.spokenLanguages ?? ""}
                            onChange={(e) => setNestedValue("hobbies.spokenLanguages", e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Sports And Fitness</label>
                        <input
                            type="text"
                            className="form-control"
                            value={form?.hobbies?.sportsAndFitness ?? ""}
                            onChange={(e) => setNestedValue("hobbies.sportsAndFitness", e.target.value)}
                        />
                    </div>
                </div>
            </form>
            )}
        </div>
      </div>

       
                                                      <div className="info-card mb-4">
                                                      <div className="info-card-title d-flex justify-content-between align-items-center">

                                                            <h6>Professional Information</h6>
                                                              {!editMode ? (
                                                               <div>
                                                                <button
                                                                type="button"
                                                                    className="btn btn-sm btn-primary me-2"
                                                                    onClick={handleEnterEdit}
                                                                    disabled={loading || saving || !profile}
                                                                    title={loading ? "Loading..." : !profile ? "Profile not loaded" : "Edit profile"}
                                                                    >
                                                                    {loading ? "Loading..." : "Edit"}
                                                                    </button>
                                                                    </div>
                                                                    ) : (
                                                                    <div>
                                                                    <button className="btn btn-sm btn-success me-2" onClick={handleSave} disabled={saving}>
                                                                    {saving ? "Saving..." : "Save"}
                                                                    </button>
                                                                    <button className="btn btn-sm btn-secondary" onClick={handleCancel} disabled={saving}>
                                                                    Cancel
                                                                     </button>
                                                                    </div>
                                                                    )}
                                                                    </div>
                                                                    <div className="info-card-content">
                                                                     {error && <div className="alert alert-danger">{error}</div>}
                                                                     {/* show either view or form */}
                                                                     {!editMode ? (
                                                                     <ul className="info-list">
                                                                     <li>
                                                                    <p className="info-name">Education Level</p>
                                                                    <p className="info-details">{profile?.professionalInformation?.educationLevel??""}</p>
                                                                    </li>
                                                                    <li>
                                                                     <p className="info-name">Education Substream</p>
                                                                    <p className="info-details">{profile?.professionalInformation?.subStreamName??""}</p>
                                                                    </li>
                                                                    <li>
                                                                    <p className="info-name">Employee Status</p>
                                                                    <p className="info-details">{profile?.professionalInformation?.employedIn??""}</p>
                                                                    </li>
                                                                    <li>
                                                                    <p className="info-name">Occupation Name</p>
                                                                    <p className="info-details">{profile?.professionalInformation?.occupationName??""}</p>
                                                                    </li>
                                                                    <li>
                                                                    <p className="info-name">College Name</p>
                                                                    <p className="info-details">{profile?.professionalInformation?.collegeName??""}</p>
                                                                    </li>
                                                                    <li>
                                                                    <p className="info-name">Organization Name</p>
                                                                    <p className="info-details">{profile?.professionalInformation?.organizationName??""}</p>
                                                                </li>
                                                                 <li>
                                                                    <p className="info-name">Income Value</p>
                                                                    <p className="info-details">{profile?.professionalInformation?.incomeValue??""}</p>
                                                                </li>
                                                            </ul>
                                                            ) : (
                                                                <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <div className="row g-2">
                      <div className="col-md-6">
                <label className="form-label">Education Level</label>
               <select
                    className="form-control"
                     value={form?.professionalInformation?.educationLevel ?? ""}
                    onChange={onEducationChange}
                    
                >
                    <option value="">Select Education Level</option>
                    {educations.map((ed) => (
                    <option key={ed.educationId} value={ed.educationId}>
                        {ed.educationLevel}
                    </option>
                    ))}
                 </select>
                 </div>
                    <div className="col-md-6">
                  <label className="form-label">Education Substream</label>
                  <select
                    className="form-control"
                            value={form?.professionalInformation?.subStreamName ?? ""}
                            onChange={(e) => setNestedValue("professionalInformation.subStreamName", e.target.value)}
                  >
                    <option value="">Select Education Substream</option>
                    {educationsubStreams.map((ss) => (
                      <option key={ss.educationSubStreamId} value={ss.educationSubStreamId}>
                        {ss.subStreamName}
                      </option>
                    ))}
                  </select>
                </div>
                   
                    <div className="col-md-6">
                        <label className="form-label">Employee Status</label>
                        <input
                            type="text"
                            className="form-control"
                            value={form?.professionalInformation?.employedIn ?? ""}
                            onChange={(e) => setNestedValue("professionalInformation.employedIn", e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Occupation Name</label>
                        <select
                            className="form-control"
                            value={form?.professionalInformation?.occupationName ?? ""}
                            onChange={(e) => setNestedValue("professionalInformation.occupationName", e.target.value)}
                        >
                            <option value="">Select Occupation Name</option>
                            {occupations.map((occ) => (
                                <option key={occ.occupationId} value={occ.occupationId}>
                                    {occ.occupationName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">College Name</label>
                        <select
                            className="form-control"
                            value={form?.professionalInformation?.collegeName ?? ""}
                            onChange={(e) => setNestedValue("professionalInformation.collegeName", e.target.value)}
                       />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Organization Name</label>
                        <input
                            type="text"
                            className="form-control"
                                                                
                            value={form?.professionalInformation?.organizationName ?? ""}
                            onChange={(e) => setNestedValue("professionalInformation.organizationName", e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Income Value</label>
                        <input
                            type="text"
                            className="form-control"
                            value={form?.professionalInformation?.incomeValue ?? ""}
                            onChange={(e) => setNestedValue("professionalInformation.incomeValue", e.target.value)}
                        />
                     </div>
                                                    </div>
                                                </form>
                                                )}
                                            </div>
                                            </div>
                                                 
                                                   
                                                    <div className="info-card mb-4">
                                                    <div className="info-card-title d-flex justify-content-between align-items-center">
                                                            <h6>religionInformation</h6>
                                                                {!editMode ? (
                                                                <div>
                                                                <button
                                                                type="button"
                                                                    className="btn btn-sm btn-primary me-2"
                                                                    onClick={handleEnterEdit}
                                                                    disabled={loading || saving || !profile}
                                                                    title={loading ? "Loading..." : !profile ? "Profile not loaded" : "Edit profile"}
                                                                    >
                                                                    {loading ? "Loading..." : "Edit"}
                                                                    </button>
                                                                    </div>
                                                                    ) : (
                                                                    <div>
                                                                    <button className="btn btn-sm btn-success me-2" onClick={handleSave} disabled={saving}>
                                                                    {saving ? "Saving..." : "Save"}
                                                                    </button>
                                                                    <button className="btn btn-sm btn-secondary" onClick={handleCancel} disabled={saving}>
                                                                    Cancel
                                                                        </button>
                                                                        </div>
                                                                        )}
                                                        </div>
                                                        <div className="info-card-content">
                                                                {error && <div className="alert alert-danger">{error}</div>}
                                                                {/* show either view or form */}
                                                                {!editMode ? (
                                                            <ul className="info-list">
                                                                <li>
                                                                    <p className="info-name">religionName</p>
                                                                    <p className="info-details">{profile?.religionIformation?.religionName??""}</p>
                                                                </li>
                                                                 <li>
                                                                    <p className="info-name">casteName</p>
                                                                    <p className="info-details">{profile?.religionIformation?.casteName??""}</p>
                                                                </li>
                                                                <li>
                                                                    <p className="info-name">Division Name</p>
                                                                    <p className="info-details">{profile?.religionIformation?.divisionName??""}</p>
                                                                </li>
                                                                 <li>
                                                                    <p className="info-name">subCaste Name</p>
                                                                    <p className="info-details">{profile?.religionIformation?.subCasteName??""}</p>
                                                                </li>
                                                                 <li>
                                                                    <p className="info-name">raasi Name</p>
                                                                    <p className="info-details">{profile?.religionIformation?.raasiName??""}</p>
                                                                </li>
                                                                 <li>
                                                                    <p className="info-name">star Name</p>
                                                                    <p className="info-details">{profile?.religionIformation?.starName??""}</p>
                                                                </li>
                                                                 <li>
                                                                    <p className="info-name">zodiac Name</p>
                                                                    <p className="info-details">{profile?.religionIformation?.zodiacName??""}</p>
                                                                </li>
                                                            </ul>
                                                            ) : (
                                                                <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <div className="row g-2">
                    <div className="col-md-6">
                        <label className="form-label">religion Name</label>
                       <select
                            className="form-control"
                             value={form?.religionIformation?.religionId ?? ""}
                            onChange={onReligionChange}
                        >
                            <option value="">Select Religion Name</option>
                            {religions.map((rg) => (
                                <option key={rg.religionId} value={rg.religionId}>
                                    {rg.religionName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">caste Name</label>
                        <select
                            className="form-control"
                            value={form?.religionIformation?.casteId ?? ""}
                            onChange={(e) => setNestedValue("religionIformation.casteId", e.target.value)}
                        >
                            <option value="">Select Caste Name</option>
                            {castes.map((ct) => (
                                <option key={ct.casteId} value={ct.casteId}>
                                    {ct.casteName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Division Name</label>
                        <select
                            className="form-control"
                            value={form?.religionIformation?.divisionId ?? ""}
                            onChange={(e) => setNestedValue("religionIformation.divisionId", e.target.value)}
                        >
                            <option value="">Select Division Name</option>
                            {divisions.map((dv) => (
                                <option key={dv.divisionId} value={dv.divisionId}>
                                    {dv.divisionName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-6">
                  <label className="form-label">subCaste Name</label>
                  <select
                    className="form-control"
                            value={form?.religionIformation?.subCasteId ?? ""}
                    onChange={(e) => setNestedValue("religionIformation.subCasteId", e.target.value)}
                  >
                    <option value="">Select SubCaste Name</option>
                    {subcastes.map((sct) => (
                      <option key={sct.subCasteId} value={sct.subCasteId}>
                        {sct.subCasteName}
                      </option>
                    ))}
                  </select>
                </div>
                    <div className="col-md-6">
                        <label className="form-label">raasi Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={form?.religionIformation?.raasiName ?? ""}
                            onChange={(e) => setNestedValue("religionIformation.raasiName", e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">star Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={form?.religionIformation?.starName ?? ""}
                            onChange={(e) => setNestedValue("religionIformation.starName", e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">zodiac Name</label>
                        <input

                            type="text"
                            className="form-control"
                            value={form?.religionIformation?.zodiacName ?? ""}
                            onChange={(e) => setNestedValue("religionIformation.zodiacName", e.target.value)}
                        />


                       </div>
                       </div>
                       </form>
                      )}
                      </div>
                     </div>
             <Footer />
        </Fragment>
    );

};




export default EditProfile; 
