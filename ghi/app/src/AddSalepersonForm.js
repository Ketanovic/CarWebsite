import React, { useState } from 'react';

const AddSalespersonForm = ({ addSalesperson }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    employeeId: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addSalesperson(formData);
    setFormData({ firstName: '', lastName: '', employeeId: '' });
  };

  return (
    <div>
      <h2>Add a Salesperson</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input
          type="text"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
        />

        <label>Last Name:</label>
        <input
          type="text"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        />

        <label>Employee ID:</label>
        <input
          type="text"
          value={formData.employeeId}
          onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
        />

        <button type="submit">Add Salesperson</button>
      </form>
    </div>
  );
};

export default AddSalespersonForm;
