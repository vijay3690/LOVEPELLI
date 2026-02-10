// Add imports at top
import React, { Fragment, useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import HeaderOne from "../component/layout/headerone";
// ... other imports

const MemberDetails = () => {
  const navigate = useNavigate();
  const { id: routeId } = useParams(); // if you want profile id from route
  const Base_api = import.meta.env.VITE_BASE_URL;

  // main persisted profile state (view)
  const [profile, setProfile] = useState(null);

  // form state used while editing
  const [form, setForm] = useState(null);

  const [loading, setLoading] = useState(false); // for fetching
  const [saving, setSaving] = useState(false);   // for saving
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // fetch by route id or fallback to 1 (your earlier behavior)
  const profileId = routeId ?? 1;

  useEffect(() => {
    fetchProfile(profileId);
  }, [profileId]);

  const fetchProfile = async (pid) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${Base_api}/api/UserProfile/${pid}`);
      setProfile(res.data);
      setForm(res.data); // keep a copy for editing
    } catch (err) {
      console.error(err);
      setError("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

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
    // minimal example validation - expand as needed or use react-hook-form + yup
    if (!form?.basicInformation?.firstName) {
      setError("First name is required");
      return false;
    }
    if (form.basicInformation.age && isNaN(Number(form.basicInformation.age))) {
      setError("Age must be a number");
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
      // use PUT or PATCH depending on backend contract
      const res = await axios.put(`${Base_api}/api/UserProfile/${profileId}`, form);
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
      {/* ... keep PageHeader and top tabs as before ... */}

      {/* Basic Information card — editable */}
      <div className="info-card mb-4">
        <div className="info-card-title d-flex justify-content-between align-items-center">
          <h6>Basic Information</h6>

          {!editMode ? (
            <div>
              <button
                className="btn btn-sm btn-primary me-2"
                onClick={handleEnterEdit}
                disabled={!profile?.id}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => navigate(`/editprofile/${profile?.id}`)}
                disabled={!profile?.id}
              >
                Full Edit Page
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
                  <label className="form-label">Age</label>
                  <input
                    type="number"
                    className="form-control"
                    value={form?.basicInformation?.age ?? ""}
                    onChange={(e) => setNestedValue("basicInformation.age", e.target.value)}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label">Height</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form?.basicInformation?.heightValue ?? ""}
                    onChange={(e) => setNestedValue("basicInformation.heightValue", e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Mother Tongue</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form?.basicInformation?.motherTongueName ?? ""}
                    onChange={(e) => setNestedValue("basicInformation.motherTongueName", e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Marital Status</label>
                  <select
                    className="form-control"
                    value={form?.basicInformation?.maritalStatus ?? ""}
                    onChange={(e) => setNestedValue("basicInformation.maritalStatus", e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Never Married">Never Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>

                {/* Add more form fields for the other sections using same setNestedValue helper */}
              </div>
            </form>
          )}
        </div>
      </div>



      {/* rest of your page... keep other info-cards. Use the same pattern to toggle inputs */}
      <div className="info-card mb-4">
    <div className="info-card-title">
    <h6>Groom's Location</h6>
    </div>
   <div className="info-card-content">
    <ul className="info-list">
                                                               
<li>
  <p className="info-name">CountryName</p>
  <p className="info-details">{profile.groomsLocation.countryName}</p>
</li>
<li>
  <p className="info-name">State Name</p>
  <p className="info-details">{profile.groomsLocation.stateName}</p>
</li>
<li>
  <p className="info-name">City Name</p>
  <p className="info-details">{profile.groomsLocation.cityName}</p>
</li>
<li>
  <p className="info-name">Citizenship</p>
  <p className="info-details">{profile.groomsLocation.citizenship}</p>
</li>
</ul>
 </div>
</div>

<div className="info-card mb-4">
    <div className="info-card-title">
    <h6>Hobbies</h6>
    </div>
   <div className="info-card-content">
    <ul className="info-list">
<li>
  <p className="info-name">Hobbies and Intrest</p>
  <p className="info-details">{profile.hobbies.hobbiesandIntrest}</p>
</li>

<li>
  <p className="info-name">Movies And Tv Shows</p>
  <p className="info-details">{profile.hobbies.movieAndTvShows}</p>
</li>
<li>
  <p className="info-name">Music</p>
  <p className="info-details">{profile.hobbies.music}</p>
</li>
<li>
  <p className="info-name">Reading</p>
  <p className="info-details">{profile.hobbies.reading}</p>
</li>
<li>
  <p className="info-name">Spoken Languages</p>
  <p className="info-details">{profile.hobbies.spokenLanguages}</p>
</li>
<li>
  <p className="info-name">Sports And Fitness</p>
  <p className="info-details">{profile.hobbies.sportsAndFitness}</p>
</li>
</ul>
 </div>
</div>

  <div className="info-card mb-4">
                                                        <div className="info-card-title">
                                                            <h6>Professional Information</h6>
                                                        </div>
                                                        <div className="info-card-content">
                                                            <ul className="info-list">
                                                               <li>
                                                                    <p className="info-name">Education Level</p>
                                                                    <p className="info-details">{profile.professionalInformation.educationLevel}</p>
                                                                    </li>
                                                                    <li>
                                                                    <p className="info-name">Employee Status</p>
                                                                    <p className="info-details">{profile.professionalInformation.employedIn}</p>
                                                                    </li>
                                                                    <li>
                                                                    <p className="info-name">Occupation Name</p>
                                                                    <p className="info-details">{profile.professionalInformation.occupationName}</p>
                                                                    </li>
                                                                    <li>
                                                                    <p className="info-name">College Name</p>
                                                                    <p className="info-details">{profile.professionalInformation.collegeName}</p>
                                                                    </li>
                                                                    <li>
                                                                    <p className="info-name">Organization Name</p>
                                                                    <p className="info-details">{profile.professionalInformation.organizationName}</p>
                                                                </li>
                                                                 <li>
                                                                    <p className="info-name">Income Value</p>
                                                                    <p className="info-details">{profile.professionalInformation.incomeValue}</p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                     <div className="info-card mb-4">
                                                        <div className="info-card-title">
                                                            <h6>Myself Summary</h6>
                                                        </div>
                                                        <div className="info-card-content">
                                                            <p>Collaboratively innovate compelling mindshare after prospective partnership Competently sereiz long-term high-impact internal or "organic" sources vias user friendly strategic themesr areas creat Dramatically coordinate premium partnerships rather than standards compliant technologies ernd Dramaticaly matrix ethical collaboration and idea-sharing through opensour methodolog and Intrinsicly grow collaborative platforms vis-a-vis effective scenarios. The energistically strategize cost effective ideas before the worke unde.</p>
                                                        </div>
                                                    </div>
                                                     <div className="info-card mb-4">
                                                        <div className="info-card-title">
                                                            <h6>religionInformation</h6>
                                                        </div>
                                                        <div className="info-card-content">
                                                            <ul className="info-list">
                                                                <li>
                                                                    <p className="info-name">religionName</p>
                                                                    <p className="info-details">{profile.religionIformation.religionName}</p>
                                                                </li>
                                                                 <li>
                                                                    <p className="info-name">casteName</p>
                                                                    <p className="info-details">{profile.religionIformation.casteName}</p>
                                                                </li>
                                                                <li>
                                                                    <p className="info-name">Division Name</p>
                                                                    <p className="info-details">{profile.religionIformation.divisionName}</p>
                                                                </li>
                                                                 <li>
                                                                    <p className="info-name">subCaste Name</p>
                                                                    <p className="info-details">{profile.religionIformation.subCasteName}</p>
                                                                </li>
                                                                 <li>
                                                                    <p className="info-name">raasi Name</p>
                                                                    <p className="info-details">{profile.religionIformation.raasiName}</p>
                                                                </li>
                                                                 <li>
                                                                    <p className="info-name">star Name</p>
                                                                    <p className="info-details">{profile.religionIformation.starName}</p>
                                                                </li>
                                                                 <li>
                                                                    <p className="info-name">zodiac Name</p>
                                                                    <p className="info-details">{profile.religionIformation.zodiacName}</p>
                                                                </li>

                                                            </ul>

                                                        </div>
                                                    </div>

                                                      <div className="info-card mb-4">
                                                        <div className="info-card-title">
                                                            <h3>Life-Partner Preferences</h3>
                                                        </div>
                                                        <div className="info-card-content">
                                                            <ul className="info-list">
                                                                 <h6>Basic Preferences</h6>
                                                                <li>
  <p className="info-name">Preferred Bride's Age</p>
  <p className="info-details">{profile.preferredBrideAge}</p>
</li>
<li>
  <p className="info-name">Preferred Height</p>
  <p className="info-details">{profile.preferredHeight}</p>
</li>
<li>
  <p className="info-name">Preferred Marital Status</p>
  <p className="info-details">{profile.preferredMaritalStatus}</p>
</li>
<li>
  <p className="info-name">Preferred Mother Tongue</p>
  <p className="info-details">{profile.preferredMotherTongue}</p>
</li>
<li>
  <p className="info-name">Preferred Physical Status</p>
  <p className="info-details">{profile.preferredPhysicalStatus}</p>
</li>
<li>
  <p className="info-name">Preferred Eating Habits</p>
  <p className="info-details">{profile.preferredEatingHabits}</p>
</li>
<li>
  <p className="info-name">Preferred Smoking Habits</p>
  <p className="info-details">{profile.preferredSmokingHabits}</p>
</li>
<li>
  <p className="info-name">Preferred Drinking Habits</p>
  <p className="info-details">{profile.preferredDrinkingHabits}</p>
</li>

                                                            </ul>

                                                        </div>
                                                    </div>

                                                      <div className="info-card">
                                                        <div className="info-card-title">
                                                            <h6>Religious Preferences</h6>
                                                        </div>
                                                        <div className="info-card-content">
                                                            <ul className="info-list">
                                                                   <li>
                                                                        <p className="info-name">Preferred Religion</p>
                                                                        <p className="info-details">{profile.preferredReligion}</p>
                                                                        </li>
                                                                        <li>
                                                                        <p className="info-name">Preferred Caste</p>
                                                                        <p className="info-details">{profile.preferredCaste}</p>
                                                                        </li>
                                                                        <li>
                                                                        <p className="info-name">Preferred Star</p>
                                                                        <p className="info-details">{profile.preferredStar}</p>
                                                                        </li>
                                                                        <li>
                                                                        <p className="info-name">Preferred Dosham</p>
                                                                        <p className="info-details">{profile.preferredDosham}</p>
                                                                    </li>
                                                            </ul>

                                                        </div>
                                                    </div>

                                                      <div className="info-card">
                                                        <div className="info-card-title">
                                                            <h6>Professional Preferences</h6>
                                                        </div>
                                                        <div className="info-card-content">
                                                            <ul className="info-list">
                                                              <li>
                                                                        <p className="info-name">Preferred Education</p>
                                                                        <p className="info-details">{profile.preferredEducation}</p>
                                                                        </li>
                                                                        <li>
                                                                        <p className="info-name">Preferred Employment Type</p>
                                                                        <p className="info-details">{profile.preferredEmploymentType}</p>
                                                                        </li>
                                                                        <li>
                                                                        <p className="info-name">Preferred Occupation</p>
                                                                        <p className="info-details">{profile.preferredOccupation}</p>
                                                                        </li>
                                                                        <li>
                                                                        <p className="info-name">Preferred Annual Income</p>
                                                                        <p className="info-details">{profile.preferredAnnualIncome}</p>
                                                                </li>
                                                           </ul>

                                                        </div>
                                                    </div>

                                                     <div className="info-card">
                                                        <div className="info-card-title">
                                                            <h6>Location Preferences</h6>
                                                        </div>
                                                        <div className="info-card-content">
                                                            <ul className="info-list">
                                                              <li>
                                                                    <p className="info-name">Preferred Country</p>
                                                                    <p className="info-details">{profile.preferredCountry}</p>
                                                                    </li>
                                                                    <li>
                                                                    <p className="info-name">Preferred Residing State</p>
                                                                    <p className="info-details">{profile.preferredResidingState}</p>
                                                                    </li>
                                                                    <li>
                                                                    <p className="info-name">Preferred Residing City</p>
                                                                    <p className="info-details">{profile.preferredResidingCity}</p>
                                                                    </li>
                                                            </ul>

                                                        </div>
                                                    </div>
                                                    



    </Fragment>
  );
};

export default MemberDetails;
