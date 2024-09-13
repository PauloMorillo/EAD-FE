import { createContext, useState, useEffect } from "react";
import { Client } from "../client";

const EadContext = createContext();
const client = new Client();

function EadProvider({ children }) {
  const [idPatient, setIdPatient] = useState(0);
  const [patientName, setPatientName] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [initialPoint, setInitialPoint] = useState(0);

  const evaluateKid = async ({ idPatient, initPoint, selectedOption }) => {
    const response = await client.getEvaluation(
      "http://18.189.81.6:9000/api/result",
      idPatient,
      initPoint,
      selectedOption
    );
    return response;
  };

  return (
    <EadContext.Provider
      value={{
        idPatient,
        setIdPatient,
        selectedOption,
        setSelectedOption,
        initialPoint,
        setInitialPoint,
        evaluateKid,
        patientName,
        setPatientName
      }}
    >
      {children}
    </EadContext.Provider>
  );
}

export { EadContext, EadProvider };
