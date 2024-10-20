/* The codes below illustrates what will be sent to the APIs  */

import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Student = () => {
  // State Variables
  const [affidavit, setAffidavit] = useState("");
  const [schoolSecurityReport, setSchoolSecurityReport] = useState("");
  const [passport, setPassport] = useState("");
  const [number, setNumber] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();

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

    /* STUDENT ID REPLACEMENT API */
    const applicationData = {
      number,
      reason,
    };

    if (!applicationData) {
      setError("Input all required fields.");
      return;
    }
    useEffect(() => {
      const studentReplacement = async () => {
        if (!id) {
          setError("User ID not found");
          return;
        }
        try {
          setLoading(true);
          const response = await API.post(
            "/api/idcard/replacement/student",
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
      studentReplacement();
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
          value={reason}
          placeholder="Reason for replacement"
          onClick={(e) => setReason(e.target.value)}
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
