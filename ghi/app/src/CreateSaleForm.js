import React, { useState } from "react";

function CreateSaleForm({ getSales }) {
  const [vin, setVin] = useState('');
  const [price, setPrice] = useState('');
  const [salespersonId, setSalespersonId] = useState('');
  const [customerId, setCustomerId] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      automobile: vin,
      price: price,
      salesperson: salespersonId,
      customer: customerId,
    };

    const createSaleUrl = 'http://localhost:8090/sales/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch(createSaleUrl, fetchConfig);
      if (response.ok) {
        setVin('');
        setPrice('');
        setSalespersonId('');
        setCustomerId('');

        getSales();

        alert('Sale created successfully!');
      }
    } catch (error) {
      console.error('Failed to create a sale:', error);

      alert('Failed to create a sale. Please try again.');
    }
  }

  function handleChangeVin(event) {
    const { value } = event.target;
    setVin(value);
  }

  function handleChangePrice(event) {
    const { value } = event.target;
    setPrice(value);
  }

  function handleChangeSalespersonId(event) {
    const { value } = event.target;
    setSalespersonId(value);
  }

  function handleChangeCustomerId(event) {
    const { value } = event.target;
    setCustomerId(value);
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a Sale</h1>
          <form onSubmit={handleSubmit} id="create-sale-form">
            <div className="form-floating mb-3">
              <input value={vin} onChange={handleChangeVin} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control" />
              <label htmlFor="vin">VIN</label>
            </div>
            <div className="form-floating mb-3">
              <input value={price} onChange={handleChangePrice} placeholder="Price" required type="number" name="price" id="price" className="form-control" />
              <label htmlFor="price">Price</label>
            </div>
            <div className="form-floating mb-3">
              <input value={salespersonId} onChange={handleChangeSalespersonId} placeholder="Salesperson ID" required type="text" name="salespersonId" id="salespersonId" className="form-control" />
              <label htmlFor="salespersonId">Salesperson ID</label>
            </div>
            <div className="form-floating mb-3">
              <input value={customerId} onChange={handleChangeCustomerId} placeholder="Customer ID" required type="text" name="customerId" id="customerId" className="form-control" />
              <label htmlFor="customerId">Customer ID</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [sale, setSale] = useState([]);

  async function getSale() {
    const salesUrl = 'http://localhost:8090/sales_rest/sales/';
    const response = await fetch(salesUrl);
    if (response.ok) {
      const data = await response.json();
      setSale(data.sales);
    }
  }

  return (
    <div>
      <CreateSaleForm getSales={getSale} />
    </div>
  );
}

export default App;
