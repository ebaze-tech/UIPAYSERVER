/* The codes below illustrates what will be sent to the APIs  */

/*Ensure to make use of the loading and error states well */
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Staff = () => {
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
  const staffNumRegex = /^\d{4,5}/;
  if (!staffNumRegex.test(number)) {
    console.log("Invalid staff number");
    setError("Invalid staff number");
    return;
  }

  const handleFormSubmit = async () => {
    e.preventDefault();
    setError("");

    /* STAFF ID REPLACEMENT API */
    const applicationData = {
      number,
      reason,
    };

    if (!applicationData) {
      setError("Input all required fields.");
      return;
    }
    useEffect(() => {
      const staffReplacement = async () => {
        if (!id) {
          setError("User ID not found");
          return;
        }
        try {
          setLoading(true);
          const response = await API.post(
            "/api/idcard/replacement/staff",
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
      staffReplacement();
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
          value={reason}
          onClick={(e) => setReason(e.target.value)}
          placeholder="Reason for replacement"
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
