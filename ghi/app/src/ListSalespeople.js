import React, { useState, useEffect } from 'react';
import './ListSalespeople.css';

function ListSalespeople() {
  const [salespeople, setSalespeople] = useState([]);

  useEffect(() => {
    async function fetchSalespeople() {
      try {
        const response = await fetch('http://localhost:8090/salespeople/');
        if (!response.ok) {
          throw new Error('Failed to fetch salespeople data');
        }
        const data = await response.json();
        setSalespeople(data.salespeople);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSalespeople();
  }, []);

  return (
    <div>
      <h1>List of Salespeople</h1>
      {salespeople.length === 0 ? (
        <p>No salespeople found.</p>
      ) : (
        <ul className="salespeople-list">
          {salespeople.map((salesperson) => (
            <li key={salesperson.id}>
              <strong>{salesperson.first_name} {salesperson.last_name}</strong><br />
              <span>Employee ID: {salesperson.id}</span><br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListSalespeople;
