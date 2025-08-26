import React, { useState } from 'react';
import FormStepOne from "./formStepOne";
import FormStepTwo from "./formStepTwo";
import FormStepThree from "./formStepThree";
import FormStepFour from "./formStepFour";



function Register() {
  const [step, setStep] = useState(1);
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
    address: '',
    profileForDataId: 0,
    doshamId: 0,
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
    heightId: "",
    familyStatus: "",
    familyType: "",
    disability: "",
    employmentStatus: ""
});




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await fetch('http://localhost:5103/api/UserProfile', {
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
  const prevStep = ()    => setStep(prev => prev - 1);

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












































































































































































































































































































































 //useEffect(() => {
    // API call inside useEffect
   // fetch("http://localhost:5103/api/BasicDetails/religions") // Example API
  //    .then((response) => {
     //   if (!response.ok) {
     //     throw new Error("Failed to fetch data");
     //   }
      //  return response.json();
     //  })
     // .then((data) => {
     //   setReligions(data); // store response in state
  
     // })
    //  .catch((err) => {
       // setError(err.message);
        //setLoading(false);
    //  });
 // }, []); // [] ensures API is called only once when component mounts


