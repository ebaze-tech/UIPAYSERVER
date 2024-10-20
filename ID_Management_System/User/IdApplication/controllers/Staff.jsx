/* The codes below illustrates what will be sent to the APIs  */

import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Staff = () => {
  // State Variables
  const [affidavit, setAffidavit] = useState("");
  const [schoolSecurityReport, setSchoolSecurityReport] = useState("");
  const [passport, setPassport] = useState("");
  const [number, setNumber] = useState("");
  const [surname, setSurname] = useState("");
  const [otherNames, setOtherNames] = useState("");
  const [position, setPosition] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();
  
  // Form validation
  const staffNumRegex = /^\d{4,5}/;
  if (!staffNumRegex.test(number)) {
    console.log("Invalid staff number");
    setError("Invalid staff number");
    return;
  }

  const handleFormSubmit = async () => {
    e.preventDefault();
    setError("");

    /* STAFF ID APPLICATION API */
    const applicationData = {
      number,
      surname,
      otherNames,
      position,
      department,
      faculty,
      designation,
    };

    if (!applicationData) {
      setError("Input all required fields.");
      return;
    }
    useEffect(() => {
      const staffApplication = async () => {
        if (!id) {
          setError("User ID not found");
          return;
        }
        try {
          setLoading(true);
          const response = await API.post(
            "/api/idcard/application/staff",
            applicationData
          );
          console.log(response);
        } catch (error) {
          console.error(
            error.message
              ? error.message
              : "Server error. Please reload the page." + error
          );
          setError(
            error.message
              ? error.message
              : "Server error. Please reload the page."
          );
        } finally {
          setLoading(false);
        }
      };
      staffApplication();
    }, [id]);
  };
  return (
    <div>
      <form>
        <input
          type="text"
          value={number}
          placeholder="Staff No."
          onClick={(e) => setNumber(e.target, value)}
        />
        <input
          type="text"
          value={surname}
          placeholder="Surname"
          onClick={(e) => setSurname(e.target.value)}
        />
        <input
          type="text"
          value={otherNames}
          placeholder="Other names"
          onClick={(e) => setOtherNames(e.target.value)}
        />
        <input
          type="text"
          value={position}
          placeholder="Position or role: Academic staff or non-academic staff"
          onClick={(e) => setPosition(e.target.value)}
        />
        <input
          type="text"
          value={faculty}
          placeholder="Faculty"
          onClick={(e) => setFaculty(e.target.value)}
        />
        <input
          type="text"
          value={department}
          placeholder="Department"
          onClick={(e) => setDepartment(e.target.value)}
        />
        <input
          type="text"
          value={designation}
          placeholder="Current designation"
          onClick={(e) => setDesignation(e.target.value)}
        />
        <input
          type="file"
          value={passport}
          placeholder="Passport"
          onClick={(e) => setPassport(e.target.value)}
        />
        <input
          type="file"
          value={affidavit}
          placeholder="Affidavit"
          onClick={(e) => setAffidavit(e.target.value)}
        />
        <input
          type="file"
          value={schoolSecurityReport}
          placeholder="School security report"
          onClick={(e) => setSchoolSecurityReport(e.target.value)}
        />
        <button>{handleFormSubmit}</button>
      </form>
    </div>
  );
};

export default Staff;
