import React, { useState, useEffect } from 'react';

function ListSalespeople() {
  const [salespeople, setSalespeople] = useState([]);

  useEffect(() => {
    async function fetchSalespeople() {
      try {
        const response = await fetch('http://localhost:8090/sales_rest/api_salespeople/');
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
      <ul>
        {salespeople.map((salesperson) => (
          <li key={salesperson.id}>
            {salesperson.first_name} {salesperson.last_name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListSalespeople;
