import { createContext, useContext, useState } from "react";

const DropdownContext = createContext();

export const DropdownProvider = ({ children }) => {

  const [religions, setReligions] = useState([]);
  const [castes, setCastes] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [subCastes, setSubCastes] = useState([]);
  const [motherTongues, setMotherTongues] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  return (
    <DropdownContext.Provider
      value={{
        religions, setReligions,
        castes, setCastes,
        divisions, setDivisions,
        subCastes, setSubCastes,
        countries, setCountries,
        states, setStates,
        cities, setCities,
        motherTongues, setMotherTongues,
      }}>
      {children}
    </DropdownContext.Provider>
  );
};

export const useDropdown = () => {
  console.log("useDropdown called");
  return useContext(DropdownContext);
};
