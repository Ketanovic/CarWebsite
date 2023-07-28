import React, { useState, useEffect } from 'react';

function ListCustomers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const response = await fetch('http://localhost:8090/customers/');
        if (!response.ok) {
          throw new Error('Failed to fetch customers data');
        }
        const data = await response.json();
        setCustomers(data.Customer);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCustomers();
  }, []);

  return (
    <div>
      <h1>List of Customers</h1>
      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <ul className="customers-list">
          {customers.map((customer) => (
            <li key={customer.id}>
              <strong>{customer.first_name} {customer.last_name}</strong><br />
              <span>Address: {customer.address}</span><br />
              <span>Phone Number: {customer.phone_number}</span><br />
              <span>Customer ID: {customer.id}</span><br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListCustomers;
