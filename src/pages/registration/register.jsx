import React, { useState } from 'react';
import FormStepOne from "./formStepOne";
import FormStepTwo from "./formStepTwo";
import FormStepThree from "./formStepThree";
import FormStepFour from "./formStepFour";



function Register() {
  const [step, setStep] = useState(1);
  const [isPreviousClicked, setIsPreviousClicked] = useState(false);
  const [UserData, setUserData] = useState({
    userId: 0,
    religionId: 0,
    casteId: 0,
    subCasteId: 0,
    motherTongueId: 0,
    heightId: 0,
    educationId: 0,
    occupationId: 0,
    incomeId: 0,
    cityId: 0,
    stateId: 0,
    countryId: 0,
    profileForDataId: 0,
    doshamId: 0,
    firstName : '',
    lastName : '',
    divisionId: 0,
    gothramId: 0,
    subCasteName: '',
    professionalDetailsId: 0,
    personalDetailsId: 0,
    eatingHabits: '',
    drinkingHabits: '',
    smokingHabits: '',
    profilePicture: '',
    maritalStatus: "",
    noOfChildren: "",
    livingWithMe: "",
    countryCode:  "(+91)",
    familyStatus: "",
    familyType: "",
    disability: "",
    employmentStatus: ""
});

const Base_api=import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await fetch(`${Base_api}/api/UserProfile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(UserData),
      });
      if (!response.ok) throw new Error('Submission failed');
      const data = await response.json();
      alert('Form submitted successfully!');
      console.log(data);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form.');
    }
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => {
  setIsPreviousClicked(true);   // Tell child that Previous was clicked
  setStep(prev => prev - 1);    // Move to previous step
};

  return (
    <div style={{ padding: '20px' }}>
      {step === 1 && (
        <FormStepOne
          UserData={UserData}
          setUserData={setUserData}
          nextStep={nextStep}
          
        />
      )}
      {step === 2 && (
        <FormStepTwo
          UserData={UserData}
          setUserData={setUserData}
          nextStep={nextStep}
          prevStep={prevStep}
          isPreviousClicked={isPreviousClicked}
          clearPreviousFlag={() => setIsPreviousClicked(false)}
        />
      )}
      {step === 3 && (
        <FormStepThree
          UserData={UserData}
          setUserData={setUserData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 4 && (
        <FormStepFour
          UserData={UserData}
          setUserData={setUserData}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default Register;
