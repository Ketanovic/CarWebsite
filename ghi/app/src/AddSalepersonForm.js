import React, { useState } from "react";

const AddSalespersonForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const data = {
      first_name: firstName,
      last_name: lastName,
      employee_id: employeeId,
    };

    const url = "http://localhost:8090/api/salesperson";

    const fetchConfig = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, fetchConfig);
      const result = await response.json();
      if (response.ok) {
        setSuccess(true);
        setFirstName("");
        setLastName("");
        setEmployeeId("");
      } else {
        setError(result.error || "An error occurred while creating the salesperson.");
      }
    } catch (error) {
      setError("An error occurred while creating the salesperson.");
    }
  };

  return (
    <div>
      <h2>Add a Salesperson</h2>
      {success && <div className="alert alert-success">Salesperson created successfully!</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="employeeId" className="form-label">Employee ID</label>
          <input
            type="text"
            className="form-control"
            id="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddSalespersonForm;
