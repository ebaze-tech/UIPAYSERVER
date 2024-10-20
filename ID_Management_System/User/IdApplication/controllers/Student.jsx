/* The codes below illustrates what will be sent to the APIs  */

import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Student = () => {
  // State Variables
  const [affidavit, setAffidavit] = useState("");
  const [schoolSecurityReport, setSchoolSecurityReport] = useState("");
  const [passport, setPassport] = useState("");
  const [number, setNumber] = useState("");
  const [surname, setSurname] = useState("");
  const [otherNames, setOtherNames] = useState("");
  const [level, setLevel] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [hall, setHall] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Form validation
  const studentNumRegex = /^\d{6}/;
  if (!studentNumRegex.test(number)) {
    console.log("Invalid student number");
    setError("Invalid student number");
    return;
  }

  const handleFormSubmit = async () => {
    e.preventDefault();
    setError("");

    /* Student ID APPLICATION API */
    const applicationData = {
      number,
      surname,
      otherNames,
      level,
      department,
      faculty,
      hall,
    };

    if (!applicationData) {
      setError("Input all required fields.");
      return;
    }
    useEffect(() => {
      const studentApplication = async () => {
        if (!id) {
          setError("User ID not found");
          return;
        }
        try {
          setLoading(true);
          const response = await API.post(
            "/api/idcard/application/student",
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
      studentApplication();
    }, [id]);
  };
  return (
    <div>
      <form>
        <input
          type="text"
          value={number}
          placeholder="Matric No."
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
          value={level}
          placeholder="Current level of study"
          onClick={(e) => setLevel(e.target.value)}
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
          value={hall}
          placeholder="Current hall of residence"
          onClick={(e) => setHall(e.target.value)}
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

export default Student;
